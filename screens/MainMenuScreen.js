import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, {useState } from 'react';
import {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';


import MainButton from '../components/MainButton';
import MainInputFields from '../components/MainInputFiels';
import ListScreen from './ListScreen';
import TotalCount from '../components/TotalCount';
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";

const screen = Dimensions.get('screen');
const screenHeight = screen.height;
const screenWidth = screen.width;

function MainMenuScreen() {

  const [animationStarted, setAnimationStarted] = useState(false);
  const [clearList, setCleatList] = useState(true);
  const [point, setPoint] = useState(1);
  const [buttonText, setButtonText] = useState ('COMPARO');

  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');
  
    //Анимация кнопки
    const buttonMarginTop = useSharedValue(screenHeight/2)
    const buttonShake = useSharedValue(0);
    const textOpacity = useSharedValue(1)
    const reanimatedButtonStyle = useAnimatedStyle(() => {
      return {
            marginTop: buttonMarginTop.value,
            transform:[{translateX:buttonShake.value}],
            opacity: textOpacity.value,
      };
  },[]);
  function ButtonDown()
  {
      buttonMarginTop.value = withTiming(screenHeight*0.91, {duration:1200});
      textOpacity.value = withSequence(withTiming(0, {duration:500}), withTiming(1,{duration:500}));
      setTimeout(() => {
          setButtonText('TRY OTHER');
      }, 500);
  }
  function ButtonUp() {
      buttonMarginTop.value = withTiming(screenHeight/2, {duration:1200});
      textOpacity.value = withSequence(withTiming(0, {duration:500}), withTiming(1,{duration:500}));
      setTimeout(() => {
          setButtonText('COMPARO');
      }, 500);
      setFirstItem('');
      setSecondItem('');
  }
  function ButtonShake() {
      buttonShake.value = withRepeat(withSequence(
          withTiming(15, {duration:80, easing:Easing.linear}),
          withTiming(0, {duration:80, easing:Easing.linear}),
          withTiming(-15, {duration:80, easing:Easing.linear}),
          withTiming(0, {duration:80, easing:Easing.linear})),
          2, true);
  }

  //Анимация текста



  //Анимация экрана
  const translateScreen = useSharedValue(0);
  const screenBorder = useSharedValue(0);
  const reanimatedStyleBackground = useAnimatedStyle(()=> {
      return {
          transform:[{translateY:translateScreen.value}],
          borderBottomLeftRadius: screenBorder.value,
          borderBottomRightRadius: screenBorder.value,

      };
  }, []);
  function ScreenTranslateUp ()
  {
      translateScreen.value = withTiming(-screenHeight*0.9, {duration:1200});
      screenBorder.value = 15
      ButtonDown();
  }
  function ScreenTranslateDown()
  {
      translateScreen.value = withTiming(0, {duration:1200});
      screenBorder.value = 0
      ButtonUp();
  }

  function startAnimation() {
    if (firstItem !== '' && secondItem !== '') {
      setAnimationStarted(true);
      if (point ===1){
        setCleatList(false);
        ScreenTranslateUp();
        setPoint(0);
      }
      else {
          setCleatList(true);
          ScreenTranslateDown();
          setPoint(1);
      }
    }
    else if (firstItem === '' || secondItem === '') {
        ButtonShake();
    }


  }

  return (

    <SafeAreaView style = {styles.safeArea}>
        <View style = {styles.root}>
            <StatusBar style="light" />
            <AnimatedView style={[styles.backgroundTop, reanimatedStyleBackground]}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/comparoIcon.png')} style={styles.logo}/>
                </View>
                <View style = {styles.textInputContainer}>
                    <View style = {styles.textInputContainerInner}>
                        <MainInputFields
                            placeholder={'FIRST ITEM'}
                            setInputValue = {setFirstItem}
                            value = {firstItem}
                        />
                    </View>
                    <View style = {styles.textInputContainerInner}>
                        <MainInputFields
                            placeholder={'SECOND ITEM'}
                            setInputValue = {setSecondItem}
                            value = {secondItem}
                        />
                    </View>
                </View>

                <AnimatedView style={[styles.mainButtonContainer, reanimatedButtonStyle]}>
                    <MainButton onPress={startAnimation}>{buttonText}</MainButton>
                </AnimatedView>
            </AnimatedView>
                <View style = {styles.secondScreen}>
                    <View style = {[styles.backgroundList]}>
                    <ListScreen
                    firstItem={firstItem}
                    secondItem={secondItem}
                    clearList = {clearList}
                    />
                        <View style = {[styles.backgroundBottom]}>
                            <TotalCount/>
                        </View>
                    </View>


                </View>


        </View>
    </SafeAreaView>
  );
}

export default MainMenuScreen;

const styles = StyleSheet.create({
    safeArea:{    flex:1,
        backgroundColor: 'black',
        marginTop: StatusBar.currentHeight
    },

    root:
    {
        flex:1,
        backgroundColor:'white'
    },
    mainButtonContainer:
    {
        position: 'absolute',
        alignSelf: 'center'
    },
    textInputContainer:
    {
        marginTop: screenHeight*0.4,
        flexDirection: 'row',
        justifyContent: 'space-around'


    },
    textInputContainerInner:
    {
      width: '40%'
    },
    backgroundTop: {
        width: screenWidth,
        height:screenHeight,
        backgroundColor: 'black',
        position:"absolute",
        alignSelf: 'center',
        zIndex: 2

    },

    secondScreen:{
      flex:1,
        justifyContent:'space-between',
    },
    backgroundList: {
        height: screenHeight*0.8,
        marginTop:screenHeight*0.1,
        backgroundColor: 'white'

    },

    backgroundBottom: {
        height: screenHeight*0.1,
        backgroundColor: 'black',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginTop: '0%',
        alignItems:'flex-end',
    },

    logo:
        {
            width: 100,
            height: 100,
            position: 'absolute',
            marginTop: 50,
            opacity: 0
        },
    logoContainer:
        {
            alignItems: 'center'
        }

  });

