import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Logo = styled.Image`
  height: 100px;
  max-width: 50%;
`;

const CreateAccount = styled.View`
  background-color: ${colors.blue};
  padding: 7px 10px;
  border-radius: 5px;
`;

const CreateAccountText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 10px;
`;

const Welcome = ({ navigation }) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  );
};

export default Welcome;
