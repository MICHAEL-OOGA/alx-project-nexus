import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ redirect automatically if signed in
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(root)/(tabs)/home");
    }
  }, [isSignedIn]);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setLoginSuccess(true);
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      const msg = err?.errors?.[0]?.longMessage || "Something went wrong";
      setErrorMessage(msg);
    }
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-black"
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          source={images.Spiderman}
          resizeMode="cover"
          className="flex-1 w-full h-full"
        >
          {/* Overlay for readability */}
          <View className="flex-1 bg-black/10 pt-40">
            {/* Hero Text */}
            <Text className="text-2xl text-white font-semibold mt-16 ml-5">
              Welcome Back
            </Text>

            {/* Form Section */}
            <View className="p-5 pb-20">
              <InputField
                inputStyle="text-white"
                icon={icons.email}
                label="Email"
                placeholder="Enter Email"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />

              <InputField
                inputStyle="text-white"
                icon={icons.lock}
                label="Password"
                placeholder="Enter Password"
                secureTextEntry
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
              />

              <CustomButton
                title="Sign-In"
                onPress={onSignInPress}
                className="mt-6"
              />


              <Link href="/sign-up" className="text-lg text-center mt-10">
                <Text className="text-white">Mzee, Don’t Have an Account? </Text>
                <Text className="text-red-500">Sign Up</Text>
              </Link>
            </View>

            {/* Error Modal */}
            <Modal isVisible={!!errorMessage}>
              <View className="bg-red-500 px-7 py-9 rounded-2xl min-h-[200px]">
                <Text className="text-white text-lg font-bold">Error</Text>
                <Text className="text-white mt-2 text-center text-lg">
                  {errorMessage}
                </Text>
                <CustomButton
                  className="mt-5"
                  title="Close"
                  onPress={() => setErrorMessage("")}
                />
              </View>
            </Modal>

            {/* Success Modal */}
            <Modal isVisible={loginSuccess}>
              <View className="bg-blue-500 px-7 py-9 rounded-2xl min-h-[200px]">
                <Text className="text-white text-lg font-bold">Success</Text>
                <Text className="text-white mt-2 text-center text-lg">
                  Log In Successful
                </Text>
                <CustomButton
                  className="mt-5 border border-2px border-white"
                  title="Continue"
                  onPress={() => {
                    setLoginSuccess(false);
                    router.replace("/(root)/(tabs)/home");
                  }}
                />
              </View>
            </Modal>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
