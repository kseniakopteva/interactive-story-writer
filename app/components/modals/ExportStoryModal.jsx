import * as Sharing from "expo-sharing";
import { StoryContext } from "../../contexts";
import BasicModal from "../base/BasicModal";

import * as FileSystem from "expo-file-system/legacy";
import { useContext } from "react";
import BasicButton from "../base/BasicButton";
import { H1, TextRegular } from "../base/textComponents";

export default function ExportStoryModal({
	exportStoryModalVisible,
	setExportStoryModalVisible,
}) {
	const { getCurrentStory, getCurrentStoryNodes } = useContext(StoryContext);

	const currentStory = getCurrentStory();
	const currentStoryNodes = getCurrentStoryNodes();

	async function exportToTwee() {
		const uri = getCurrentStoryUri();

		await FileSystem.writeAsStringAsync(uri, parseCurrentStoryToTwee());

		await Sharing.shareAsync(uri);
	}

	function parseCurrentStoryToTwee() {
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
				if (link.text === "") return [];

				const shownLinkText = link.text;
				const titleOfLinkedNode = targetLink?.title;

				return [shownLinkText, titleOfLinkedNode];
			});

			linkArrayWithTargets.forEach((linkArr) => {
				if (linkArr === undefined || linkArr.length === 0) return;
				if (linkArr[0] === linkArr[1]) fileText += `[[${linkArr[0]}]]\n`;
				else fileText += `[[${linkArr[0]}->${linkArr[1]}]]\n`;
			});

			fileText += "\n\n\n";
		});

		return fileText;
	}

	async function exportToJSON() {
		const uri = getCurrentStoryUri();

		await FileSystem.writeAsStringAsync(uri, parseCurrentStoryToJSON());

		await Sharing.shareAsync(uri);
	}

	function parseCurrentStoryToJSON() {
		const fileText = JSON.stringify(currentStory);
		return fileText;
	}

	function getCurrentStoryUri() {
		const parsedTitle = currentStory.title.replace(
			/[ &\/\\#,+()$~%.'":*?<>{}]/g,
			"_",
		);
		return `${FileSystem.documentDirectory}${parsedTitle}.txt`;
	}

	// TODO: add explanations for different types of export
	return (
		<BasicModal
			isVisible={exportStoryModalVisible}
			setIsVisible={setExportStoryModalVisible}
		>
			<H1 style={{ marginBottom: 10 }}>Export Story</H1>
			<TextRegular>Here are the available options of export:</TextRegular>
			<BasicButton onPress={exportToTwee} style={{ marginTop: 20 }}>
				Export to Twee Format (.txt)
			</BasicButton>
			<BasicButton onPress={exportToJSON} style={{ marginTop: 10 }}>
				Export as JSON Format (.txt)
			</BasicButton>
			<BasicButton onPress={() => {}} style={{ marginTop: 10 }} disabled={true}>
				Export to ???
			</BasicButton>
		</BasicModal>
	);
}
