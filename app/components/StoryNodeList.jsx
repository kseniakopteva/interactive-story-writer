import { useContext } from "react";
import { Text, View } from "react-native";
import StoryNodeListItem from "../components/StoryNodeListItem";
import { StoryNodeContext } from "../contexts";

export default function StoryNodeList() {
	const { storyNodes } = useContext(StoryNodeContext);

	return (
		<View
			style={{
				gap: 10,
				marginTop: 10,
			}}
		>
			{storyNodes.map((node) => (
				<StoryNodeListItem key={node.id} node={node} />
			))}
			<Text style={{ marginTop: 20, textAlign: "center", color: "#bbb" }}>
				You should write more of these...
			</Text>
		</View>
	);
}
