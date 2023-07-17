import {View, StyleSheet, TextInput} from 'react-native';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import React, {useEffect, useCallback, memo} from 'react';
import Rating from './Rating';
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {setFirstEntityRating, setSecondEntityRating} from "../store/Rating/reducer";
import {useDispatch} from "react-redux";

const ComparoMainComponent = memo(function ComparoMainComponent({compareOption }) {
    const dispatch = useDispatch();

    //Анимация нового экрана
    const mainComponentScale = useSharedValue(0.9);
    const mainComponentOpacity= useSharedValue(0);

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

    const handleFirstRating = useCallback((value) => {
        dispatch(setFirstEntityRating({ id: compareOption.id, rating: value }));
    }, [compareOption.id, dispatch]);

    const handleSecondRating = useCallback((value) => {
        dispatch(setSecondEntityRating({ id: compareOption.id, rating: value }));
    }, [compareOption.id, dispatch]);

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

            <Rating setRating={handleFirstRating}/>
            <Rating setRating={handleSecondRating}/>
        </AnimatedView>
    );
});

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