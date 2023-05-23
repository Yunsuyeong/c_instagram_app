import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Controller, useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";

const Search_Photos_Query = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

const Input = styled.TextInput`
  width: ${(props) => props.width / 1.5}px;
  color: black;
  background-color: rgba(255, 255, 255, 1);
  padding: 5px 10px;
  border-radius: 10px;
`;

const Search = ({ navigation }) => {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { control, handleSubmit, watch } = useForm();
  const [SearchPhotos, { loading, data, called }] =
    useLazyQuery(Search_Photos_Query);
  const onValid = ({ keyword }) => {
    SearchPhotos({
      variables: {
        keyword,
      },
    });
  };
  console.log(data);
  const SearchBox = () => (
    <Controller
      name="keyword"
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          width={width}
          placeholderTextColor="rgba(0,0,0,0.8)"
          placeholder="Search Photos"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          onSubmitEditing={handleSubmit(onValid)}
        />
      )}
    />
  );
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anythings.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
