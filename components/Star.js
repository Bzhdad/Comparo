import { AntDesign } from '@expo/vector-icons';

const Star = ({ name, size, color, onPress }) => {
  return (
    <AntDesign
      name={name}
      size={size}
      color={color}
      onPress={() => {
        onPress();
      }}
    />
  );
};

export default Star;
