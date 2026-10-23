export function calcularImc(peso, alturaCm) {
  const altura = alturaCm / 100;
  const imc = peso / (altura * altura);
  return Math.round(imc * 100) / 100;
}

export function classificarImc(imc) {
  if (imc < 18.5) return 'Abaixo do peso!';
  if (imc < 25) return 'Peso normal!';
  if (imc < 30) return 'Sobrepeso!';
  if (imc < 35) return 'Obesidade grau I!';
  if (imc < 40) return 'Obesidade grau II!';
  return 'Obesidade grau III!';
}

export function corDaClassificacao(classificacao) {
  if (classificacao === 'Abaixo do peso!') return '#1E88E5';
  if (classificacao === 'Peso normal!') return '#2E7D32';
  if (classificacao === 'Sobrepeso!') return '#F9A825';
  if (classificacao === 'Obesidade grau I!') return '#EF6C00';
  if (classificacao === 'Obesidade grau II!') return '#D84315';
  return '#B71C1C';
}

export function validarEntrada(textoPeso, textoAltura) {
  if (!textoPeso || !textoAltura) {
    return { erro: 'Preencha o peso e a altura.' };
  }

  const peso = Number(textoPeso.replace(',', '.'));
  const altura = Number(textoAltura.replace(',', '.'));

  if (isNaN(peso) || isNaN(altura)) {
    return { erro: 'Use apenas números no peso e na altura.' };
  }
  if (peso < 2 || peso > 500) {
    return { erro: 'Informe um peso entre 2 e 500 kg.' };
  }
  if (altura < 40 || altura > 260) {
    return { erro: 'Informe uma altura entre 40 e 260 cm.' };
  }

  return { peso, altura };
}
