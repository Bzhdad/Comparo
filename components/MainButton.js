import {View, Text, Pressable, StyleSheet, Animated, Easing} from 'react-native';
import React, { useState, useEffect } from 'react';

function MainButton ({onPress, children, style})
{

    



    return (
        <Pressable onPress={onPress}>
            <Animated.View style = {[styles.textContainer, style]}>
                <Text style = {[styles.textStyle]}>{children}</Text>
            </Animated.View>
        </Pressable>
    );
}

export default MainButton;

const styles = StyleSheet.create ({
    textStyle:
    {
        color: 'white',
        letterSpacing: 3,
        margin: 10
        
    },

    textContainer:
    {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    }


});