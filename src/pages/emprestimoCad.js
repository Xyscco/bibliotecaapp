import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker
} from "react-native";
import { Platform } from "@unimodules/core";
import DatePicker from "react-native-datepicker";
import { useScreens } from "react-native-screens";
import api from "../services/api";
export default function EmprestimoCad() {
  const [dataDoEmprestimo, setDataDoEmprestimo] = useState("");
  const [dataDaDevolucao, setdataDaDevolucao] = useState("");
  const [valorDoEmprestimo, setvalorDoEmprestimo] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [idLivro, setIdLivro] = useState("");
  const [livros, setLivros] = useState([]);

  function carregarCombos() {
    async function carregarClientes() {
      const response = await api.get("/clientes");
      setClientes(response.data);
    }
    carregarClientes();
    async function carregarLivros() {
      const response = await api.get("/livros");
      setLivros(response.data);
    }
    carregarLivros();
  }

  async function handleSubmit() {
    try {
      if (idCliente === "") {
        Alert.alert("Selecione um cliente");
      } else if (idLivro === "") {
        Alert.alert("Selecione um livro");
      } else {
        const response = await api.post("/emprestimos", {
          dataDoEmprestimo,
          dataDaDevolucao,
          valorDoEmprestimo,
          cliente: { id: idCliente },
          livro: { id: idLivro }
        });
        Alert.alert("Emprestimo salvo com sucesso");
        setDataDoEmprestimo("");
        setdataDaDevolucao("");
        setvalorDoEmprestimo("");
        setIdCliente("");
        setIdLivro("");
      }
    } catch (error) {
      console.log(error.response);
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
        <Text style={styles.titulo}>Emprestimo de Livros</Text>
        <Text style={styles.label}>Data emprestimo: *</Text>
        <DatePicker
          onChangeText={carregarCombos}
          style={{ width: "100%" }}
          date={dataDoEmprestimo}
          mode="date"
          placeholder="Data de emprestimo do lirvo"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "relative",
              left: 0,
              top: 0,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 0,
              marginBottom: 5
            }
          }}
          onDateChange={date => {
            setDataDoEmprestimo(date);
          }}
        />
        <Text style={styles.label}>Data devolução: *</Text>
        <DatePicker
          style={{ width: "100%" }}
          date={dataDaDevolucao}
          mode="date"
          placeholder="Data da devoloção do lirvo"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "relative",
              left: 0,
              top: 0,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 0,
              marginBottom: 5
            }
          }}
          onDateChange={date => {
            setdataDaDevolucao(date);
          }}
        />
        <Text style={styles.label}>Valor do emprestimo: *</Text>
        <TextInput
          style={styles.input}
          placeholder="Valor do emprestimo"
          placeholderTextColor="#999"
          value={valorDoEmprestimo}
          keyboardType={"decimal-pad"}
          onChangeText={setvalorDoEmprestimo}
          onChange={carregarCombos}
        />
        <Text style={styles.label}>Cliente: *</Text>
        <Picker selectedValue={idCliente} onValueChange={setIdCliente}>
          <Picker.Item label="Selecione um cliente" value="" />
          {clientes.map(cliente => {
            return (
              <Picker.Item
                key={cliente.id}
                label={cliente.nome}
                value={cliente.id}
              />
            );
          })}
        </Picker>
        <Text style={styles.label}>Livro: *</Text>
        <Picker selectedValue={idLivro} onValueChange={setIdLivro}>
          <Picker.Item label="Selecione um livro" value="" />
          {livros.map(livro => {
            return (
              <Picker.Item key={livro.id} label={livro.nome} value={livro.id} />
            );
          })}
        </Picker>
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
