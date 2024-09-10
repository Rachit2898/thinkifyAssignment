import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMatch } from "./redux/features/player";
import data from "./data.json";

const CustomDropdown = ({
  label,
  value,
  options,
  onSelect,
  disabledOptions,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsVisible(false);
  };

  return (
    <View>
      <Text>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsVisible(true)}
      >
        <Text>{value || `Select ${label}`}</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options.filter(
                (option) => !disabledOptions.includes(option.playerName)
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.playerName)}
                >
                  <Text>{item.playerName}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Close" onPress={() => setIsVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DashBoard = () => {
  const dispatch = useDispatch();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Score, setPlayer1Score] = useState("");
  const [player2Score, setPlayer2Score] = useState("");

  const handleMatchSubmit = () => {
    if (!player1 || !player2 || !player1Score || !player2Score) {
      Alert.alert(
        "Validation Error",
        "Please fill in all fields and select both players."
      );
      return;
    }

    dispatch(
      setMatch({ match: { player1, player2, player1Score, player2Score } })
    );

    setPlayer1("");
    setPlayer2("");
    setPlayer1Score("");
    setPlayer2Score("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule a Match</Text>

      <CustomDropdown
        label="Player 1"
        value={player1}
        options={data.players}
        onSelect={(selectedPlayer) => setPlayer1(selectedPlayer)}
        disabledOptions={[player2]}
      />

      <CustomDropdown
        label="Player 2"
        value={player2}
        options={data.players}
        onSelect={(selectedPlayer) => setPlayer2(selectedPlayer)}
        disabledOptions={[player1]}
      />

      <TextInput
        placeholder={`${player1} Score`}
        keyboardType="numeric"
        value={player1Score}
        onChangeText={setPlayer1Score}
        style={styles.input}
      />

      <TextInput
        placeholder={`${player2} Score`}
        keyboardType="numeric"
        value={player2Score}
        onChangeText={setPlayer2Score}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleMatchSubmit}>
        <Text style={styles.buttonText}>Submit Match</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    maxHeight: "50%",
  },
  option: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
