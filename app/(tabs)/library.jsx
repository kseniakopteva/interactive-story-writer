import { useContext, useState } from "react";
import { View } from "react-native";
import { colors, sizes } from "../../assets/theme";
import StoryListItem from "../components/StoryListItem";
import BasicButton from "../components/base/BasicButton";
import AddStoryModal from "../components/modals/AddStoryModal";
import { StoryContext } from "../contexts";

export default function LibraryScreen() {
	const { stories } = useContext(StoryContext);
	const [addStoryModalVisible, setAddStoryModalVisible] = useState(false);

	return (
		<View style={{ backgroundColor: colors.background, flex: 1 }}>
			<View style={{ margin: sizes.screenMargin, gap: 10 }}>
				{stories.map((story) => (
					<StoryListItem key={story.id} story={story} />
				))}
			</View>
			<BasicButton
				onPress={() => setAddStoryModalVisible(true)}
				style={{
					position: "absolute",
					bottom: sizes.screenMargin,
					left: sizes.screenMargin,
					right: sizes.screenMargin,
				}}
			>
				Add New Story
			</BasicButton>
			<AddStoryModal
				addStoryModalVisible={addStoryModalVisible}
				setAddStoryModalVisible={setAddStoryModalVisible}
			/>
		</View>
	);
}
