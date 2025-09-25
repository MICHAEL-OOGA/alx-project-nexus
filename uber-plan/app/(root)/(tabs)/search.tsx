import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons, images } from "@/constants";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, ActivityIndicator } from "react-native";

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const { data: movies, loading: moviesLoading, error: moviesError, reFetch: loadMovies, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false)
    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();

            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        // Call updateSearchCount only if there are results
        if (movies?.length! > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies])
    return (
        <View className="flex-1 bg-black">
            <FlatList

                className="px-5 "
                data={movies}
                renderItem={({ item }) => (
                    <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center  ">
                            <Image
                                className="w-12 h-10"
                                source={icons.mlogo} />
                        </View>

                        <View className="my-5 ">

                            <SearchBar
                                placeholder="Search Movies..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)} />
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator
                                size="large"
                                color="white"
                                className="my-3" />
                        )}

                        {moviesError && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {moviesError.message}
                            </Text>
                        )}

                        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length! > 0 && (
                            <Text className="text-xl text-white">
                                Search Results for {''}
                                <Text className="text-gray-400 font-bold">{searchQuery}</Text>
                            </Text>
                        )}

                    </>
                }
            />
        </View>
    );
};

export default Search;





//const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: searchQuery }), false)