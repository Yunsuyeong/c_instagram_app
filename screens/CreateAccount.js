import React, { useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { Controller, useForm } from "react-hook-form";

const CreateAccount = () => {
  const { control, handleSubmit } = useForm();
  const lastNameRef = useRef();
  const UsermameRef = useRef();
  const EmailRef = useRef();
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
        name="firstname"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First Name"
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        name="lastname"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={lastNameRef}
            placeholder="Last Name"
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(UsermameRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={UsermameRef}
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
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={EmailRef}
            placeholder="Email"
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            keyboardType="email-address"
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
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
