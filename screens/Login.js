import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { LogUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const Log_In_Mutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = ({ route: { params } }) => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });
  const PasswordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await LogUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(Log_In_Mutation, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      login({
        variables: {
          ...data,
        },
      });
    }
  };
  return (
    <AuthLayout>
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Username"
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            autoCapitalize={"none"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(PasswordRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={PasswordRef}
            placeholder="Password"
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onValid)}
            lastOne={true}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!formState.isValid}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default Login;
