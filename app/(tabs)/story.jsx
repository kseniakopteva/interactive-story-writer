import { colors, fonts, sizes } from "@/assets/theme";
import { useNavigation } from "expo-router";
import { useContext, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BasicButton from "../components/base/BasicButton";
import BasicPanel from "../components/base/BasicPanel";
import { TextBold, TextRegular, TextSubtle } from "../components/base/textComponents";
import ErrorBanner from "../components/ErrorBanner";
import { StoryContext } from "../contexts";

import { SourceSerif4_500Medium, useFonts } from "@expo-google-fonts/source-serif-4";

export default function StoryScreen() {
	const { getCurrentStoryNodes } = useContext(StoryContext);

	const currentStoryNodes = getCurrentStoryNodes();

	const [activeNodeId, setActiveNodeId] = useState(null);

	const activeNode =
		currentStoryNodes?.find((node) => node.id === activeNodeId) ||
		currentStoryNodes?.find((node) => node.start === true);

	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<BasicButton
					onPress={() => setActiveNodeId(null)}
					style={{
						marginRight: 10,
					}}
					type="secondary"
				>
					Reset
				</BasicButton>
			),
		});
	});

	const [fontsLoaded] = useFonts({
		SourceSerif4_500Medium,
	});

	if (!fontsLoaded) {
		return null;
	}

	if (activeNode === undefined || activeNode === null)
		return (
			<ScrollView style={styles.scrollView}>
				<ErrorBanner style={{ margin: sizes.screenMargin }}>
					Oops! The story doesn&apos;t have a starting node. Please set it by
					clicking <TextBold>&quot;Edit node&quot;</TextBold> on any node and
					pressing the button{" "}
					<TextBold>&quot;Make story start here&quot;</TextBold>.
				</ErrorBanner>
			</ScrollView>
		);

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: colors.backgroundDark,
			}}
			contentContainerStyle={
				{
					// flexDirection: "row",
					// justifyContent: "center",
				}
			}
		>
			<BasicPanel
				style={{
					margin: sizes.screenMargin,
					padding: 20,
					// flex: 1,
				}}
			>
				<View style={{ width: "100%" }}>
					{activeNode?.body?.map((paragraph) => (
						<TextRegular key={paragraph.id} sizeMultiplier={1.07}>
							{paragraph.text}
							{"\n"}
						</TextRegular>
						// <Text
						// 	style={{
						// 		fontFamily: fonts.fontParagraph,
						// 		fontSize: sizes.textRegular + 1,
						// 		color: colors.text,
						// 	}}
						// 	key={paragraph.id}
						// >
						// 	{paragraph.text}
						// 	{"\n"}
						// </Text>
					))}
				</View>

				{activeNode?.links.map((link) => {
					const isLinkDead = !currentStoryNodes.find(
						(node) => node.id === link.targetId,
					);
					return (
						<Pressable
							key={link.id}
							onPress={() => setActiveNodeId(link.targetId)}
							style={{
								paddingVertical: 5,
								marginBottom: 5,
							}}
							disabled={isLinkDead}
						>
							<Text style={!isLinkDead ? styles.link : styles.deadLink}>
								{link.text}
							</Text>
						</Pressable>
					);
				})}

				{activeNode?.links === undefined ||
					(activeNode?.links.length === 0 ? (
						<TextSubtle style={{ textStyle: "italic", fontSize: sizes.textRegular * 1.1 }}>The End.</TextSubtle>
					) : <></>)}
			</BasicPanel>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: colors.backgroundDark,
	},
	link: {
		fontFamily: fonts.fontParagraphBold,
		fontSize: sizes.textRegular * 1.2,
		color: colors.primary,
	},
	deadLink: {
		fontFamily: fonts.fontParagraph,
		color: colors.textSubtle,
		fontSize: sizes.textRegular * 1.2,
	},
});
