import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants";

const TrendingCard = ({
    movie: { movie_id, title, poster_url },
    index,
}: TrendingCardProps) => {
    return (
        <Link
            href={{
                pathname: "/movies/[id]",
                params: { id: movie_id.toString() },
            }}
            asChild
        >
            <TouchableOpacity className="w-32 relative pl-5">
                <Image
                    resizeMode="cover"
                    className="w-32 h-48 rounded-lg"
                    source={{ uri: poster_url }}
                />
                <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
                    <MaskedView
                        maskElement={
                            <Text className="text-white font-bold text-6xl">
                                {index + 1}
                            </Text>
                        }
                    >
                        <Image
                            resizeMode="cover"
                            className="size-14"
                            source={images.rankingGradient}
                        />
                    </MaskedView>
                </View>
                {/* Optional: Movie title */}
                <Text className="mt-2 text-sm font-semibold text-white" numberOfLines={2}>
                    {title}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default TrendingCard;
