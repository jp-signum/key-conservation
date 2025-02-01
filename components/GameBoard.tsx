import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

interface GameBoardProps {
  board: (string | null)[];
  cellPress: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, cellPress }) => {
  return (
    <View style={styles.board}>
      {board.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cell}
          onPress={() => cellPress(index)}
        >
          <Text>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "black",
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default GameBoard;
