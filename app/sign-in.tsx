import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import images from "@/constants/images";
import { mockProperties, mockUser } from "@/lib/mockData";

const sampleProperty = mockProperties[0];

const DemoOverview = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="pb-16">
        <Image
          source={images.onboarding}
          className="w-full h-96"
          resizeMode="cover"
        />

        <View className="px-8 mt-8">
          <Text className="text-xs font-rubik text-black-100 uppercase">
            Auth temporarily disabled
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 mt-1">
            Jump straight into the experience
          </Text>
          <Text className="text-base font-rubik text-black-200 mt-4 leading-6">
            To keep the demo instant, we bypass Google sign-in and hydrate the
            app with a sample profile plus curated listings. This page gives you
            a peek at the data feeding every screen.
          </Text>

          <View className="bg-primary-100 rounded-3xl p-4 mt-6">
            <Text className="text-xs font-rubik text-primary-600 uppercase">
              Active profile
            </Text>
            <View className="flex flex-row items-center mt-3">
              <Image
                source={{ uri: mockUser.avatar }}
                className="size-14 rounded-full"
              />
              <View className="ml-4">
                <Text className="text-lg font-rubik-bold text-black-300">
                  {mockUser.name}
                </Text>
                <Text className="text-sm font-rubik text-black-200">
                  {mockUser.email}
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white border border-primary-100 rounded-3xl p-4 mt-6 shadow-sm">
            <Text className="text-xs font-rubik text-primary-600 uppercase">
              Sample listing
            </Text>
            <Image
              source={{ uri: sampleProperty.image }}
              className="h-40 w-full rounded-2xl mt-3"
            />
            <Text className="text-2xl font-rubik-bold text-black-300 mt-4">
              {sampleProperty.name}
            </Text>
            <Text className="text-base font-rubik text-black-200 mt-1">
              {sampleProperty.address}
            </Text>
            <Text className="text-xl font-rubik-bold text-primary-300 mt-2">
              ${sampleProperty.price.toLocaleString()}/mo
            </Text>
            <Text className="text-sm font-rubik text-black-200 mt-2 leading-5">
              Data lives in lib/mockData.ts and powers Featured, Explore, and
              Property Details instantly.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="bg-primary-300 rounded-full py-4 mt-8"
          >
            <Text className="text-center text-lg font-rubik-bold text-white">
              Explore Listings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DemoOverview;
