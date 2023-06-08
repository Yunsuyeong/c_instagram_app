import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

const Room_Query = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
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

const Room_Updates = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        username
        avatar
      }
      read
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
  width: 90%;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 1000px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 95%;
  margin-top: 25px;
  margin-bottom: 50px;
`;

const SendButton = styled.TouchableOpacity``;

const Room = ({ route, navigation }) => {
  const { data: meData } = useMe();
  const { handleSubmit, control, getValues, setValue, watch } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        id,
        payload: message,
        user: {
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  const [sendMessages, { loading: sendingMessage }] = useMutation(
    Send_Message_Mutation,
    {
      update: updateSendMessage,
    }
  );
  const { data, loading, subscribeToMore } = useQuery(Room_Query, {
    variables: {
      id: route?.params?.id,
    },
  });
  const client = useApolloClient();
  const updateQuery = (prevQuery, options) => {
    const {
      subscriptionData: {
        data: { roomUpdates: message },
      },
    } = options;
    if (message.id) {
      const incomingMessage = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: message,
      });
      client.cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find(
              (aMessage) => aMessage.__ref === incomingMessage.__ref
            );
            if (existingMessage) {
              return prev;
            }
            return [...prev, incomingMessage];
          },
        },
      });
    }
  };
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (data?.seeRoom && !subscribed) {
      subscribeToMore({
        document: Room_Updates,
        variables: {
          id: route?.params?.id,
        },
        updateQuery,
      });
      setSubscribed(true);
    }
  }, [data, subscribed]);
  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessages({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };
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
  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%", paddingVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
        />
        <Controller
          name="message"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputContainer>
              <TextInput
                placeholderTextColor="rgba(255,255,255,0.5)"
                placeholder="Write a message..."
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="send"
                onChangeText={onChange}
                onBlur={onBlur}
                value={watch("message")}
                onSubmitEditing={handleSubmit(onValid)}
              />
              <SendButton
                onPress={handleSubmit(onValid)}
                disabled={!Boolean(watch("message"))}
              >
                <Ionicons
                  name="send"
                  color={
                    !Boolean(watch("message"))
                      ? "rgba(255,255,255,0.5)"
                      : "white"
                  }
                  size={22}
                />
              </SendButton>
            </InputContainer>
          )}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};

export default Room;
