import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';

import { db } from './firebase';

const nomeColecao = 'calculosImc';

export async function salvarCalculo(imc) {
  await addDoc(collection(db, nomeColecao), { imc, data: new Date() });
}

export async function buscarCalculos() {
  const consulta = query(collection(db, nomeColecao), orderBy('data', 'desc'));
  const resultado = await getDocs(consulta);

  const lista = [];
  resultado.forEach((documento) => {
    const dados = documento.data();
    lista.push({ id: documento.id, imc: dados.imc, data: dados.data.toDate() });
  });
  return lista;
}

export async function apagarCalculo(id) {
  await deleteDoc(doc(db, nomeColecao, id));
}

export async function apagarTodosCalculos() {
  const resultado = await getDocs(collection(db, nomeColecao));
  for (const documento of resultado.docs) {
    await deleteDoc(documento.ref);
  }
}
