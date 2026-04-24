import { colors, fonts, sizes } from "@/assets/theme";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BasicButton from "../components/base/BasicButton";
import BasicPanel from "../components/base/BasicPanel";
import { TextBold, TextRegular } from "../components/base/textComponents";
import ErrorBanner from "../components/ErrorBanner";
import { StoryNodeContext } from "../contexts";

export default function StoryScreen() {
	const { storyNodes } = useContext(StoryNodeContext);

	const [activeNode, setActiveNode] = useState(
		storyNodes.find((elem) => elem.start === true),
	);

	useEffect(() => {
		setActiveNode(storyNodes.find((elem) => elem.start === true));
	}, [storyNodes]);

	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<BasicButton
					onPress={() =>
						setActiveNode(storyNodes.find((elem) => elem.start === true))
					}
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
			contentContainerStyle={{
				flexDirection: "row",
				justifyContent: "center",
				flex: 1,
			}}
		>
			<BasicPanel
				style={{
					flex: 1,
					margin: sizes.screenMargin,
					padding: 20,
				}}
			>
				<View>
					{activeNode?.body?.map((paragraph) => (
						<TextRegular key={paragraph.id}>
							{paragraph.text}
							{"\n"}
						</TextRegular>
					))}
				</View>

				{activeNode?.links.map((link) => {
					const isLinkDead = !storyNodes.find(
						(node) => node.id === link.targetId,
					);
					return (
						<Pressable
							key={link.id}
							onPress={() =>
								setActiveNode(
									storyNodes.find((elem) => elem.id === link.targetId),
								)
							}
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
	},
	deadLink: {
		fontFamily: fonts.fontParagraph,
		color: colors.textSubtle,
	},
});
