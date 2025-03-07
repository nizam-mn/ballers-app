import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

/**
 * DetailsScreen Component
 * This screen displays detailed information about a selected product, including its image, brand, price, discount,
 * availability, shipping information, and customer reviews.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.route - The route object containing parameters passed from navigation.
 * @param {Object} props.navigation - The navigation object to handle screen transitions.
 */
export default function DetailsScreen({ route, navigation }) {
    const { itemId } = route.params; // Extract product ID from route parameters
    const [item, setItem] = useState(null); // State to store product details
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${itemId}`) // Fetch product details from API
            .then((response) => {
                setItem(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [itemId]);

    return (
        <ScrollView className="p-5 bg-white">
            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <>
                    {/* Product Image */}
                    <Image source={{ uri: item.images[0] }} className="h-80 rounded-lg border mb-4" resizeMode="contain" />

                    {/* Brand and Rating */}
                    <View className="flex-row items-center justify-between mb-3 gap-4">
                        <Text className="text-gray-500 text-base">{item?.brand}</Text>
                        <View className="text-yellow-500 flex-row items-end gap-1">
                            <Ionicons name="star" size={16} color="gold" />
                            <Text className="text-yellow-500">{item?.rating}</Text>
                        </View>
                    </View>

                    {/* Product Title */}
                    <Text className="text-2xl font-bold mb-3">{item.title}</Text>

                    {/* Price and Discount */}
                    <View className="flex-row items-baseline mb-3 gap-4 pb-5 border-gray-300 border-b">
                        <Text className="text-5xl font-bold">${item.price}</Text>
                        <Text className="text-2xl text-white rounded-lg px-2 font-semibold bg-red-600">-{item.discountPercentage}%</Text>
                    </View>

                    {/* Availability & Shipping */}
                    <Text className={`mt-1 text-xl font-semibold ${item?.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-500"}`}>
                        {item?.availabilityStatus}
                    </Text>
                    <Text className="my-1 text-lg font-semibold text-green-700">{item.shippingInformation}</Text>

                    {/* Product Details Section */}
                    <View className="mt-5 border-t pt-5 border-gray-300">
                        <Text className="text-[22px] font-semibold">About this Product</Text>

                        <View className="py-2">
                            {[
                                { label: "Brand", value: item.brand },
                                { label: "Category", value: item.category },
                                { label: "Warranty", value: item.warrantyInformation },
                                { label: "Return Policy", value: item.returnPolicy },
                                { label: "Tags", value: item.tags?.join(", ") },
                                { label: "Dimensions", value: `${item.dimensions?.width} x ${item.dimensions?.height} x ${item.dimensions?.depth}` },
                                { label: "SKU", value: item.sku },
                            ].map((detail, index) => (
                                <View key={index} className="flex-row border-b border-gray-300 py-2">
                                    <Text className="w-1/3 text-lg font-semibold text-gray-700">{detail.label}:</Text>
                                    <Text className="w-2/3 text-lg text-gray-600">{detail.value || "N/A"}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Description Section */}
                    <View className="my-3">
                        <Text className="text-xl mb-2 font-semibold">Description</Text>
                        <Text className="text-lg leading-[1.3]">{item.description}</Text>
                    </View>

                    {/* Customer Reviews Section */}
                    <View className="my-5">
                        <Text className="text-xl mb-2 font-semibold">Customer Reviews</Text>
                        {item.reviews?.length > 0 ? (
                            item.reviews.map((review, index) => (
                                <View key={index} className="border-b border-gray-300 pb-3 mb-3">
                                    <View className="flex-row items-center justify-between">
                                        <Text className="text-lg font-semibold">{review.reviewerName}</Text>
                                        <View className="flex-row items-center">
                                            <Ionicons name="star" size={16} color="gold" />
                                            <Text className="text-yellow-500 ml-1">{review.rating}</Text>
                                        </View>
                                    </View>
                                    <Text className="text-gray-400 mt-1 text-sm">{new Date(review.date).toDateString()}</Text>
                                    <Text className="text-gray-600 text-lg leading-[1.3] my-1">{review.comment}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="text-gray-500">No reviews available</Text>
                        )}
                    </View>
                </>
            )}
        </ScrollView>
    );
}
