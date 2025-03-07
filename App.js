import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./global.css";
import { Text, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export default function App() {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("token"); // Remove stored token or session data
            navigation.replace("Login"); // Redirect to Login screen
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        title: "BallersShop",
                        headerRight: () => (
                            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                                <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>Logout</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
