import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
  ScrollView
} from "react-native";
import { Platform } from "@unimodules/core";
import { useScreens } from "react-native-screens";
import api from "../services/api";
export default function ClienteCad() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idEndereco, setIdEndereco] = useState("");
  const [enderecos, setEnderecos] = useState([]);
  const [sexos, setSexos] = useState([]);
  const [codigoSexo, setCodigoSexo] = useState("");

  function carregarCombos() {
    async function carregarEnderecos() {
      const response = await api.get("/enderecos");
      setEnderecos(response.data);
    }
    carregarEnderecos();

    async function carregarSexos() {
      const response = await api.get("/autores/sexos");

      setSexos(response.data);
    }
    carregarSexos();
  }

  async function handleSubmit() {
    try {
      const response = await api.post("/clientes", {
        nome,
        cpf,
        email,
        telefone,
        endereco: { id: idEndereco },
        sexo: codigoSexo
      });
      Alert.alert("Endereço salvo com sucesso");
      setNome("");
      setCpf("");
      setEmail("");
      setTelefone("");
      setIdEndereco("");
      setCodigoSexo("");
    } catch (error) {
      Alert.alert("Erro ao realizar a operação, tente novamente mais tarde");
    }
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        enabled={Platform.OS == "ios"}
        behavior="padding"
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.titulo}>Cadastro de Clientes</Text>
          <Text style={styles.label}>Nome: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
            onChange={carregarCombos}
          />
          <Text style={styles.label}>Cpf: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Cpf"
            placeholderTextColor="#999"
            value={cpf}
            onChangeText={setCpf}
          />
          <Text style={styles.label}>Email: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Telefone: *</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#999"
            value={telefone}
            onChangeText={setTelefone}
          />
          <Text style={styles.label}>Endereço: *</Text>
          <Picker selectedValue={idEndereco} onValueChange={setIdEndereco}>
            <Picker.Item label="Selecione um endereço" value="" />
            {enderecos.map(endereco => {
              return (
                <Picker.Item
                  key={endereco.id}
                  label={endereco.rua}
                  value={endereco.id}
                />
              );
            })}
          </Picker>
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
            <Text style={styles.botaoTexto}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
