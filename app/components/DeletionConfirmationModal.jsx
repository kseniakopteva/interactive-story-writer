import { useContext } from "react";
import { Text } from "react-native";
import { StoryNodeContext } from "../contexts";
import BasicButton from "./base/BasicButton";
import BasicModal from "./base/BasicModal";

export default function DeletionConfirmationModal({
	node,
	isDeletionModalVisible,
	setIsDeletionModalVisible,
}) {
	const { storyNodes, setStoryNodes } = useContext(StoryNodeContext);
	const sumOfSymbols = node.body?.map((paragraph) => paragraph.text).join(`\n`).length;

	function removeNode() {
		setStoryNodes((prev) => prev.filter((n) => n.id !== node.id));
	}

	return (
		<BasicModal
			isVisible={isDeletionModalVisible}
			setIsVisible={setIsDeletionModalVisible}
		>
			<Text>
				You are deleting node &quot;{node.title}&quot; with {node.body?.length}{" "}
				paragraphs written, a total of {sumOfSymbols} symbols. Are you sure?
			</Text>
			<BasicButton onPress={removeNode}>Yes,Remove</BasicButton>
			<BasicButton
				type="secondary"
				onPress={() => setIsDeletionModalVisible(false)}
			>
				No, do not delete
			</BasicButton>
		</BasicModal>
	);
}
