import React, { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AnimatedView from 'react-native-reanimated/src/reanimated2/component/View';

function AddButton({ onPress, name, buttonStyle, disabled }) {
  return (
    <AnimatedView style={[styles.buttonContainer, buttonStyle]}>
      <Pressable onPress={onPress} disabled={disabled} style={styles.pressContainer}>
        <AntDesign name={name} size={24} color="white" />
      </Pressable>
    </AnimatedView>
  );
}

export default AddButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'black',
    width: 80,
    borderRadius: 20,

    backgroundColor: 'black',
    height: 35,
  },
  pressContainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
