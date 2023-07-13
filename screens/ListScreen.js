import { View, ScrollView, StyleSheet, FlatList, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ComparoMainComponent from "../components/ComparoMainComponent";

import ComparoName from "../components/ComparoName";
import AddButton from "../components/AddButton";

function ListScreen({ firstItem, secondItem, clearList}) {
  const [list, setList] = useState([1]);

  const [sumFirst, setSumFirst] = useState([1,]);
  const [sumSecond, setSumSecond] = useState([1,]);

  const [totalFirst, setTotalFirst] = useState(1);
  const [totalSecond, setTotalSecond] = useState(1);

  const handleSumFirstChange = (newSumFirst, index) => {
    setSumFirst((currentSumFirst) => {
      currentSumFirst[index] = newSumFirst;
      return currentSumFirst;
    });
    for(var sum = 0, index =0; index < sumFirst.length; index++)
    {
      sum += sumFirst[index];
    }
    console.log({sum});
    setTotalFirst(()=>sum);
      console.log({sumFirst});
      console.log({totalFirst});
    
  };

  const handleSumSecondChange = (newSumSecond,index) => {
    setSumSecond((currentSumSecond) => {
      currentSumSecond[index] = newSumSecond;
      return currentSumSecond;

    });

  };

  function AddLine() {
    setList(currentList => [...currentList, 1]);
    setSumFirst(currentList =>[...currentList,1])
    setSumSecond(currentList => [...currentList, 1])
  }

  useEffect(() => {
    if (clearList) {
      setTimeout(() => {
        setList([1,]);
      }, 1000);
      clearTimeout;
      setSumFirst([1,])
      setSumSecond([1,])
    }
  }, [clearList]);

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
                  index = {item.index}
                  onSumFirstChange = {handleSumFirstChange}
                  onSumSecondChange = {handleSumSecondChange}
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
