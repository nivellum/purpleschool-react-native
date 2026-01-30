import { useRef, useState } from "react";
import { Modal } from "../shared/components/Modal";

import { StyleSheet, Text, View } from "react-native";
import Button from "../shared/components/Button";
import { Color } from "../shared/design/tokens";
import Logo from "../shared/svg/logos/Logo";
import Input from "../shared/components/Input";
import {
  ErrorNotification,
  ErrorNotificationRef,
} from "../shared/components/ErrorNotification";
import { Link } from "expo-router";

export default function Login() {
  const errorNotificationRef = useRef<ErrorNotificationRef>(null);

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <View style={styles.formContainer}>
        <Input placeholder="Email" />
        <Input placeholder="Пароль" isPassword={true} />
        <Button
          onPress={() => {
            errorNotificationRef?.current &&
              errorNotificationRef.current.show(
                "Ошибка ".concat(Math.random().toFixed(2).toString()),
              );
          }}
          title="Войти"
        />
      </View>
      <ErrorNotification ref={errorNotificationRef} />
      <Link href="/restore" asChild>
        <Button title="Восстановить пароль" asLink={true} />
      </Link>
      {/* <Pressable style={styles.restorePasswordButton}>
        <Text style={styles.restorePasswordButtonText}>
          Восстановить пароль
        </Text>
      </Pressable> */}
      {/* <Modal visible={visible} onClose={() => setVisible((state) => !state)}>
        <Text>Boob</Text>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 50,
    padding: 55,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  logo: {},
  buttonPressed: {
    backgroundColor: "#8574e4",
  },
  restorePasswordButton: {},
  restorePasswordButtonText: {
    color: "#5E4BC6",
    fontSize: 18,
  },
});
