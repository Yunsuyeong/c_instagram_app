import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";

const Room_Query = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const Send_Message_Mutation = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const MessageContainer = styled.View`
  flex-direction: ${(props) => (props.outgoing ? "row-reverse" : "row")};
  align-items: flex-end;
  padding: 0px 10px;
`;

const Author = styled.View``;

const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 20px;
`;

const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 16px;
  margin: 0px 10px;
  padding: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
`;

const TextInput = styled.TextInput`
  width: 95%;
  color: white;
  padding: 10px 20px;
  margin-top: 25px;
  margin-bottom: 50px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 1000px;
`;

const Room = ({ route, navigation }) => {
  const { data, loading } = useQuery(Room_Query, {
    variables: {
      id: route?.params?.id,
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
  }, []);
  const renderItem = ({ item: message }) => (
    <MessageContainer
      outgoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.5)"
          placeholder="Write a message..."
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};

export default Room;
