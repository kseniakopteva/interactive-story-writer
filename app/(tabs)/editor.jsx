import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ImageBackground, ScrollView } from "react-native";
import { colors, sizes } from "../../assets/theme";
import BasicButton from "../components/base/BasicButton";
import AddNodeModal from "../components/modals/AddNodeModal";
import ExportStoryModal from "../components/modals/ExportStoryModal";
import ImportStoryModal from "../components/modals/ImportStoryModal";
import StoryNodeList from "../components/StoryNodeList";

export default function EditorScreen() {
	const [addNodeModalVisible, setAddNodeModalVisible] = useState(false);
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
		<ImageBackground
			source={require("../../assets/images/bg_transparent.png")}
			resizeMode="repeat"
			style={{ flex: 1, backgroundColor: colors.background }}
		>
			<ScrollView
				style={{}}
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				<StoryNodeList />
				<AddNodeModal
					addNodeModalVisible={addNodeModalVisible}
					setAddNodeModalVisible={setAddNodeModalVisible}
				/>
			</ScrollView>
			<BasicButton
				onPress={() => setAddNodeModalVisible(true)}
				style={{
					position: "absolute",
					bottom: sizes.screenMargin,
					left: sizes.screenMargin,
					right: sizes.screenMargin,
				}}
			>
				Add New Story Node
			</BasicButton>
			<ExportStoryModal
				exportStoryModalVisible={exportStoryModalVisible}
				setExportStoryModalVisible={setExportStoryModalVisible}
			/>
			<ImportStoryModal
				importStoryModalVisible={importStoryModalVisible}
				setImportStoryModalVisible={setImportStoryModalVisible}
			/>
		</ImageBackground>
	);
}
