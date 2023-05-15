import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const PasswordRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (form) => {
    console.log(form);
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
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default Login;
