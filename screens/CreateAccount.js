import React, { useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { Controller, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const Create_Account_Mutation = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const CreateAccount = ({ navigation }) => {
  const { control, handleSubmit, getValues } = useForm();
  const lastNameRef = useRef();
  const UsermameRef = useRef();
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const onCompleted = (data) => {
    if (!data.createAccount) return;
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        username,
        password,
      });
    }
  };
  const [createAccount, { loading }] = useMutation(Create_Account_Mutation, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      createAccount({
        variables: {
          ...data,
        },
      });
    }
  };
  return (
    <AuthLayout>
      <Controller
        name="firstName"
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
        name="lastName"
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
        onPress={handleSubmit(onValid)}
        loading={false}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
