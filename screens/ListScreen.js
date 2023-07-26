import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedView from 'react-native-reanimated/src/reanimated2/component/View';
import { compareOptionsSelector, closedSelector } from '../store/Rating/selectors';
import ComparoMainComponent from '../components/ComparoMainComponent';
import ComparoName from '../components/ComparoName';
import AddButton from '../components/AddButton';
import {
  addCompareOption,
  removeCompareOption,
  clearOptions,
  closeOption,
} from '../store/Rating/reducer';

function ListScreen({ firstItem, secondItem, clearList }) {
  const dispatch = useDispatch();
  const options = useSelector(compareOptionsSelector);
  const closed = useSelector(closedSelector);
  const scrollRef = useRef(null);
  const timerRef = useRef(null);
  const [minusButton, setMinusButton] = useState(false);

  // Анимация кнопок
  const firstButtonPosition = useSharedValue(0);
  const secondButtonPosition = useSharedValue(0);
  const secondButtonOpacity = useSharedValue(0);

  const reanimatedFirstButtonStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: firstButtonPosition.value }],
    }),
    []
  );
  const reanimatedSecondButtonStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: secondButtonPosition.value }],
      opacity: secondButtonOpacity.value,
    }),
    []
  );

  function OpenButtons() {
    firstButtonPosition.value = withTiming(60, { duration: 500 });
    secondButtonPosition.value = withTiming(-60, { duration: 500 });
    secondButtonOpacity.value = withTiming(1, { duration: 200 });
  }

  function CloseButtons() {
    firstButtonPosition.value = withTiming(0, { duration: 500 });
    secondButtonPosition.value = withTiming(0, { duration: 500 });
    secondButtonOpacity.value = withTiming(0, { duration: 500 });
  }

  function AddLine() {
    dispatch(addCompareOption());
    if (options.length > 0 && firstButtonPosition.value !== 60) {
      OpenButtons();
      setMinusButton(false);
    }
  }

  function DeleteLine() {
    dispatch(closeOption());
    setTimeout(() => {
      dispatch(removeCompareOption());
    }, 350);
    if (options.length < 3 && firstButtonPosition.value === 60) {
      CloseButtons();
      setMinusButton(true);
    }
  }

  function Names() {
    return (
      <View>
        <ComparoName firstItem={firstItem} secondItem={secondItem} />
      </View>
    );
  }

  function Buttons() {
    return (
      <AnimatedView style={styles.buttonContainer}>
        <AddButton
          onPress={DeleteLine}
          disabled={minusButton}
          name="minus"
          buttonStyle={reanimatedSecondButtonStyle}
        />
        <AddButton
          onPress={AddLine}
          disabled={false}
          name="plus"
          buttonStyle={reanimatedFirstButtonStyle}
        />
      </AnimatedView>
    );
  }

  useEffect(() => {
    if (clearList) {
      timerRef.current = setTimeout(() => {
        dispatch(clearOptions());
        CloseButtons();
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [clearList]);

  return (
    <FlatList
      ListHeaderComponent={Names}
      ListFooterComponent={Buttons}
      scrollEnabled
      data={options}
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
      ref={(it) => (scrollRef.current = it)}
      onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
      renderItem={(item) => (
        <AnimatedView key={item.index}>
          <ComparoMainComponent compareOption={item.item} componentClosed={closed[item.index]} />
        </AnimatedView>
      )}
    />
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100',
    justifyContent: 'flex-start',
    height: 45,
  },
});
