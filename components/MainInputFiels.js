import React, { useState, useEffect } from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

function MainInputFields ({placeholder, setInputValue, value})
{


    
    return (
        <View style = {[styles.textInputContainer]}>
            <TextInput 
            style = {[styles.textInput]} 
            placeholder={placeholder} 
            placeholderTextColor = '#333333'
            autoCapitalize='characters'
            maxLength={15}
            textAlign = 'center'
            onChangeText={text => setInputValue(text)}
            value ={value}
            caretHidden = {false}
            
            />
        </View>
    );
}

export default MainInputFields;

const styles = StyleSheet.create ({
    textInputContainer:
    {
        borderBottomColor : 'white',
        borderWidth: 1,
        alignItems: 'center',
        width: '100%',
    },
    textInput:
    {
        color: 'white',
        fontSize:12,
        width: '100%',
        height: 35

    }


});