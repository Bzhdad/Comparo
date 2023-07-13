import { View, StyleSheet,TextInput} from 'react-native';
import React, { useState} from 'react';
import StarComponent from './StarComponent';

function ComparoMainComponent({clearMark, onSumFirstChange, onSumSecondChange})
{
    const [sumFirst, setSumFirst] = useState(1);
    const [sumSecond, setSumSecond] = useState(1);
    
    const handleSumFirstChange = (newSumFirst) => {
        setSumFirst(newSumFirst);
        onSumFirstChange(newSumFirst);
      };

      const handleSumSecondChange = (newSumSecond) => {
        setSumSecond(newSumSecond);
        onSumSecondChange(newSumSecond);
      };

    return (
        

        
        
        <View style = {styles.rootContainer}>
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

            <StarComponent starName={"staro"} clearMark = {clearMark} onSumChange = {handleSumFirstChange}/> 
                
            <StarComponent starName={"staro"} clearMark = {clearMark} onSumChange = {handleSumSecondChange}/> 
        </View>
    );
}

export default ComparoMainComponent;

const styles = StyleSheet.create ({

    starContainer:
    {
        alignItems: 'center',
        justifyContent: 'center'
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