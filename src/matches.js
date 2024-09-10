import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Matches = () => {
  const matchList = useSelector((state) => state.playerdata.matchList);

  return (
    <View style={styles.container}>
      {matchList.map((match, index) => (
        <View
          key={index}
          style={[
            styles.matchContainer,
            {
              backgroundColor:
                match.result === "draw"
                  ? "white"
                  : match.result === "winner"
                  ? "lightgreen"
                  : "lightcoral",
            },
          ]}
        >
          <Text style={styles.leftText}>
            {match.result === "draw"
              ? match.name
              : match.result === "winner"
              ? match.name
              : match.opponent}
          </Text>
          <Text style={styles.middleText}>{match.score}</Text>
          <Text style={styles.rightText}>
            {match.result === "draw"
              ? match.opponent
              : match.result === "runner"
              ? match.name
              : match.opponent}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  matchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  leftText: {
    flex: 1,
    textAlign: "left",
  },
  middleText: {
    flex: 1,
    textAlign: "center",
  },
  rightText: {
    flex: 1,
    textAlign: "right",
  },
});

export default Matches;
