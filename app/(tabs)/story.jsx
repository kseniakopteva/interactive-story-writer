import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BasicButton from "../components/base/BasicButton";
import { StoryNodeContext } from "../contexts";

export default function StoryScreen() {
	const { storyNodes } = useContext(StoryNodeContext);

	const [activeNode, setActiveNode] = useState(
		storyNodes.find((elem) => elem.start === true),
	);

	useEffect(() => {
		setActiveNode(storyNodes.find((elem) => elem.start === true));
	}, [storyNodes]);

	const deadLinkStyles = { fontStyle: "italic", color: "#999" };

	if (activeNode === undefined || activeNode === null)
		return (
			<View>
				<Text>
					There is no starting node. Please set it by clicking &quot;Edit&quot;
					on any node.
				</Text>
			</View>
		);

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
				}}
			>
				<BasicButton
					onPress={() =>
						setActiveNode(storyNodes.find((elem) => elem.start === true))
					}
					styles={{
						margin: 10,
					}}
				>
					Reset
				</BasicButton>
			</View>
			<View
				style={{
					margin: 15,
					backgroundColor: "white",
					boxShadow: "0px 2px 3px rgba(0,0,0,0.05)",
					padding: 10,
					borderRadius: 8,
					marginTop: 5,
				}}
			>
				<Text>
					{activeNode?.body?.map((paragraph) => (
						<Text key={paragraph.id}>
							{paragraph.text}
							{"\n\n"}
						</Text>
					))}
				</Text>

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
								padding: 5,
								marginBottom: 5,
							}}
							disabled={isLinkDead}
						>
							<Text
								style={
									!isLinkDead ? { fontWeight: "bold" } : deadLinkStyles
								}
							>
								{link.text}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
