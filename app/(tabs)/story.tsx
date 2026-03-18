import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StoryNodeContext } from "../contexts";

export default function TabTwoScreen() {
	const context = useContext(StoryNodeContext);

	const [activeNodeId, setActiveNodeId] = useState(
		context?.storyNodes.find((elem) => elem.start === true)?.id,
	);

	const activeNode = context?.storyNodes.find((n) => n.id === activeNodeId);

	if (!context) return null;
	const { storyNodes } = context;

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
				}}
			>
				<Pressable
					onPress={() =>
						setActiveNodeId(
							storyNodes.find((elem) => elem.start === true)?.id,
						)
					}
					style={{
						padding: 5,
						backgroundColor: "black",
						borderRadius: 5,
						width: 60,
						margin: 10,
					}}
				>
					<Text style={{ color: "white", textAlign: "center" }}>Reset</Text>
				</Pressable>
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

				{activeNode?.links.map((link) => (
					<Pressable
						key={link.id}
						onPress={() => setActiveNodeId(link.targetId)}
						style={{
							padding: 5,
							marginBottom: 5,
						}}
					>
						<Text style={{ fontWeight: "bold" }}> {link.text}</Text>
					</Pressable>
				))}
			</View>
		</View>
	);
}
