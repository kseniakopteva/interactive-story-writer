import * as Sharing from "expo-sharing";
import { StoryContext } from "../../contexts";
import BasicModal from "../base/BasicModal";

import * as FileSystem from "expo-file-system/legacy";
import { useContext } from "react";
import { Text } from "react-native";
import BasicButton from "../base/BasicButton";
import { H1 } from "../base/textComponents";

export default function ExportStoryModal({
	exportStoryModalVisible,
	setExportStoryModalVisible,
}) {
	const { stories, currentStoryId } = useContext(StoryContext);

	const currentStoryNodes = stories.find(
		(story) => story.id === currentStoryId,
	).storyNodes;

	async function exportToTwee() {
		const uri = FileSystem.documentDirectory + "myFile.txt";

		await FileSystem.writeAsStringAsync(uri, parseCurrentStory());

		await Sharing.shareAsync(uri);
	}

	function parseCurrentStory() {
		let fileText = "";

		let onlyTitles = currentStoryNodes.map((node) => node.title);
		const checkSet = new Set(onlyTitles);
		if (checkSet.size !== onlyTitles.length)
			throw new Error("Titles need to be unique!");

		currentStoryNodes.forEach((node) => {
			let title = node.title;

			if (node.start) {
				title = "Start";
			}

			let body = node.body?.map((paragraph) => paragraph.text).join(`\n`);

			fileText += `:: ${title}\n${body}\n\n`;

			const linkArrayWithTargets = node.links.map((link) => {
				const targetLink = currentStoryNodes.find(
					(node) => node.id === link.targetId,
				);
				return [link.text, targetLink.title];
			});

			linkArrayWithTargets.forEach((linkArr) => {
				if (linkArr[0] === linkArr[1]) fileText += `[[${linkArr[0]}]]\n`;
				else fileText += `[[${linkArr[0]}->${linkArr[1]}]]\n`;
			});

			fileText += "\n\n\n";
		});

		console.log(fileText);
		return fileText;
	}

	return (
		<BasicModal
			isVisible={exportStoryModalVisible}
			setIsVisible={setExportStoryModalVisible}
		>
			<H1 style={{ marginBottom: 10 }}>Export Story</H1>
			<Text>Here are the available options of export:</Text>
			<BasicButton onPress={exportToTwee} style={{ marginTop: 20 }}>
				Export to Twee Format
			</BasicButton>
			<BasicButton onPress={() => {}} style={{ marginTop: 10 }} disabled={true}>
				Export to ???
			</BasicButton>
		</BasicModal>
	);
}
