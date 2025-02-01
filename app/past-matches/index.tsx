import { Link } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";

export default function PastMatches() {
  return (
    <View style={styles.container}>
      <Text>past matches test</Text>
      <Link href="/">
        <Text>Home</Text>
      </Link>
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
