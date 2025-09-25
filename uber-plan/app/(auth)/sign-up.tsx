import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";

const SignUp = () => {
  const { isSignedIn } = useAuth();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // ✅ redirect automatically if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(root)/(tabs)/home");
    }
  }, [isSignedIn]);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      const msg = err?.errors?.[0]?.longMessage || "Something went wrong";
      setErrorMessage(msg);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        //TODO: Create a Database User
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
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
          {/* Overlay so content is readable */}
          <View className="flex-1 bg-black/10 pt-20">
            {/* Hero Text */}
            <Text className="text-2xl text-white font-semibold mt-16 ml-5">
              Create Your Account
            </Text>

            {/* Form Section */}
            <View className="p-5 pb-20">
              <InputField
                inputStyle="text-white"
                icon={icons.person}
                label="Name"
                placeholder="Enter Name"
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />

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
                title="Sign-Up"
                onPress={onSignUpPress}
                className="mt-6"
                bgVariant="danger"
              />

              <Link href="/(auth)/sign-in" className="text-lg text-center mt-10">
                <Text className="text-white">Mzee, Already Have an Account? </Text>
                <Text className="text-red-500">Log In</Text>
              </Link>
            </View>

            {/* Error Message Modal */}
            <Modal isVisible={!!errorMessage}>
              <View className="bg-red-500 px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-red-500 text-lg font-bold">Error</Text>
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

            {/* Verification modal */}
            <Modal
              isVisible={verification.state === "pending"}
              backdropOpacity={0.3}
              onModalHide={() => {
                if (verification.state === "success") setShowSuccessModal(true);
              }}
            >
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl font-bold mb-2">Verification</Text>
                <Text className="mb-5">
                  We've sent a Verification Code to {form.email}
                </Text>

                <InputField
                  label="code"
                  icon={icons.lock}
                  placeholder="12345"
                  value={verification.code}
                  keyboardType="numeric"
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                />

                {verification.error && (
                  <Text className="text-red-500 text-sm mt-1">
                    {verification.error}
                  </Text>
                )}

                <CustomButton
                  className="mt-5 bg-success-500"
                  onPress={onVerifyPress}
                  title="Verify Email"
                />
              </View>
            </Modal>

            {/* Success modal */}
            <Modal isVisible={showSuccessModal} backdropOpacity={0.3}>
              <View className="bg-blue-500 px-7 py-9 rounded-2xl min-h-[300px]">
                <Image
                  className="w-[110px] h-[110px] mx-auto my-5"
                  source={images.check}
                />
                <Text className="text-white text-3xl text-center mt-5">
                  Verified!!
                </Text>
                <Text className="text-base text-white text-center mt-2">
                  Account Verification Successful
                </Text>
                <CustomButton
                  className="mt-5 border border-2px border-white"
                  title="Browse Home"
                  onPress={() => router.replace("/(root)/(tabs)/home")}
                />
              </View>
            </Modal>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
