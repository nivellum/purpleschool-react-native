import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";
import { Color, Typography } from "../design/tokens";
import { useRef } from "react";
import SpinnerIcon from "../svg/icons/SpinnerIcon";

type ButtonProps = {
  title?: string;
  style?: object;
  asLink?: boolean;
  pending?: boolean;
} & PressableProps;

export default function Button({
  style,
  children,
  title,
  asLink,
  disabled,
  pending,
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
      disabled={disabled || pending}
    >
      <Animated.View
        style={{
          ...styles.button,
          ...(!asLink && {
            backgroundColor: disabled || pending ? Color.purpleDark : animatedColor,
          }),
          ...style,
        }}
      >
        {pending && <ActivityIndicator color={Color.white} style={{width: 30, height: 30}}/> }
        {!pending && (
          <Animated.Text
            style={{
              ...styles.text,
              ...(asLink && { color: animatedColor }),
            }}
          >
            {title}
          </Animated.Text>
        )}
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
    paddingHorizontal: 15,
    textAlign: "center",
    borderRadius: 12,
    height: 40
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
    fontFamily: Typography.fonts.semiBold,
  },
});
