import { View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ComparoMainComponent from "../components/ComparoMainComponent";

import ComparoName from "../components/ComparoName";
import AddButton from "../components/AddButton";

function ListScreen({ firstItem, secondItem, clearList, onFirstChange, onSecondChange}) {
  const [list, setList] = useState([1]);

  const [sumFirst, setSumFirst] = useState([1]);
  const [sumSecond, setSumSecond] = useState([1]);

  const [totalFirst, setTotalFirst] = useState(1);
  const [totalSecond, setTotalSecond] = useState(1);

  const handleSumFirstChange = (newSumFirst, index) => {
    setSumFirst((currentSumFirst) => {
      const updatedSumFirst = [...currentSumFirst];

      updatedSumFirst[index] = newSumFirst;

      return updatedSumFirst;

    });
  };

  useEffect(() => {
    const sum = sumFirst.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    onFirstChange(sum);
  }, [sumFirst]);

  const handleSumSecondChange = (newSumSecond,index) => {
    setSumSecond((currentSumSecond) => {
      const updatedSumFirst = [... currentSumSecond]
      updatedSumFirst[index] = newSumSecond;
      return updatedSumFirst;
    });
  };

  useEffect(() => {
    const sum = sumSecond.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    onSecondChange(sum);
  }, [sumSecond]);

  function AddLine() {
    setList(currentList => [...currentList, 1]);
    setSumFirst(currentList =>[...currentList,1])
    setSumSecond(currentList => [...currentList, 1])
  }

  useEffect(() => {
    if (clearList) {
      setList([1]);
        setSumFirst([1]);
        setSumSecond([1]);
        setTotalFirst(1);
        setTotalSecond(1);
        onFirstChange(totalFirst);
        onSecondChange(totalSecond);
      
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