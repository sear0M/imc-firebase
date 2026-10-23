import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

import { salvarCalculo } from '../calculos';
import { calcularImc, classificarImc, corDaClassificacao, validarEntrada } from '../imc';

export default function CalculadoraScreen({ navigation }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [erro, setErro] = useState('');
  const [imc, setImc] = useState(null);
  const [erroSalvar, setErroSalvar] = useState('');

  function calcular() {
    const entrada = validarEntrada(peso, altura);

    if (entrada.erro) {
      setErro(entrada.erro);
      setImc(null);
      return;
    }

    setErro('');
    setErroSalvar('');

    const resultado = calcularImc(entrada.peso, entrada.altura);
    setImc(resultado);

    salvarCalculo(resultado).catch(() => {
      setErroSalvar('Não foi possível salvar este cálculo no Firebase.');
    });
  }

  const classificacao = imc === null ? '' : classificarImc(imc);

  return (
    <View style={styles.centro}>
      <Image
        style={styles.imagem}
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12130/12130864.png' }}
      />
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.campo}
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso (kg)"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.campo}
        value={altura}
        onChangeText={setAltura}
        placeholder="Altura (cm)"
        keyboardType="decimal-pad"
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Button title="Calcular" onPress={calcular} />

      {imc !== null ? (
        <View style={styles.resultado}>
          <Text>Seu IMC é: {imc.toFixed(2).replace('.', ',')}</Text>
          <Text style={[styles.classificacao, { color: corDaClassificacao(classificacao) }]}>
            {classificacao}
          </Text>

          {erroSalvar ? <Text style={styles.erro}>{erroSalvar}</Text> : null}

          <View style={styles.botaoHistorico}>
            <Button title="Ver histórico" onPress={() => navigation.navigate('Historico')} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#caddfc',
  },
  imagem: {
    width: 128,
    height: 128,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  campo: {
    width: 260,
    borderWidth: 1,
    borderColor: '#8AA6D6',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 12,
  },
  erro: {
    color: '#C62828',
    marginVertical: 8,
    textAlign: 'center',
  },
  resultado: {
    marginTop: 20,
    alignItems: 'center',
  },
  classificacao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
  botaoHistorico: {
    marginTop: 16,
  },
});
