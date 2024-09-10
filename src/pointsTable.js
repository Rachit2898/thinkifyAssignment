import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatchList, setPointsTable } from "./redux/features/player";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const PointsTable = () => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const navigation = useNavigation();
  const pointsTable = useSelector((state) => state.playerdata.pointsTable);

  const matchHandler = (item) => {
    dispatch(setMatchList({ player: item }));
    navigation.navigate("matches");
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        matchHandler(item.name);
      }}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemScore}>{item.score}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    dispatch(setPointsTable());
  }, [focus]);

  return (
    <View style={styles.container}>
      <FlatList
        data={pointsTable}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<Text style={styles.header}>Points Table</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    justifyContent: "space-between",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 16,
  },
  itemScore: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
});

export default PointsTable;
