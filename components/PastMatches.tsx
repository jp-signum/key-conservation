import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

import { Match } from "../types";

interface PastMatchesProps {
  pastMatches: Match;
  handleNewGame: () => void;
}

const PastMatches: React.FC<PastMatchesProps> = ({
  pastMatches,
  handleNewGame,
}) => {
  const renderBoard = (board: (string | null)) => {
    if (!board) {
      return null; 
    }

    return (
      <View style={styles.snapshotBoard}>
        {board?.map((value, index) => (
          <View key={index} style={styles.snapshotCell}>
            <Text>{value}</Text>
          </View>
        )) ?? null}
      </View>
    );
  };

  const renderItem = ({ item }: { item: Match }) => (
    <View style={styles.matchItem}>
      <Text>Winner: {item.winner || "Tie"}</Text>
      {renderBoard(item.board)} {/* Render the board snapshot */}
    </View>
  );

  return (
    <View>
      <Button title="New Game" onPress={handleNewGame} />
      <Text>Past Matches:</Text>
      <FlatList
        data={pastMatches}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
