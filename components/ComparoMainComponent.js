import {View, StyleSheet, TextInput, Text} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import Rating from './Rating';
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";

function ComparoMainComponent({clearMark, index, onSumFirstChange,  onSumSecondChange})
{
    //Анимация нового экрана
    const mainComponentScale = useSharedValue(0.9);
    const mainComponentOpacity=useSharedValue(0);
    const reanimatedMainComponent = useAnimatedStyle(() => {
        return {
            transform: [{scale: mainComponentScale.value}],
            opacity: mainComponentOpacity.value
        };
    }, []);
    useEffect(() => {
        mainComponentScale.value = withTiming(1, {duration: 500});
        mainComponentOpacity.value = withTiming(1, {duration: 500});
    }, []);



    const [sumFirst, setSumFirst] = useState(1);
    const [sumSecond, setSumSecond] = useState(1);
    
    const handleSumFirstChange = (newSumFirst) => {
        setSumFirst(newSumFirst);
        onSumFirstChange(newSumFirst, index);
      };

      const handleSumSecondChange = (newSumSecond) => {
        setSumSecond(newSumSecond);
        onSumSecondChange(newSumSecond, index);
      };

    return (
        

        
        
        <AnimatedView style = {[styles.rootContainer, reanimatedMainComponent]}>
            <View style = {styles.inputContainer}>
                <View style = {styles.textInputContainer}>
                    <TextInput 
                    style = {[styles.textInput]} 
                    placeholder={'PARAMETER'} 
                    placeholderTextColor = '#999999'
                    autoCapitalize='characters'
                    maxLength={15}
                    textAlign = 'center'
                    />
                </View>
            </View>

            <Rating starName={"staro"} clearMark={clearMark} onSumChange = {handleSumFirstChange}/>
                
            <Rating starName={"staro"} clearMark ={clearMark} onSumChange = {handleSumSecondChange}/>
        </AnimatedView>
    );
}

export default ComparoMainComponent;

const styles = StyleSheet.create ({

    starContainer:
    {
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputContainer:
    {
        width: '32%',
        marginRight:'2%',
        marginTop: '2%',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },


    text:
    {
        color: 'white',
        padding:5,
        fontSize:9
    },

    rootContainer:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 35,

    },
    textInputContainer:
    {
        borderBottomColor : 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        width: '100%',
    },
    textInput:
    {
        color: 'black',
        fontSize: 12,

    }

});