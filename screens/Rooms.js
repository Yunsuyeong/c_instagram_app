import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { Room_Fragment } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { colors } from "../colors";

const See_Rooms_Query = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${Room_Fragment}
`;

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
`;

const Column = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;

const Data = styled.View``;

const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${colors.blue};
  border-radius: 5px;
`;

const Username = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const UnreadText = styled.Text`
  color: white;
  font-weight: 500;
  margin-top: 2px;
`;

const Rooms = () => {
  const { data, loading } = useQuery(See_Rooms_Query);
  const { data: meData } = useMe();
  const renderItem = ({ item: room }) => {
    const notMe = room.users.find(
      (user) => user.username !== meData?.me?.username
    );
    return (
      <RoomContainer>
        <Column>
          <Avatar source={{ uri: notMe.avatar }} />
          <Data>
            <Username>{notMe.username}</Username>
            <UnreadText>
              {room.unreadTotal} unread{" "}
              {room.unreadTotal === 1 ? "message" : "messages"}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          ></View>
        }
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
};

export default Rooms;
