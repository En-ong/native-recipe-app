import React from "react";
import { View, Text, FlatList, Image, Pressable, SafeAreaView, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, sizes, fonts } from "../../data/theme";
import icons from "../../data/icons";
import initialRecipes from "../../data/recipes";

export default function Recipe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const recipe = initialRecipes.find(r => r.id.toString() === id);

  function toggleBookmark(recipe) {
    recipe.isBookmark = !recipe.isBookmark;
    router.setParams({ updated: Date.now() });
  }

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: sizes.padding,
          paddingTop: sizes.padding,
          paddingBottom: sizes.padding / 2,
          backgroundColor: colors.darkGreen,
        }}
      >
        {/* Go Back */}
        <Pressable
          style={({ pressed }) => [
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={() => router.back()}
        >
          <Image
            source={icons.back}
            style={{
              width: 25,
              height: 25,
              marginRight: sizes.padding / 2,
            }}
            tintColor={colors.white}
          />
          <Text
            style={{
              color: colors.white,
              fontWeight: "bold",
              fontSize: sizes.body2,
            }}
          >
            Back
          </Text>
        </Pressable>

        {/* Bookmark */}
        <Pressable 
          style={({ pressed }) => [
            {
              alignItems: "center",
              justifyContent: "center",
              height: 35,
              width: 35,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={() => toggleBookmark(recipe)}
        >
          <Image
            source={recipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
            style={{
              width: 30,
              height: 30,
            }}
            tintColor={colors.white}
          />
        </Pressable>
      </View>
    );
  }

  function renderImage() {
    return (
      <View
        style={{
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Image
          source={recipe?.image}
          resizeMode="cover"
          style={{
            height: sizes.headerHeight,
            width: '100%',
          }}
        />
      </View>
    );
  }

  function renderInfo() {
    return (
      <View style={{
        padding: sizes.padding,
        backgroundColor: colors.grayLight,
      }}>
        <View>
          <Text style={{
            ...fonts.heading
          }}>
            {recipe?.name}
          </Text>
          <Text style={{
            ...fonts.body3,
            color: colors.lightGray2,
          }}>
            {recipe?.duration} | Serves {recipe?.serving}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkGreen }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {/* Header Bar */}
        {renderHeaderBar()}

        {/* Recipe Ingredients */}
        <FlatList
          data={recipe?.ingredients}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <View style={{ marginBottom: sizes.padding / 2 }}>
              {renderImage()}
              {renderInfo()}
            </View>
          }
          ListFooterComponent={
            <View style={{ marginTop: sizes.padding / 2 }} />
          }
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: sizes.padding,
                paddingVertical: sizes.padding / 4,
              }}
            >
              <View>
                <Image
                  source={item.icon}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: sizes.padding / 2,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    ...fonts.body3
                  }}
                >
                  {item.description}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    ...fonts.body3
                  }}
                >
                  {item.quantity}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}