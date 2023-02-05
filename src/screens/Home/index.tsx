import React, { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export function Home() {
  const [participant, setParticipant] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  function handleParticipantAdd() {
    if (participants.includes(participant)) {
      return Alert.alert(
        "Participant já existe !",
        "já existe participanet com esse nome!"
      );
    }
    setParticipants((prevState) => [...prevState, participant]);
    setParticipant("");
  }
  function handleParticipantRemove(name: string) {
    return Alert.alert(
      "Deletar participante!",
      `Você realmente deseja deletar o participante ${name} da sua lista do evento?`,
      [
        {
          text: "Sim",
          onPress: () =>
            setParticipants((prevState) =>
              prevState.filter((participant) => participant !== name)
            ),
        },
        {
          text: "Nao",
          style: "cancel",
        },
      ]
    );
    console.log("Você clicou em remover um participante");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          value={participant}
          onChangeText={setParticipant}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => <Text>Not found! </Text>}
      />
    </View>
  );
}
