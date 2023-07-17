import { View, StyleSheet, Text} from 'react-native';

function TotalCount({firstNumber, secondNumber}) {
    return (
        
 
        <View style = {styles.rootContainer}>
            <View style = {styles.totalContainer}>
            <Text style ={styles.textStyle}>TOTAL</Text>
            </View>
            <View style = {styles.countContainer}>
            <Text style ={styles.textStyle}>{firstNumber}</Text>
            </View>
            <View style = {styles.countContainer}>
            <Text style ={styles.textStyle}>{secondNumber}</Text>
            </View>

        </View>
    );
}

export default TotalCount;

const styles = StyleSheet.create ({

    textStyle:
    {
        color: 'white',
        letterSpacing: 3,
        margin: 10,
        fontWeight: 'bold'
        
    },

    rootContainer:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },

    countContainer:
    {
        width: '30%',
        marginRight:'2%',
        marginTop: '2%',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: 'white',
        borderWidth: 1
    },

    totalContainer:
    {
        width: '32%',
        marginRight:'2%',
        marginTop: '2%',
        borderRadius: 10,
        alignItems: 'center',
    },



});