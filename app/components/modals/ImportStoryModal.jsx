import { StoryContext } from "../../contexts";
import BasicModal from "../base/BasicModal";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { useContext } from "react";
import { Text } from "react-native";
import BasicButton from "../base/BasicButton";
import { H1, TextRegular } from "../base/textComponents";

export default function ImportStoryModal({
	importStoryModalVisible,
	setImportStoryModalVisible,
}) {
	const { setStories } = useContext(StoryContext);

	async function importFromJSON() {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: "*/*",
				copyToCacheDirectory: true,
			});

			if (result.canceled) {
				return;
			}

			const file = result.assets[0];

			const fileContents = await FileSystem.readAsStringAsync(file.uri);

			setStories(JSON.parse(fileContents));
			setImportStoryModalVisible(false);

		} catch (error) {
			console.error("Failed to pick/read file:", error);
		}
	}

	return (
		<BasicModal
			isVisible={importStoryModalVisible}
			setIsVisible={setImportStoryModalVisible}
		>
			<H1 style={{ marginBottom: 10 }}>Import Story</H1>
			<TextRegular>Here are the available options of import:</TextRegular>
			<BasicButton onPress={importFromJSON} style={{ marginTop: 20 }}>
				Import from JSON
			</BasicButton>
			<BasicButton onPress={() => {}} style={{ marginTop: 10 }} disabled={true}>
				Import from ???
			</BasicButton>
		</BasicModal>
	);
}
