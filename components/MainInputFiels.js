import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';

function MainInputFields ({placeholder, setInputValue, opacityPoint, animationStarted, value})
{
    const [opacity] = useState(new Animated.Value(0));


    useEffect(() => {
        if(animationStarted)
        {
            if(opacityPoint ===0)
            {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: opacityPoint,
                        duration: 400, 
                        useNativeDriver: true,
                      }).start();
                  }, 700);
            }
            else
            {
                Animated.timing(opacity, {
                    toValue: opacityPoint,
                    duration: 200, 
                    useNativeDriver: true,
                  }).start();
            }
            
            
        }
      }, [animationStarted]);

      const interpolatedOpacity = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      });

    
    return (
        <Animated.View style = {[styles.textInputContainer, {opacity: interpolatedOpacity}]}>
            <TextInput 
            style = {[styles.textInput]} 
            placeholder={placeholder} 
            placeholderTextColor = '#333333'
            autoCapitalize='characters'
            maxLength={15}
            textAlign = 'center'
            onChangeText={text => setInputValue(text)}
            value ={value}
            
            />
        </Animated.View>
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

    }


});