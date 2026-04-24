import { useContext } from "react";
import { View } from "react-native";
import StoryNodeListItem from "../components/StoryNodeListItem";
import { StoryNodeContext } from "../contexts";
import { sizes } from "../../assets/theme";

export default function StoryNodeList() {
	const { storyNodes } = useContext(StoryNodeContext);

	return (
		<View
			style={{
				gap: 10,
				margin: sizes.screenMargin,
			}}
		>
			{storyNodes.map((node) => (
				<StoryNodeListItem key={node.id} node={node} />
			))}
		</View>
	);
}
