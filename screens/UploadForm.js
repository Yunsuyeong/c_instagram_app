import React, { useEffect, useRef } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Controller, useForm } from "react-hook-form";
import { colors } from "../colors";
import { gql, useMutation } from "@apollo/client";
import { Feed_Photo } from "../fragments";
import { ReactNativeFile } from "apollo-upload-client";

const Upload_Photo_Mutation = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${Feed_Photo}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;

const Photo = styled.Image`
  height: 350px;
`;

const CaptionContainer = styled.View`
  margin-top: 30px;
`;

const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const UploadForm = ({ route, navigation }) => {
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [uploadPhoto, { loading }] = useMutation(Upload_Photo_Mutation, {
    update: updateUploadPhoto,
  });
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { control, handleSubmit } = useForm();
  const captionRef = useRef();
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.photoLocal,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    uploadPhoto({
      variables: {
        caption,
        file,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.photoLocal }} />
        <CaptionContainer>
          <Controller
            name="caption"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Caption
                ref={captionRef}
                placeholder="Write a caption"
                placeholderColor="rgba(0, 0, 0, 0.5)"
                returnKeyType="done"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={handleSubmit(onValid)}
              />
            )}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;
