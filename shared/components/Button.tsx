import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";
import { Color, Typography } from "../design/tokens";
import { useRef } from "react";

type ButtonProps = {
  title?: string;
  style?: object;
  asLink?: boolean;
} & PressableProps;

export default function Button({
  style,
  children,
  title,
  asLink,
  onPressIn,
  onPressOut,
  onLongPress,
  ...rest
}: ButtonProps) {
  const colorValue = useRef(new Animated.Value(0)).current;

  const styles = asLink ? stylesLink : stylesDefault;

  const animatedColor = colorValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Color.purple, Color.purpleLight],
  });

  const onPressInAnimate = (event: GestureResponderEvent) => {
    Animated.timing(colorValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: !asLink,
    }).start();

    onPressIn && onPressIn(event);
  };

  const onPressOutAnimate = (event: GestureResponderEvent) => {
    Animated.timing(colorValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: !asLink,
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
          ...(!asLink && { backgroundColor: animatedColor }),
          ...style,
        }}
      >
        <Animated.Text
          style={{
            ...styles.text,
            ...(asLink && { color: animatedColor }),
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
    fontFamily: Typography.fonts.semiBold
  },
});
