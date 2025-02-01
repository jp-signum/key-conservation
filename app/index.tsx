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
    if (board[index]) {
      return;
    }

    //handle players mark placement
    const newBoard = [...board];
    newBoard[index] = playerTurn;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    const gameOver = winner || newBoard.every((cell) => cell !== null);

    if (gameOver) {
      setPastMatches([...pastMatches, { board: newBoard, winner: winner }]); // Store winner or null (tie)
      setBoard(Array(9).fill(null));
      setPlayerTurn("X");
    } else {
      setPlayerTurn(playerTurn === "X" ? "O" : "X");
    }
  };

  const checkWinner = (currentBoard: (string | null)[]): string | null => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
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
