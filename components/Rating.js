import { View, StyleSheet } from 'react-native';
import React, { useState, memo } from 'react';
import Star from './Star';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

const Rating = memo(({ setRating }) => {

  const starSize = useSharedValue(21);

  function UpdateStarSize ()
  {
    starSize.value = withSequence(withTiming(23, {duration: 200}), withTiming(21,{duration:200}))
  }


  const [stars, setStars] = useState([
    { id: 1, value: 1, name: 'star', size: 21, color: 'black' },
    { id: 2, value: 2, name: 'staro', size: 21, color: 'black'},
    { id: 3, value: 3, name: 'staro', size: 21, color: 'black' },
    { id: 4, value: 4, name: 'staro', size: 21, color: 'black'},
    { id: 5, value: 5, name: 'staro', size: 21, color: 'black'},
  ]);

  const setStarNames = (starCount) => {
    const updatedStars = stars.map((star) => ({
      ...star,
      name: star.value <= starCount ? 'star' : 'staro',
      size: star.value <= starCount ? starSize:21
    }));
    setStars(updatedStars);
    setRating(starCount);
    UpdateStarSize();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.starContainer}>
        {stars.map((star) => (
          <Star
            key={star.id}
            size={star.size}
            color={star.color}
            name={star.name}
            onPress={() => setStarNames(star.value)}
          />
        ))}
      </View>
    </View>
  );
});

export default Rating;

const styles = StyleSheet.create({
  rootContainer: {
    width: '30%',
    marginRight: '2%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  starContainer: {
    marginRight: '2%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
});
