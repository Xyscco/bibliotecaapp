import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { Platform } from "@unimodules/core";
import { useScreens } from "react-native-screens";
import api from "../services/api";
export default function EditoraCad() {
  const [nome, setNome] = useState("");
  async function handleSubmit() {
    try {
      const response = await api.post("/editoras", {
        nome
      });
      Alert.alert("Editora salva com sucesso");
      setNome("");
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
      <View style={styles.form}>
        <Text style={styles.titulo}>Cadastro de Editora</Text>
        <Text style={styles.label}>Nome: *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da editora"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
        <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
          <Text style={styles.botaoTexto}>Salvar</Text>
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
  botao: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
