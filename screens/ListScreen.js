import {View, ScrollView, FlatList, StyleSheet} from "react-native";
import React, {useEffect} from "react";
import  {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from "react-redux";
import {compareOptionsSelector} from '../store/Rating/selectors'
import ComparoMainComponent from "../components/ComparoMainComponent";
import ComparoName from "../components/ComparoName";
import AddButton from "../components/AddButton";
import {addCompareOption, removeCompareOption, clearOptions} from "../store/Rating/reducer";

function ListScreen({ firstItem, secondItem, clearList}) {
  const dispatch = useDispatch();
  const options = useSelector(compareOptionsSelector)

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


        function AddLine() {
            dispatch(addCompareOption())
            if (options.length > 0 && firstButtonPosition.value !== 20) {
                OpenButtons();
            }
        }

        function DeleteLine() {
            dispatch(removeCompareOption())
            if (options.length < 3 && firstButtonPosition.value === 20) {
                CloseButtons();
            }

        }


        useEffect(() => {
            if (clearList) {
                dispatch(clearOptions());
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
                        data={options}
                        alwaysBounceVertical={false}
                        alwaysBounceHorizontal={false}
                        renderItem={(item) => {
                            return (
                                <View key={item.index}>
                                        <ComparoMainComponent
                                            compareOption={item.item}
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