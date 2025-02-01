import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import GameBoard from "../components/GameBoard";

interface Match {
  board: (string | null)[];
  winner: string | null;
}

export default function App() {
  const [playerTurn, setPlayerTurn] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [pastMatches, setPastMatches] = useState<Match[]>([]);

  const handleCellPress = (index: number) => {
    //exit condition -> if game is over or if cell is already filled

    //handle players mark placement
    const newBoard = [...board];
    newBoard[index] = playerTurn;
    setBoard(newBoard);
  };

  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn("X");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>Current Turn: {playerTurn}</Text>
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
  turnText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
