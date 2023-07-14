import { View,Text, StyleSheet } from "react-native";

function ComparoName ({firstItem, secondItem})
{
    return (
        <View style= {styles.rootContainer}>
            <View style= {styles.textContainer}>
                <Text style= {styles.text}>{firstItem}</Text>
            </View>
            <View style= {styles.textContainer}>
                <Text style= {styles.text}>{secondItem}</Text>
            </View>
        </View>
    );
}

export default ComparoName;

const styles = StyleSheet.create ({

    textContainer:
    {
        backgroundColor: 'black',
        width: '30%',
        marginRight:'2%',
        marginTop: '2%',
        borderRadius: 10,
        alignItems: 'center',
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
        height: 30
    }

});