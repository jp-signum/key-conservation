import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import GameBoard from "../components/GameBoard";

export default function App() {
  const [playerTurn, setPlayerTurn] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [pastMatches, setPastMatches] = useState([]);

  const handleCellPress = (index: number) => {};

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn("X");
  };

  return (
    <View style={styles.container}>
      <GameBoard board={board} cellPress={handleCellPress}></GameBoard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
