import {View, Pressable, StyleSheet, Animated} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function AddButton ({onPress})
{

    return (
        <Pressable onPress={onPress}>
            <View style ={styles.root}>
            <Animated.View style = {styles.buttonContainer}>
                <AntDesign name="pluscircleo" size={24} color="black" />
            </Animated.View>
            </View>
        </Pressable>
    );
}

export default AddButton;

const styles = StyleSheet.create ({
    
    buttonContainer:
    {
        marginTop: '2%',
        marginRight: '66%',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 2,
        width: '32%'
    },
    root:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 35
    },




});