import {Text, Pressable, StyleSheet, View} from 'react-native';
import AnimatedText from "react-native-reanimated/src/reanimated2/component/Text";

function MainButton ({onPress, children, textStyle})
{

    return (
        <Pressable onPress={onPress}>
            <View style = {[styles.textContainer]}>
                <AnimatedText style = {[styles.textStyle]}>{children}</AnimatedText>
            </View>
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