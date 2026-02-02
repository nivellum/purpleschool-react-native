import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../shared/components/Button";
import Logo from "../shared/svg/logos/Logo";
import Input from "../shared/components/Input";
import {
  ErrorNotification,
  ErrorNotificationRef,
} from "../shared/components/ErrorNotification";
import { Link, Redirect } from "expo-router";

import { authAtom, loginAtom } from "../entities/auth/model/auth.state";

import z from "zod";
import { useAtomValue, useSetAtom } from "jotai";

const initialFormState = {
  email: "",
  password: "",
};

const formDataScheme = z.object({
  email: z.email("Некорректный e-mail").nonempty("E-mail не может быть пустым"),
  password: z.string().nonempty("Пароль не может быть пустым"),
});

type FormData = z.infer<typeof formDataScheme>;

const validate = (
  formData: FormData,
): z.core.$ZodErrorTree<Partial<FormData>> | undefined => {
  const res = formDataScheme.safeParse(formData);
  if (res.success) return undefined;

  return z.treeifyError(res.error);
};

export default function Login() {
  const auth = useAtomValue(authAtom);
  const login = useSetAtom(loginAtom);

  const errorNotificationRef = useRef<ErrorNotificationRef>(null);

  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState<Boolean>(false);

  const formData = { ...initialFormState, ...userFormData };

  useEffect(() => {
    if (auth.error) errorNotificationRef.current?.show(auth.error);
  }, [auth.error]);

  const setValue = (
    name: string,
    value: string | number | undefined | null,
  ) => {
    setUserFormData((state) => {
      return { ...state, [name]: value };
    });
  };

  const submit = async () => {
    const errors = validate(formData);
    if (errors) {
      setShowErrors(true);
      return;
    }

    await login(formData);
  };

  const validation = showErrors ? validate(formData) : undefined;

  if (auth.accessToken) return <Redirect href="/course" />;

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <View style={styles.formContainer}>
        <Input
          value={formData.email}
          onChangeText={(text) => setValue("email", text)}
          placeholder="Email"
        />
        {validation?.properties?.email && (
          <Text style={styles.error}>
            {validation?.properties?.email.errors.join("\n")}
          </Text>
        )}
        <Input
          value={formData.password}
          onChangeText={(text) => setValue("password", text)}
          placeholder="Пароль"
          isPassword
        />
        {validation?.properties?.password && (
          <Text style={styles.error}>
            {validation?.properties?.password.errors.join("\n")}
          </Text>
        )}
        <Button
          disabled={!!validation}
          pending={auth.isLoading}
          onPress={submit}
          title="Войти"
        />
      </View>
      <ErrorNotification ref={errorNotificationRef} />
      <Link href="/restore" asChild>
        <Button title="Восстановить пароль" asLink={true} />
      </Link>
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
  error: {
    color: "red",
    textAlign: "center",
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
