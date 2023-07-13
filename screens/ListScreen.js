import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ComparoMainComponent from "../components/ComparoMainComponent";

import ComparoName from "../components/ComparoName";
import AddButton from "../components/AddButton";

function ListScreen({ firstItem, secondItem, clearList}) {
  const [list, setList] = useState([1]);

  function AddLine() {
    setList(currentList => [...currentList, 1]);
  }

  useEffect(() => {
    if (clearList && list.length > 1) {
      setTimeout(() => {
        setList([1]);
      }, 1200);
    }
  }, []);

  return (
    <View>
      <View>
        <ComparoName firstItem={firstItem} secondItem={secondItem} />
      </View>

      <ScrollView>
        <FlatList
          scrollEnabled={false}
          data={list}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          renderItem={(item) => {
            return (
              <View key={item.index}>
                <ComparoMainComponent
                  clearMark={clearList}
                />
              </View>
            );
          }}
        />
        <View>
          <AddButton onPress={AddLine} />
        </View>
      </ScrollView>
    </View>
  );
}

export default ListScreen;
