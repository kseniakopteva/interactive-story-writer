import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { AllStoriesProvider } from "./contexts";

import { Sintony_400Regular, Sintony_700Bold } from "@expo-google-fonts/sintony";
import { SourceSans3_700Bold, useFonts } from "@expo-google-fonts/source-sans-3";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

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

	// back button
	useEffect(() => {
		const backAction = () => {
			Alert.alert(
				"Exit app",
				"Are you sure you want to exit the app?",
				[
					{
						text: "Cancel",
						onPress: () => null,
						style: "cancel",
					},
					{ text: "YES", onPress: () => BackHandler.exitApp() },
				],
				{ cancelable: true },
			);
			return true;
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => backHandler.remove();
	}, []);
	// end back button

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<AllStoriesProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="dark" />
		</AllStoriesProvider>
	);
}
