import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { User_Fragment } from "../fragments";
import UserRow from "../components/UserRow";
import ScreenLayout from "../components/ScreenLayout";

const Likes_Query = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${User_Fragment}
`;

const Likes = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(Likes_Query, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });
  console.log(data);
  const renderUser = ({ item: user }) => <UserRow {...user} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          ></View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        style={{ width: "100%" }}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderUser}
      />
    </ScreenLayout>
  );
};

export default Likes;
