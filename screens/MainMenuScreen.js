import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

import AnimatedView from 'react-native-reanimated/src/reanimated2/component/View';
import MainButton from '../components/MainButton';
import MainInputFields from '../components/MainInputFiels';
import ListScreen from './ListScreen';
import TotalCount from '../components/TotalCount';

const screen = Dimensions.get('window');
const screenHeight = screen.height;
const screenWidth = screen.width;

function MainMenuScreen() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [clearList, setClearList] = useState(true);
  const [point, setPoint] = useState(1);
  const [buttonText, setButtonText] = useState('COMPARO');
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');
  // Анимация кнопки
  const buttonMarginTop = useSharedValue(screenHeight * 0.04);
  const buttonShake = useSharedValue(0);
  const textOpacity = useSharedValue(1);
  const reanimatedButtonStyle = useAnimatedStyle(
    () => ({
      marginTop: buttonMarginTop.value,
      transform: [{ translateX: buttonShake.value }],
      opacity: textOpacity.value,
    }),
    []
  );

  function ButtonDown() {
    // buttonMarginTop.value = withTiming(screenHeight*0.91, {duration:1200});
    textOpacity.value = withSequence(
      withTiming(0, { duration: 500 }),
      withTiming(1, { duration: 500 })
    );
    setTimeout(() => {
      setButtonText('TRY OTHER');
    }, 500);
  }

  function ButtonUp() {
    // buttonMarginTop.value = withTiming(screenHeight/2, {duration:1200});
    textOpacity.value = withSequence(
      withTiming(0, { duration: 1100 }),
      withDelay(50, withTiming(1, { duration: 300 }))
    );
    setTimeout(() => {
      setButtonText('COMPARO');
    }, 1100);
    setFirstItem('');
    setSecondItem('');
  }

  function ButtonShake() {
    buttonShake.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 80, easing: Easing.linear }),
        withTiming(0, { duration: 80, easing: Easing.linear }),
        withTiming(-15, { duration: 80, easing: Easing.linear }),
        withTiming(0, { duration: 80, easing: Easing.linear })
      ),
      2,
      true
    );
  }

  // Анимация главного экрана при входе
  const opacityMainScreen = useSharedValue(0);
  const reanimatedMainScreen = useAnimatedStyle(
    () => ({
      opacity: opacityMainScreen.value,
    }),
    []
  );
  useEffect(() => {
    opacityMainScreen.value = withTiming(1, { duration: 1000 });
  }, [opacityMainScreen]);

  // Анимация экрана
  const translateScreen = useSharedValue(screenHeight);
  const screenBorder = useSharedValue(0);
  const opacityInputsWrapperValue = useSharedValue(1);
  const heightInputsWrapperValue = useSharedValue(50);
  const marginInputsWrapperValue = useSharedValue(screenHeight * 0.4);

  const inputsWrapperTransition = useAnimatedStyle(() => ({
    opacity: opacityInputsWrapperValue.value,
    height: heightInputsWrapperValue.value,
    marginTop: marginInputsWrapperValue.value,
  }));
  const reanimatedStyleBackground = useAnimatedStyle(
    () => ({
      height: translateScreen.value,
      borderBottomLeftRadius: screenBorder.value,
      borderBottomRightRadius: screenBorder.value,
    }),
    []
  );

  function ScreenTranslateUp() {
    translateScreen.value = withTiming(screenHeight * 0.1, { duration: 1200 });
    screenBorder.value = 15;
    ButtonDown();
    setInputsPosition(0, 0, 0);
  }

  function ScreenTranslateDown() {
    translateScreen.value = withTiming(screenHeight, { duration: 1000 });
    screenBorder.value = withDelay(1000, withTiming(0, { duration: 0 }));
    ButtonUp();
    setInputsPosition(1, 50, screenHeight * 0.4);
  }

  function startAnimation() {
    if (firstItem !== '' && secondItem !== '') {
      setAnimationStarted(true);
      if (point === 1) {
        setClearList(false);
        ScreenTranslateUp();
        setPoint(0);
      } else {
        setClearList(true);
        ScreenTranslateDown();
        setPoint(1);
      }
    } else if (firstItem === '' || secondItem === '') {
      ButtonShake();
    }
  }

  function setInputsPosition(opacity, height, margin) {
    opacityInputsWrapperValue.value = withTiming(opacity, { duration: 1000 });
    heightInputsWrapperValue.value = withTiming(height, { duration: 1000 });
    marginInputsWrapperValue.value = withTiming(margin, { duration: 1000 });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <StatusBar style="light" />
        <AnimatedView style={[styles.backgroundTop, reanimatedStyleBackground]}>
          <AnimatedView style={[styles.textInputContainer, inputsWrapperTransition]}>
            <View style={styles.textInputContainerInner}>
              <MainInputFields
                placeholder="FIRST ITEM"
                setInputValue={setFirstItem}
                value={firstItem}
              />
            </View>
            <View style={styles.textInputContainerInner}>
              <MainInputFields
                placeholder="SECOND ITEM"
                setInputValue={setSecondItem}
                value={secondItem}
              />
            </View>
          </AnimatedView>

          <AnimatedView
            style={[styles.mainButtonContainer, reanimatedMainScreen, reanimatedButtonStyle]}
          >
            <MainButton onPress={startAnimation}>{buttonText}</MainButton>
          </AnimatedView>
        </AnimatedView>
        <View style={styles.secondScreen}>
          <View style={[styles.backgroundList]}>
            <ListScreen firstItem={firstItem} secondItem={secondItem} clearList={clearList} />
            <View style={styles.backgroundBottom}>
              <TotalCount />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MainMenuScreen;

const styles = StyleSheet.create({
  expandingElement: {
    backgroundColor: 'blue',
    width: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: StatusBar.currentHeight,
  },

  root: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  mainButtonContainer: {
    marginTop: 215,
    alignSelf: 'center',
  },
  textInputContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInputContainerInner: {
    width: '40%',
  },
  backgroundTop: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black',
    position: 'relative',
    alignSelf: 'center',
    zIndex: 2,
  },

  secondScreen: {
    flex: 1,
  },
  backgroundList: {
    height: screenHeight * 0.9,
    backgroundColor: 'white',
  },

  backgroundBottom: {
    height: screenHeight * 0.1,
    backgroundColor: 'black',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: '0%',
    alignItems: 'flex-end',
  },

  logo: {
    width: 200,
    height: 200,
    position: 'absolute',
    opacity: 0,
  },
  logoContainer: {
    alignItems: 'center',
  },
});
