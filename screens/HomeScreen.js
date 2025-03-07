import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import axios from "axios";
import Card from "../components/Card";
import Ionicons from "react-native-vector-icons/Ionicons";

/**
 * HomeScreen Component
 * Displays a list of products fetched from an API with pagination, search functionality, and lazy loading.
 * Users can search for products by title, category, brand, tags, or price.
 * Products are displayed in a grid format with a "Load More" button for fetching additional data.
 */
export default function HomeScreen({ navigation }) {
    // State variables
    const [items, setItems] = useState([]); // Stores all fetched products
    const [filteredItems, setFilteredItems] = useState([]); // Stores filtered products for search functionality
    const [searchQuery, setSearchQuery] = useState(""); // Stores the search input
    const [loading, setLoading] = useState(false); // Manages loading state
    const [page, setPage] = useState(0); // Manages pagination
    const limit = 30; // Number of products to fetch per request

    /**
     * Fetches products from API and updates state.
     * Applies availability status based on stock quantity.
     * Implements pagination by appending new products to the existing list.
     */
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`);

            // Add availability status based on stock value
            const updatedProducts = response.data.products.map((product) => ({
                ...product,
                availabilityStatus: product.stock > 0 ? "In Stock" : "Out of Stock",
            }));

            const newItems = [...items, ...updatedProducts];
            setItems(newItems);
            setFilteredItems(newItems);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * useEffect Hook - Fetches initial products when the component mounts.
     */
    useEffect(() => {
        fetchProducts();
    }, []);

    /**
     * Handles the search functionality.
     * Filters products based on user input matching title, category, brand, tags, or price.
     * @param {string} text - The search input.
     */
    const handleSearch = (text) => {
        setSearchQuery(text);

        if (text.trim() === "") {
            setFilteredItems(items); // Show all items when search is cleared
            return;
        }

        const lowerCaseText = text.toLowerCase();

        const filtered = items.filter(
            (item) =>
                item.title.toLowerCase().includes(lowerCaseText) ||
                item.category.toLowerCase().includes(lowerCaseText) ||
                item.brand.toLowerCase().includes(lowerCaseText) ||
                (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(lowerCaseText))) || // Handle tags array
                item.price.toString().includes(lowerCaseText) // Convert price to string before searching
        );

        setFilteredItems(filtered);
    };

    return (
        <View className="flex-1 p-4 bg-white">
            {/* Search Bar */}
            <View className="flex-row items-center border border-gray-300 py-2 px-3 rounded-lg mb-4">
                <Ionicons name="search" size={24} color="gray" />

                <TextInput className="flex-1" placeholder="Search products..." value={searchQuery} onChangeText={handleSearch} />
            </View>

            {/* Product List */}
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Card product={item} navigation={navigation} />}
                numColumns={2} // Display products in a 2-column grid
                columnWrapperStyle={{ justifyContent: "center" }}
                // Footer with Load More button or loading indicator
                ListFooterComponent={() => (
                    <View className="mt-4 w-full flex-row justify-center items-center">
                        {loading ? (
                            <ActivityIndicator size="large" color="blue" />
                        ) : (
                            <TouchableOpacity className="bg-sky-500 w-1/3 rounded-lg justify-center items-center" onPress={fetchProducts}>
                                <Text className="text-xl text-center text-white font-bold my-3">Load More</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
        </View>
    );
}
