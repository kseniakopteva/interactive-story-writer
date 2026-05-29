import { useNavigation } from "expo-router";
import { useContext, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { colors, sizes } from "../../assets/theme";
import StoryListItem from "../components/StoryListItem";
import BasicButton from "../components/base/BasicButton";
import AddStoryModal from "../components/modals/AddStoryModal";
import ExportStoryModal from "../components/modals/ExportStoryModal";
import ImportStoryModal from "../components/modals/ImportStoryModal";
import { StoryContext } from "../contexts";

export default function LibraryScreen() {
	const { stories } = useContext(StoryContext);
	const [addStoryModalVisible, setAddStoryModalVisible] = useState(false);
	const [exportStoryModalVisible, setExportStoryModalVisible] = useState(false);
	const [importStoryModalVisible, setImportStoryModalVisible] = useState(false);

	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<>
					<BasicButton
						onPress={() => setImportStoryModalVisible(true)}
						style={{
							marginRight: 10,
						}}
						type="secondary"
					>
						Import Story
					</BasicButton>
					<BasicButton
						onPress={() => setExportStoryModalVisible(true)}
						style={{
							marginRight: 10,
						}}
						type="secondary"
					>
						Export Story
					</BasicButton>
				</>
			),
		});
	});

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
			<ExportStoryModal
				exportStoryModalVisible={exportStoryModalVisible}
				setExportStoryModalVisible={setExportStoryModalVisible}
			/>
			<ImportStoryModal
				importStoryModalVisible={importStoryModalVisible}
				setImportStoryModalVisible={setImportStoryModalVisible}
			/>
		</View>
	);
}
