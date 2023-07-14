import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';


function StarComponent({clearMark, onSumChange})
{
    const [firstStarName, setFirstStarName] = useState('star');
    const [secondStarName, setSecondStarName] = useState('staro');
    const [thirdStarName, setThirdStarName] = useState('staro');
    const [fourthStarName, setFourthStarName] = useState('staro');
    const [fifthStarName, setFifthStarName] = useState('staro');

    const [sum, setSum] = useState(1);

    useEffect (()=> {
        if(clearMark && secondStarName === 'star')
        {
            setTimeout(() => {
                setFirstStarName('star');
                setSecondStarName('staro');
                setThirdStarName('staro');
                setFourthStarName('staro');
                setFifthStarName('staro');
                setSum(1);
                onSumChange(1);
            }, 1200);
        
        }
    });


    function One()
    {
        setFirstStarName('star');
        setSecondStarName('staro');
        setThirdStarName('staro');
        setFourthStarName('staro');
        setFifthStarName('staro');
        setSum(1);
        onSumChange(1);
    }

    function Two()
    {
        setFirstStarName('star');
        setSecondStarName('star');
        setThirdStarName('staro');
        setFourthStarName('staro');
        setFifthStarName('staro');
        setSum(2);
        onSumChange(2);
    }

    function Three()
    {
        setFirstStarName('star');
        setSecondStarName('star');
        setThirdStarName('star');
        setFourthStarName('staro');
        setFifthStarName('staro');
        setSum(3);
        onSumChange(3);
    }

    function Four()
    {
        setFirstStarName('star');
        setSecondStarName('star');
        setThirdStarName('star');
        setFourthStarName('star');
        setFifthStarName('staro');
        setSum(4);
        onSumChange(4);
    }

    function Five()
    {
        setFirstStarName('star');
        setSecondStarName('star');
        setThirdStarName('star');
        setFourthStarName('star');
        setFifthStarName('star');
        setSum(5);
        onSumChange(5);
    }




    return (
        <View style = {styles.starContainer}>
        <AntDesign name= {firstStarName} size={15} color="black"  onPress={One}/>
        <AntDesign name= {secondStarName} size={15} color="black"  onPress={Two}/>
        <AntDesign name= {thirdStarName} size={15} color="black"  onPress={Three}/>
        <AntDesign name= {fourthStarName} size={15} color="black"  onPress={Four}/>
        <AntDesign name= {fifthStarName} size={15} color="black"  onPress={Five}/>
        </View>
    );


}

export default StarComponent;

const styles = StyleSheet.create ({

    starContainer:
    {
        width: '30%',
        marginRight:'2%',
        marginTop: '2%',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },


});