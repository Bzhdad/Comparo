import { View, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import Star from "./Star";


function Rating({clearMark, onSumChange}) {

    const [stars, setStars] = useState([
        {id: 1, value: 1, name: 'star', size: 15, color: 'black' },
        {id: 2, value: 2, name: 'staro', size: 15, color: 'black' },
        {id: 3, value: 3, name: 'staro', size: 15, color: 'black' },
        {id: 4, value: 4, name: 'staro', size: 15, color: 'black' },
        {id: 5, value: 5, name: 'staro', size: 15, color: 'black' },
    ]);

    const resetRating = () => {
        const resetValues = stars.map((star)=> {
            return {
                ...star,
                name: star.id === 1 ? 'star' : 'staro',
            }
        })
        setStars(resetValues);
        onSumChange(1)
    }

    const setStarNames = (starCount) => {
        const updatedStars = stars.map((star) => {
            return {
                ...star,
                name: star.value <= starCount ? 'star' : 'staro',
            };
        });
        setStars(updatedStars);
        onSumChange(starCount);
    };

    useEffect (()=> {
        if(clearMark) {
            setTimeout(() => {
                resetRating()
            }, 1200);
        }
    }, [clearMark]);




    return (
        <View style = {styles.starContainer}>
            {stars.map((star)=>(
                <Star key={star.id} size={star.size} color={star.color} name={star.name} onPress={()=>setStarNames(star.value)}/>
            ))}
        </View>
    );


}

export default Rating;

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