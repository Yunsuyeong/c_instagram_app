import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { Photo_Fragment } from "../fragments";

const See_Photo_Query = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${Photo_Fragment}
`;

const PhotoScreen = ({ route }) => {
  const { data, loading, refetch } = useQuery(See_Photo_Query, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Photo {...data.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
};

export default PhotoScreen;
