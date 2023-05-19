import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { LogUserOut } from "../apollo";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { Comment_Fragment, Photo_Fragment } from "../fragments";

const Feed_Query = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${Photo_Fragment}
  ${Comment_Fragment}
`;

const Feed = ({ navigation }) => {
  const { data, loading } = useQuery(Feed_Query);
  const renderPhoto = ({ photo }) => {
    return <Photo {...photo} />;
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
};

export default Feed;
