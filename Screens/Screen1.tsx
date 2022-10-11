import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import axios from "axios";

const Screen1 = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    !loading && getData();
    const interval = setInterval(() => {
      incrementPage();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  function incrementPage() {
    !loading && setPage(page + 1);
  }
  function getData() {
    setLoading(true);
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      )
      .then((response) => {
        setData(Array.from(new Set([...data, ...response.data.hits])));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <SafeAreaView>
      <View testID="home" style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.heading1}>Url</Text>
          <Text style={styles.heading2}>Title</Text>
          <Text style={styles.heading3}>Created At</Text>
          <Text style={styles.heading4}>Author</Text>
        </View>

        <FlatList
          testID="home-list"
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  navigation.navigate("Raw JSON", {
                    item: JSON.stringify(item, null, 4),
                  });
                }}
              >
                <Text style={styles.itemText1}>{item.url}</Text>
                <Text style={styles.itemText2}>{item.title}</Text>
                <Text style={styles.itemText3}>{item.created_at}</Text>
                <Text style={styles.itemText4}>{item.author}</Text>
              </TouchableOpacity>
            );
          }}
          onEndReachedThreshold={1}
          onEndReached={incrementPage}
          ListFooterComponent={() => {
            if (loading) {
              return <ActivityIndicator />;
            } else return <View />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Screen1;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // marginVertical: 10,
    height: 220,
    width: "100%",
    flexWrap: "wrap",
  },
  itemText1: {
    width: "20%",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    height: 220,
    flex: 1,
  },
  itemText2: {
    width: "20%",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    height: 220,
    flex: 1,
  },
  itemText3: {
    width: "20%",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    height: 220,
    flex: 1,
  },
  itemText4: {
    width: "20%",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    height: 220,
    flex: 1,
    flexWrap: "wrap",
  },
  container: {
    padding: 5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  heading1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
    marginVertical: 10,
    height: 20,
    width: "10%",
  },
  heading2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
    marginVertical: 10,
    height: 20,
    width: "10%",
  },
  heading3: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
    marginVertical: 10,
    height: 20,
    width: "10%",
  },
  heading4: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
    marginVertical: 10,
    height: 20,
    width: "10%",
  },
});
