import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";
import { Color } from "../design/tokens";
import { useRef } from "react";

type ButtonProps = {
  title?: string;
  style?: object;
  isLink?: boolean;
} & PressableProps;

export default function Button({
  style,
  children,
  title,
  isLink,
  onPressIn,
  onPressOut,
  onLongPress,
  ...rest
}: ButtonProps) {
  const colorValue = useRef(new Animated.Value(0)).current;

  const styles = isLink ? stylesLink : stylesDefault;

  const animatedColor = colorValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Color.purple, Color.purpleLight],
  });

  const onPressInAnimate = (event: GestureResponderEvent) => {
    Animated.timing(colorValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: !isLink,
    }).start();

    onPressIn && onPressIn(event);
  };

  const onPressOutAnimate = (event: GestureResponderEvent) => {
    Animated.timing(colorValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: !isLink,
    }).start();

    onPressOut && onPressOut(event);
  };

  return (
    <Pressable
      {...rest}
      style={styles.container}
      onPressIn={onPressInAnimate}
      onPressOut={onPressOutAnimate}
    >
      <Animated.View
        style={{
          ...styles.button,
          ...(!isLink && { backgroundColor: animatedColor }),
          ...style,
        }}
      >
        <Animated.Text
          style={{
            ...styles.text,
            ...(isLink && { color: animatedColor }),
          }}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const stylesLink = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    textAlign: "center",
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
  },
});

const stylesDefault = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    textAlign: "center",
    borderRadius: 12,
  },
  text: {
    color: Color.white,
    fontSize: 18,
    fontWeight: 600,
  },
});
