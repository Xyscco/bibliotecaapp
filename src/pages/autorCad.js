import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Picker,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Platform } from '@unimodules/core';
import api from '../services/api';

export default function AutorCad() {

  const [nome, setNome] = useState("");
  const [sexos, setSexos] = useState([]);
  const [codigoSexo, setCodigoSexo] = useState("");

  async function carregarSexos() {
    const response = await api.get("/autores/sexos");

    setSexos(response.data);
  }
  carregarSexos();

  async function handleSubmit() {
    try {
      if (codigoSexo === "") {
        Alert.alert("O sexo do autor não foi selecionado");
      } else {
        const response = await api.post("/autores", {
          nome,
          sexo: codigoSexo
        });

        Alert.alert("Autor salvo com sucesso");

        setNome("");
        setCodigoSexo("");
      }
    } catch (error) {
      Alert.alert("Erro ao realizar a operação, tente novamente mais tarde");
    }
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS == "ios"}
      behavior="padding"
      style={styles.container}
    >
      <Text style={styles.titulo}>Cadastrar autor</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nome do Autor: *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Sexo: *</Text>
        <Picker selectedValue={codigoSexo} onValueChange={setCodigoSexo}>
          <Picker.Item label="Selecione um sexo" value="" />
          {sexos.map(sexo => {
            return (
              <Picker.Item
                key={sexo.codigo}
                label={sexo.descricao}
                value={sexo.codigo}
              />
            );
          })}
        </Picker>
        <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
          <Text style={styles.botaoGravar}>Gravar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    fontSize: 20
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    borderRadius: 2
  },
  botaoGravar: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  botao: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  }

});