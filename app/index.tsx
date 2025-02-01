import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function App() {
  const [playerTurn, setPlayerTurn] = useState('X')
  const [board, setBoard] = useState(Array(9).fill(null))
  const [pastMatches, setPastMatches] = useState([])

  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
