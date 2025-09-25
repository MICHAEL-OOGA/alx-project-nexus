import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

interface Props {
    placeholder: string,
    onPress?: () => void,
    value?: string,
    onChangeText?: (text: string) => void
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-md px-5 py-0.5 border-2 border-white">


            <Image
                resizeMode='contain'
                className='size-7'
                source={icons.search}
                tintColor="#ffff" />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#ffff"
                className='flex-1 text-white '

            />
        </View>
    )
}

export default SearchBar