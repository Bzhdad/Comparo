import {View, Pressable, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";

function AddButton ({onPress, name, buttonStyle, disabled})
{

    return (
        <AnimatedView style = {[styles.buttonContainer, buttonStyle]}>
        <Pressable onPress={onPress} disabled={disabled}>
                <AntDesign name={name} size={24} color="black" />
        </Pressable>
        </AnimatedView>
    );
}

export default AddButton;

const styles = StyleSheet.create ({
    
    buttonContainer:
    {
        alignSelf: 'center',
        position:"absolute",
        marginTop: 5

    },




});