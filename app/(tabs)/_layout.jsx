import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';
import { colors, sizes } from '../../data/theme';
import icons from '../../data/icons';

function TabBarIcon({ color, size, name }) {
  return (
    <View style={{ width: size, height: size, marginBottom: 4 }}>
      <Image
        source={icons[name]}
        style={{ width: '100%', height: '100%', tintColor: color }}
        resizeMode="contain"
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.darkGreen,
        },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: sizes.body2,
        },
        tabBarStyle: {
          backgroundColor: colors.darkGreen,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.lightLime,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="bookmarkFilled" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}