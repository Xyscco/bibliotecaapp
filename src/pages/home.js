import React from 'react';
import { 
        Text,
        StyleSheet, 
        KeyboardAvoidingView, 
        Platform,
        Image
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

export default function Home() {

    return (
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'}
            behavior="padding" style={styles.container}>
            <Text>Inicio</Text>
        <Card
        title='BIBLIOTECAAPP'
        image={require('../img/pic1.jpg')}>
        <Text style={{marginBottom: 10}}>
          Sistema de controle bibliotecario.
        </Text>
      </Card>
    </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    titulo : {
        fontSize: 20
    }
});