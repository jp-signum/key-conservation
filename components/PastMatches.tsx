import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

import { Match } from "../types/game";

interface PastMatchesProps {
  pastMatches: Match[];
  handleNewGame: () => void;
}

const PastMatches: React.FC<PastMatchesProps> = ({
  pastMatches,
  handleNewGame,
}) => {
  const renderBoard = (board: (string | null)[]) => (
    <View style={styles.snapshotBoard}>
      {board.map((value, index) => (
        <View key={index} style={styles.snapshotCell}>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item }: { item: Match }) => (
    <View style={styles.matchItem}>
      <Text>Winner: {item.winner || "Tie"}</Text>
      {renderBoard(item.board)}
    </View>
  );

  return (
    <FlatList
      data={pastMatches}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
  },
  matchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  snapshotBoard: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 5,
  },
  snapshotCell: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
});

export default PastMatches;
