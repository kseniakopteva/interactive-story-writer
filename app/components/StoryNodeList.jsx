import { useContext } from "react";
import { View } from "react-native";
import { sizes } from "../../assets/theme";
import ErrorBanner from "../components/ErrorBanner";
import StoryNodeListItem from "../components/StoryNodeListItem";
import { StoryContext } from "../contexts";
import { TextBold } from "./base/textComponents";

export default function StoryNodeList() {
	const { stories, currentStoryId } = useContext(StoryContext);

	const currentStory = stories.find((story) => story.id === currentStoryId);
	const currentStoryNodes = currentStory?.storyNodes;

	return (
		<View
			style={{
				gap: 10,
				margin: sizes.screenMargin,
			}}
		>
			{currentStory.default ? (
				<ErrorBanner style={{ margin: sizes.screenMargin }}>
					Hey! This is the default story. You can play it in the{" "}
					<TextBold>&quot;Story&quot;</TextBold> tab. You can make a story from
					scratch in the <TextBold>&quot;Library&quot;</TextBold> tab, as well
					as delete this one. (If you edit anything in this story this banner
					will dissapear). Good luck! :)
				</ErrorBanner>
			) : <></>}

			{currentStoryNodes?.map((node) => (
				<StoryNodeListItem key={node.id} node={node} />
			))}
		</View>
	);
}
