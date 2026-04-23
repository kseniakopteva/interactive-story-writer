import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarIcon: () => null,
				tabBarLabelStyle: {
					fontSize: 16,
					fontWeight: "bold",
					minWidth: "100%",
				},
				tabBarItemStyle: {
					alignItems: "center",
					justifyContent: "space-around",
				},
				tabBarLabelPosition: "beside-icon",
				tabBarActiveTintColor: "black",
				tabBarInactiveTintColor: "gray",
			}}
		>
			<Tabs.Screen name="index" options={{ title: "Home" }} />
			<Tabs.Screen name="story" options={{ title: "Story" }} />
		</Tabs>
	);
}
