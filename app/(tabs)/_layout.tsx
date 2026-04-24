import { colors, fonts } from "@/assets/theme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
	const headerStyles = {
		fontFamily: fonts.fontParagraphBold,
		color: colors.primary,
	};

	return (
		<Tabs
			screenOptions={{
				tabBarIcon: () => null,
				tabBarLabelStyle: {
					fontSize: 16,
					marginTop: -19,

					fontFamily: fonts.fontParagraphBold,
				},
				tabBarItemStyle: {
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: 10,
				},
				tabBarActiveTintColor: "black",
				tabBarInactiveTintColor: colors.textSubtle,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{ title: "Home", headerTitleStyle: headerStyles }}
			/>
			<Tabs.Screen
				name="editor"
				options={{ title: "Editor", headerTitleStyle: headerStyles }}
			/>
			<Tabs.Screen
				name="story"
				options={{ title: "Story", headerTitleStyle: headerStyles }}
			/>
			<Tabs.Screen
				name="library"
				options={{ title: "Library", headerTitleStyle: headerStyles }}
			/>
		</Tabs>
	);
}
