import { SignOutButton } from "@/components/SignOutButton";
import { icons, images } from "@/constants";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link, Redirect, router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

const Home = () => {
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }))
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 🚪 If NOT signed in, kick to welcome
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // ⏳ Loading screen
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-blue-500 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-2">Loading rides...</Text>
      </SafeAreaView>
    );
  }

  // 🚖 Rides list
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Image className="absolute w-full z-0"
        source={images.bg} />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}>
        <View className="flex flex-row items-center justify-between mb-2 mt-5
">
          <Text className="text-white">
            Welcome {user?.firstName || 'Mzee'}
          </Text>
          <View className="flex-col items-center justify-center">
            <SignOutButton />
            <Text className="text-red-500">Sign-Out</Text>
          </View>

        </View>
        <Image
          className="w-12 h-10 mt-5 mb-5 mx-auto"
          source={icons.mlogo}
        />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="white"
            className="mt-10 self-center " />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : <View className="flex-1 mt-5">

          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a Movie"
            onChangeText={() => { }} />

          {trendingMovies && (
            <View className="mt-10">
              <Text className="text-white text-lg font-bold mb-3">Trending Movies</Text>
            </View>
          )}

          <>


            <Text className="text-white text-lg font-bold mt-5 mb-3">Latest Movies</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator=
              {false}
              ItemSeparatorComponent={() => <View className="w-4" />}
              className="mb-4 mt-3"
              data={trendingMovies}
              renderItem={({ item, index }) => <Text
                className="text-white text-sm"><TrendingCard movie={item}
                  index={index} /></Text>}
              keyExtractor={(item) => item.movie_id.toString()}
            />

            <FlatList

              data={movies}
              renderItem={({ item }) => (
                <MovieCard {...item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />

          </>

        </View>}


      </ScrollView>

    </SafeAreaView>
  );
};

export default Home;
