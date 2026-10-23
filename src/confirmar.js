import { Alert, Platform } from 'react-native';

export function confirmar(mensagem, aoConfirmar) {
  if (Platform.OS === 'web') {
    if (window.confirm(mensagem)) {
      aoConfirmar();
    }
    return;
  }

  Alert.alert('Confirmação', mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Apagar', style: 'destructive', onPress: aoConfirmar },
  ]);
}
