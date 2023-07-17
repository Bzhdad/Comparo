import { View, StyleSheet, Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import Star from "./Star";


function Rating({clearMark, onSumChange}) {


    const [value, setValue] = useState(1);

    const [stars, setStars] = useState([
        {id: 1, value: 1, name: 'star', size: 21, color: 'black' },
        {id: 2, value: 2, name: 'staro', size: 21, color: 'black' },
        {id: 3, value: 3, name: 'staro', size: 21, color: 'black' },
        {id: 4, value: 4, name: 'staro', size: 21, color: 'black' },
        {id: 5, value: 5, name: 'staro', size: 21, color: 'black' },
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
                name: star.value <= starCount[0] ? 'star' : 'staro',
            };
        });
        setStars(updatedStars);
        onSumChange(starCount[0]);
        setValue(starCount[0]);
    };

    useEffect (()=> {
        if(clearMark) {
            setTimeout(() => {
                resetRating()
            }, 1200);
        }
    }, [clearMark]);




    return (
        <View style={styles.rootContainer}>
            <View>


        <View style = {styles.starContainer}>
            {stars.map((star)=>(
                <Star key={star.id} size={star.size} color={star.color} name={star.name} onPress={()=>setStarNames(star.value)}/>
            ))}
        </View>
            <View style={styles.sliderContainer}>
                <Slider
                value={value}
                minimumValue={1}
                maximumValue={5}
                step={1}
                onValueChange={setStarNames}

                />

            </View>
            </View>
        </View>



    );


}

export default Rating;

const styles = StyleSheet.create ({

    rootContainer: {
        width: '30%',
        marginRight:'2%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        },

    starContainer:
    {

        marginRight:'2%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 2
    },

    sliderContainer:
        {
            position: "absolute",
            justifyContent: 'center',
            borderWidth:1,
            borderColor: 'red',
            width: '100%',
            height: '100%',
            alignSelf:'center',
            paddingHorizontal: 0,
            opacity: 0



        }


});