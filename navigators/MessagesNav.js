import { createStackNavigator } from "@react-navigation/stack";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const MessagesNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerBackImage: ({ tintColor }) => (
          <Ionicons color={tintColor} name="chevron-down" size={28} />
        ),
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};

export default MessagesNav;
