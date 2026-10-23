# Calculadora de IMC com Firebase

Exercício de Firebase: a calculadora de IMC salva cada cálculo no Firebase (o valor do IMC e a data) e mostra o histórico. Dá para apagar um cálculo ou todos.

## Integrantes

- Lavinia Basilio
- Pedro Enrico Oliveira
- Pedro Gomes Oliveira
- Pedro Moraes Carvalho

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure o Firebase (passo a passo abaixo).

3. Inicie o projeto:

   ```bash
   npx expo start
   ```

   Depois, abra no celular com o app Expo Go (o projeto usa o SDK 57) ou aperte `w` para abrir no navegador.

## Configurar o Firebase

1. Entre no [Console do Firebase](https://console.firebase.google.com) e crie um projeto.
2. Dentro do projeto, adicione um app da Web (o ícone `</>`). O Firebase mostra um objeto chamado `firebaseConfig`.
3. Abra o arquivo `src/firebaseConfig.js` e troque cada `COLE_AQUI` pelo valor certo.
4. No menu do projeto, abra **Firestore Database**, clique em **Criar banco de dados** e escolha uma região. Pode começar no modo de teste.
5. Na aba **Regras**, troque o texto pelo abaixo e publique:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /calculosImc/{calculo} {
         allow read, write: if true;
       }
     }
   }
   ```

Essas regras deixam o banco aberto para quem tiver o projeto. Servem para a aula, não para um app de verdade. As regras do modo de teste valem só por 30 dias.

Todos do grupo precisam usar o mesmo projeto (e o mesmo `firebaseConfig`) para ver os mesmos cálculos.

## Como funciona

- **Calcular IMC**: digite o peso em kg e a altura em centímetros (ex.: `175`). O app mostra o IMC e a classificação, e salva o cálculo no Firebase.
- **Histórico**: mostra os cálculos salvos, do mais recente para o mais antigo. Dá para apagar um cálculo ou apagar tudo.

Cada cálculo fica numa coleção chamada `calculosImc`, com dois campos: `imc` (o valor calculado) e `data` (o momento do cálculo).

## Fórmula e faixas

- IMC = peso ÷ (altura × altura), com a altura em metros. Por isso a tela recebe a altura em centímetros e divide por 100, como na calculadora da aula.
- Faixas da OMS: abaixo de 18,5 (abaixo do peso); 18,5 a 24,9 (peso normal); 25 a 29,9 (sobrepeso); 30 a 34,9 (obesidade grau I); 35 a 39,9 (obesidade grau II); 40 ou mais (obesidade grau III).

## Estrutura

```
App.js                      # Troca entre as telas (Calcular IMC e Histórico)
src/
  firebaseConfig.js         # Dados do seu projeto Firebase
  firebase.js               # Liga o app ao Firestore
  calculos.js               # Salvar, buscar e apagar cálculos
  imc.js                    # Cálculo, validação e classificação
  datas.js                  # Formata a data e a hora
  confirmar.js              # Pede confirmação antes de apagar
  screens/
    CalculadoraScreen.js    # Tela de cálculo
    HistoricoScreen.js      # Tela do histórico
```
