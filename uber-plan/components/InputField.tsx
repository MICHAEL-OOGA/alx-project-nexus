import { InputFieldProps } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  placeholderTextColor = "#9ca3af", // 👈 default gray-400 if not provided
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-2 w-full">
        <Text className={`text-lg mb-3 font-semibold ${labelStyle}`}>
          {label}
        </Text>

        <View
          className={`flex flex-row justify-start items-center relative rounded-full border
            ${isFocused ? "border-red-600 bg-red-600" : "border-neutral-100 bg-transparent"} 
            ${containerStyle}`}
        >
          {icon && (
            <Image className={`w-6 h-6 ml-4 ${iconStyle}`} source={icon} />
          )}

          <TextInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`rounded-full p-4 font-semibold text-[15px] flex-1 text-left ${inputStyle}`}
            secureTextEntry={isPasswordVisible}
            placeholderTextColor={placeholderTextColor} // 👈 wired here
            {...props}
          />

          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="mr-4"
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputField;
