import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import { Color, Typography } from "../design/tokens";
import EyeIcon from "../svg/icons/EyeIcon";
import EyeSlashIcon from "../svg/icons/EyeSlashIcon";

type InputProps = {
  isPassword?: boolean;
} & TextInputProps;

export default function Input({ style, isPassword, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((state) => !state);
  };

  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        placeholderTextColor={Color.placeholder}
        style={[styles.input, styles.inputPassword]}
        secureTextEntry={isPassword ? !isPasswordVisible : false}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.visibilityButtonText}>
            {isPasswordVisible && <EyeIcon fill={Color.placeholder} />}
            {!isPasswordVisible && <EyeSlashIcon fill={Color.placeholder} />}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  visibilityButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  visibilityButtonText: {
    width: 25,
    height: 25
  },
  container: {
    position: "relative",
    width: "100%",
  },
  input: {
    color: Color.white,
    backgroundColor: Color.purpleDark,
    width: "100%",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 12,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
  },
  inputPassword: {
    paddingRight: 70,
  },
});
