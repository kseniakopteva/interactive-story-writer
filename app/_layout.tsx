import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { StoryNodeProvider } from "./contexts";

import { Sintony_400Regular, Sintony_700Bold } from "@expo-google-fonts/sintony";
import { SourceSans3_700Bold, useFonts } from "@expo-google-fonts/source-sans-3";
import { useEffect } from "react";

export const unstable_settings = {
	anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SourceSans3_700Bold,
		Sintony_400Regular,
		Sintony_700Bold,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<StoryNodeProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				{/* <Stack.Screen
					name="modal"
					options={{ presentation: "modal", title: "Modal" }}
				/> */}
			</Stack>
			<StatusBar style="dark" />
		</StoryNodeProvider>
	);
}
