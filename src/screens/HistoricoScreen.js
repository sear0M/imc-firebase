import { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { apagarCalculo, apagarTodosCalculos, buscarCalculos } from '../calculos';
import { confirmar } from '../confirmar';
import { formatarDataHora } from '../datas';
import { classificarImc, corDaClassificacao } from '../imc';

export default function HistoricoScreen() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      const calculos = await buscarCalculos();
      setLista(calculos);
      setErro('');
    } catch (e) {
      setErro('Não foi possível carregar o histórico. Verifique a conexão e o Firebase.');
    }
    setCarregando(false);
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  function apagar(item) {
    confirmar('Apagar este cálculo?', async () => {
      try {
        await apagarCalculo(item.id);
        carregar();
      } catch (e) {
        setErro('Não foi possível apagar este cálculo. Tente de novo.');
      }
    });
  }

  function apagarTudo() {
    confirmar('Apagar todos os cálculos salvos? Não dá para desfazer.', async () => {
      try {
        await apagarTodosCalculos();
        carregar();
      } catch (e) {
        setErro('Não foi possível apagar o histórico. Tente de novo.');
      }
    });
  }

  return (
    <View style={styles.tela}>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      {carregando ? <Text style={styles.aviso}>Carregando...</Text> : null}
      {!carregando && lista.length === 0 ? (
        <Text style={styles.aviso}>Nenhum cálculo salvo ainda.</Text>
      ) : null}

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const classificacao = classificarImc(item.imc);
          return (
            <View style={styles.item}>
              <View style={styles.textos}>
                <Text style={styles.data}>{formatarDataHora(item.data)}</Text>
                <Text style={styles.imc}>IMC {item.imc.toFixed(2).replace('.', ',')}</Text>
                <Text style={[styles.classificacao, { color: corDaClassificacao(classificacao) }]}>
                  {classificacao}
                </Text>
              </View>
              <Button title="Apagar" color="#C62828" onPress={() => apagar(item)} />
            </View>
          );
        }}
      />

      {lista.length > 0 ? (
        <View style={styles.botaoApagarTudo}>
          <Button title="Apagar tudo" color="#C62828" onPress={apagarTudo} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6FA',
  },
  erro: {
    color: '#C62828',
    marginBottom: 12,
  },
  aviso: {
    color: '#5B6475',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  textos: {
    flex: 1,
  },
  data: {
    fontSize: 14,
    color: '#5B6475',
  },
  imc: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  classificacao: {
    fontWeight: 'bold',
    marginTop: 2,
  },
  botaoApagarTudo: {
    marginTop: 12,
  },
});
