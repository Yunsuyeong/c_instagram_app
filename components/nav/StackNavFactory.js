import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../../screens/Photo";
import Profile from "../../screens/Profile";
import Feed from "../../screens/Feed";
import Search from "../../screens/Search";
import Notifications from "../../screens/Notifications";
import Me from "../../screens/Me";
import { Image } from "react-native";
import Likes from "../../screens/Likes";
import Comments from "../../screens/Comments";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
          shadowColor: "rgba(255,255,255,0.5)",
        },
        headerTintColor: "white",
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"SFeed"}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ width: 120 }}
                resizeMode="contain"
                source={require("../../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"SSearch"} component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"SNotifications"} component={Notifications} />
      ) : null}
      {screenName === "Me" ? (
        <Stack.Screen name={"SMe"} component={Me} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
