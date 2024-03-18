import { View } from 'react-native';
import Animated, {
  SharedValue,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const PaginationItem: React.FC<{
  index: number;
  activeColor: string;
  inactiveColor: string;
  length: number;
  animValue: SharedValue<number>;
  isRotate?: boolean;
  width?: number;
}> = (props) => {
  const { animValue, index, length, activeColor,inactiveColor, isRotate, width = 10 } = props;
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: inactiveColor,
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: activeColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default PaginationItem;
