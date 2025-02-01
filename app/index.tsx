import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, Button, SafeAreaView, FlatList } from "react-native";

import { Match } from "@/types/game"; 
import GameBoard from "@/components/GameBoard";
import PastMatches from "@/components/PastMatches";

export default function App() {
  const [playerTurn, setPlayerTurn] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [pastMatches, setPastMatches] = useState<Match[]>([]);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  const handleCellPress = (index: number) => {
    //exit condition -> if game is over or if cell is already filled
    if (board[index] || checkWinner(board) ) {
      return;
    }

    //handle players mark placement
    const newBoard = [...board];
    newBoard[index] = playerTurn;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    const gameOver = winner || newBoard.every((cell) => cell !== null);

    if (gameOver) {
      //first compose and show end game modal
      const message = winner ? `Player ${winner} wins!` : "It's a tie!";
      setGameOverMessage(message);
      setGameOverModalVisible(true);
      
      //store past matches
      setPastMatches((prevPastMatches) => {
        const newMatch: Match = { board: newBoard, winner }; 
        return [... (prevPastMatches), newMatch]; 
      });
      
      //reset starting conditions
      if (winner) {
        setPlayerTurn(winner === "X" ? "X" : winner === "O" ? "O" : "X");
        setBoard(Array(9).fill(null));
      } else {
        setPlayerTurn("X"); // X starts if tie
      }
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

  //reset to initial conditions
  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn("X");
    setGameOverModalVisible(false);
  };

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.turnText}>Current Turn: {playerTurn}</Text>
      <GameBoard board={board} cellPress={handleCellPress} />
      {gameOverModalVisible && (
        <Modal visible={gameOverModalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{gameOverMessage}</Text>
              <Button title="New Game" onPress={handleNewGame} />
            </View>
          </View>
        </Modal>
      )}
      <Text style={styles.pastMatchesHeader}>Past Matches:</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        data={pastMatches}
        renderItem={({ item }) => (
          <PastMatches
            pastMatches={[item]}
            handleNewGame={handleNewGame}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContent: {
    padding: 20,
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
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
  pastMatchesHeader: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
});
