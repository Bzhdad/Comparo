import { View, StyleSheet, Animated, Easing, Dimensions, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';

import MainButton from '../components/MainButton';
import MainInputFields from '../components/MainInputFiels';
import ListScreen from './ListScreen';
import TotalCount from '../components/TotalCount';

function MainMenuScreen() {
  const [marginTop, setMarginTop] = useState(new Animated.Value(0));
  const [height, setHeight] = useState(new Animated.Value(0));
  const [borderRadius, setBorderRadius] = useState (new Animated.Value(0));
  const [heightList, setheightList] = useState (new Animated.Value(0));
  const [heightBottom, setheightBottom] = useState (new Animated.Value(0));
  const [shake, setShake] = useState(new Animated.Value(0));

  const [animationStarted, setAnimationStarted] = useState(false);
  const [inputEmpty, setInputEmpty] = useState(true);
  const [clearList, setCleatList] = useState(true);
  const [point, setPoint] = useState(1);
  const [buttonText, setButtonText] = useState ('COMPARO');

  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');

  const screen = Dimensions.get('window');
  const screenHeight = screen.height;


  useEffect(() => {
    if (animationStarted) {

      Animated.parallel([
        Animated.timing(marginTop, {
          toValue: point,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(height, {
          toValue: point,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(borderRadius, {
            toValue: point,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }),
        Animated.timing(heightList, {
            toValue: point,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(heightBottom, {
            toValue: point,
            duration: 1200, 
            useNativeDriver: false,
            }),
      ]).start(() => {
        setAnimationStarted(false);
        if(point === 0){ setPoint(1);}
        else{ setPoint(0);}
      });


    }
  }, [animationStarted]);

  const interpolatedMarginTop = marginTop.interpolate({
    inputRange: [0, 1],
    outputRange: ['120%', '15%'],
  });

  const interpolatedHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight*1.1, screenHeight*0.15],
  });

  const interpolatedBorderRadius = borderRadius.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  });

  const interpolatedListHeight = heightList.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenHeight*0.75]
  });

  const interpolatedBottomHeight = heightBottom.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenHeight*0.15]
  });

  const interpolatedShake = shake.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15,0,-15,0],
  });

const shakeStyle = {transform: [{translateX: interpolatedShake}]}

  function startAnimation() {
    if (firstItem !== '' && secondItem !== '')
    {
      setAnimationStarted(true);
      if (point ===1){
        setButtonText('TRY OTHER');
        setCleatList(false);

      }
      else
      {
          setButtonText('COMPARO');
          setFirstItem('');
          setSecondItem('');
          setCleatList(true);
          

      }
    }
    else if (firstItem === '' || secondItem === '')
    {
      shake.setValue(0);
      Animated.timing(shake, {
          toValue: 3,
          duration: 400, 
          useNativeDriver: false,
        }).start()
    }


  }

  return (
    
    
    <View style = {styles.root}>
        <StatusBar style="light" />
    <Animated.View 
    style={[styles.backgroundTop,{
    height: interpolatedHeight, 
    borderBottomRightRadius: interpolatedBorderRadius, 
    borderBottomLeftRadius: interpolatedBorderRadius,
    }]}>
        <View style = {styles.textInputContainer}>
            <View style = {styles.textInputContainerInner}>
                <MainInputFields 
                placeholder={'FIRST ITEM'}
                setInputValue = {setFirstItem}
                opacityPoint ={point}
                animationStarted = {animationStarted}
                value = {firstItem}
                />
            </View>
            <View style = {styles.textInputContainerInner}>
                <MainInputFields 
                placeholder={'SECOND ITEM'}
                setInputValue = {setSecondItem}
                opacityPoint ={point}
                animationStarted = {animationStarted}
                value = {secondItem}
                />
            </View>
        </View>
        
        <Animated.View style={[shakeStyle,styles.mainButtonContainer, { marginTop: interpolatedMarginTop}]}> 
            <MainButton 
            onPress={startAnimation} 
            inputEmpty ={inputEmpty}

            >{buttonText}</MainButton>
        </Animated.View>

    </Animated.View>
    
    
    
    <Animated.View style = {[styles.backgroundList, {height:interpolatedListHeight}]}>
      <ListScreen 
      firstItem={firstItem}
      secondItem={secondItem}
      clearList = {clearList}
      />
    </Animated.View>

    <Animated.View style = {[styles.backgroundBottom, {height:interpolatedBottomHeight}]}>
      <TotalCount />
    </Animated.View>

    

    </View>
  );
}

export default MainMenuScreen;

const styles = StyleSheet.create({
    root:
    {
        flex:1,
        flexDirection: 'column'
    },
    mainButtonContainer:
    {
      position: 'absolute',
      alignSelf: 'center'
    },
    textInputContainer:
    {
        marginTop: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'


    },
    textInputContainerInner:
    {
      width: '40%'
    },
    backgroundTop:
    {
      
      width: '100%',
      backgroundColor: 'black',
    },
    backgroundList:
    {
        width: '100%',
        backgroundColor: 'white',
    },
    backgroundBottom:
    {
        width: '100%',
        backgroundColor: 'black',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginTop: '10%'

    },
  });

