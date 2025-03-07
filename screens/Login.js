import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * LoginScreen Component
 * This component provides a login screen where users can enter their username and password.
 * It also handles authentication and stores the login token using AsyncStorage.
 * If a user is already logged in, they are redirected to the Home screen.
 */
export default function LoginScreen({ navigation }) {
    // State variables for username, password, and loading status
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    /**
     * useEffect Hook - Checks for an existing authentication token when the component mounts.
     * If a token is found, the user is redirected to the Home screen.
     */
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem("token"); // Retrieve token from storage
                if (token) {
                    navigation.replace("Home"); // Redirect to Home if token exists
                }
            } catch (error) {
                console.error("Error checking token:", error);
            } finally {
                setLoading(false); // Set loading state to false after checking token
            }
        };
        checkToken();
    }, []);

    // Show loading indicator while checking authentication
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    /**
     * Handles user login.
     * Sends a request to the authentication API and stores the received token in AsyncStorage.
     * If login is successful, navigates to the Home screen. Otherwise, an alert is displayed.
     */
    const handleLogin = async () => {
        try {
            // Send login request
            const response = await axios.post(
                "https://dummyjson.com/auth/login",
                { username, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, // Ensures cookies are included
                }
            );

            console.log(response); // Debugging response

            // Store the token in AsyncStorage
            await AsyncStorage.setItem("token", response.data.accessToken);

            // Navigate to Home screen after successful login
            navigation.replace("Home");
        } catch (error) {
            console.error("Login Failed:", error.response?.data);
            Alert.alert("Login Failed", "Please enter a valid username.");
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white p-5">
            <Text className="text-[72px] text-indigo-800 font-bold mb-16">Ballerslife</Text>
            <Text className="text-2xl font-bold mb-5">Login</Text>

            <View className="w-full px-4">
                {/* Username Input Field */}
                <TextInput
                    className="w-full p-4 bg-white border-b border-gray-400 mb-4"
                    placeholder="Username"
                    placeholderTextColor={"#9fa1a0"}
                    value={username}
                    onChangeText={setUsername}
                />

                {/* Password Input Field */}
                <TextInput
                    className="w-full p-4 bg-white border-b border-gray-400 mb-4"
                    placeholder="Password"
                    placeholderTextColor={"#9fa1a0"}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Login Button */}
                <TouchableOpacity className="bg-blue-500 p-4 rounded w-full" onPress={handleLogin}>
                    <Text className="text-white text-xl font-semibold text-center">Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
