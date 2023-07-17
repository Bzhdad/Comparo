import {View, ScrollView, FlatList, Text, StyleSheet} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';
import ComparoMainComponent from "../components/ComparoMainComponent";

import ComparoName from "../components/ComparoName";
import AddButton from "../components/AddButton";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import AnimatedScrollView from "react-native-reanimated/src/reanimated2/component/ScrollView";

function ListScreen({ firstItem, secondItem, clearList, onFirstChange, onSecondChange}) {
  const [list, setList] = useState([1]);

  const [sumFirst, setSumFirst] = useState([1]);
  const [sumSecond, setSumSecond] = useState([1]);

  const [totalFirst, setTotalFirst] = useState(1);
  const [totalSecond, setTotalSecond] = useState(1);

        //Анимация кнопок
        const firstButtonPosition = useSharedValue(0);
        const secondButtonPosition = useSharedValue(0);
        const secondButtonOpacity = useSharedValue(0)
        const reanimatedFirstButtonStyle = useAnimatedStyle(() => {
            return {
                transform: [{translateX: firstButtonPosition.value}],
            };
        }, []);
        const reanimatedSecondButtonStyle = useAnimatedStyle(() => {
            return {
                transform: [{translateX: secondButtonPosition.value}],
                opacity: secondButtonOpacity.value
            };
        }, []);

        function OpenButtons() {
            firstButtonPosition.value = withTiming(20, {duration: 500})
            secondButtonPosition.value = withTiming(-20, {duration: 500})
            secondButtonOpacity.value = withTiming(1, {duration: 200})
        }

        function CloseButtons() {
            firstButtonPosition.value = withTiming(0, {duration: 500})
            secondButtonPosition.value = withTiming(0, {duration: 500})
            secondButtonOpacity.value = withTiming(0, {duration: 500})
        }


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

        const handleSumSecondChange = (newSumSecond, index) => {
            setSumSecond((currentSumSecond) => {
                const updatedSumFirst = [...currentSumSecond]
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
            setSumFirst(currentList => [...currentList, 1])
            setSumSecond(currentList => [...currentList, 1])
            if (list.length > 0 && firstButtonPosition.value !== 20) {
                OpenButtons();
            }
        }

        function DeleteLine() {
            setList(currentList => currentList.slice(0, -1));
            setSumFirst(currentList => currentList.slice(0, -1))
            setSumSecond(currentList => currentList.slice(0, -1))
            if (list.length < 3 && firstButtonPosition.value === 20) {
                CloseButtons();
            }

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
                CloseButtons();

            }
        }, [clearList]);

        return (
            <ScrollView>
                <View>
                    <View>
                        <ComparoName firstItem={firstItem} secondItem={secondItem}/>
                    </View>


                    <FlatList
                        scrollEnabled={false}
                        data={list}
                        alwaysBounceVertical={false}
                        alwaysBounceHorizontal={false}
                        renderItem={(item) => {
                            return (
                                <View key={item.index}>
                                        <ComparoMainComponent
                                            index={item.index}
                                            onSumFirstChange={handleSumFirstChange}
                                            onSumSecondChange={handleSumSecondChange}
                                        />
                                </View>
                            );
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <AddButton onPress={DeleteLine} disabled={false} name={'minuscircleo'}
                                   buttonStyle={reanimatedSecondButtonStyle}/>
                        <AddButton onPress={AddLine} disabled={false} name={'pluscircleo'}
                                   buttonStyle={reanimatedFirstButtonStyle}/>
                    </View>
                </View>
            </ScrollView>


        );

    }

export default ListScreen;

const styles = StyleSheet.create({
  buttonContainer:
      {
        width: '32%',
        marginLeft: '2%',
          height: 35,

      }
});