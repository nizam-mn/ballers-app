import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

/**
 * Card Component
 * This component displays a product's image, title, brand, price, discount percentage, availability status, and rating.
 * Users can tap on the card to navigate to the product details screen.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object containing details such as title, price, brand, etc.
 * @param {Object} props.navigation - The navigation object to handle screen transitions.
 */
export default function Card({ product, navigation }) {
    return (
        <TouchableOpacity
            className="bg-white p-4 m-1 rounded-lg shadow-md border border-gray-200 flex-1"
            onPress={() => navigation.navigate("Details", { itemId: product?.id })} // Navigate to Details screen with product ID
        >
            {/* Product Image */}
            <Image 
                source={{ uri: product?.thumbnail }} 
                className="w-full h-40 rounded-lg" 
                resizeMode="cover" // Ensure the image covers the designated space properly
            />

            {/* Product Details */}
            <Text className="text-lg font-bold mt-2">{product?.title}</Text>
            <Text className="text-gray-500">{product?.brand}</Text>

            {/* Price & Discount Information */}
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-green-600 font-semibold text-lg">
                    ${product?.price}
                </Text>
                <Text className="text-gray-500 font-thin text-sm text-right">
                    ({product.discountPercentage}% off)
                </Text>
            </View>

            {/* Availability Status & Rating */}
            <View className="flex-row justify-between mt-2">
                <Text 
                    className={`mt-1 text-sm font-medium ${product?.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-500"}`}
                >
                    {product?.availabilityStatus}
                </Text>
                
                <View className="text-yellow-500 flex-row items-end gap-1">
                    <Ionicons name="star" size={16} color="gold" />
                    <Text className="text-yellow-500">{product?.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
