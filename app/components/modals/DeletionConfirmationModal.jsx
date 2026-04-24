import { useContext } from "react";
import { StoryNodeContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import { H2, TextBold, TextRegular } from "../base/textComponents";

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
			style={{ gap: 10 }}
		>
			<H2>Delete Node</H2>
			<TextRegular style={{ marginBottom: 10 }}>
				You are deleting node <TextBold>&quot;{node.title}&quot;</TextBold> with{" "}
				{node.body?.length} paragraphs written, a total of {sumOfSymbols} symbols,
				and {node.links.length} links to other nodes.
			</TextRegular>
			<TextRegular style={{ marginBottom: 10 }}>Are you sure?</TextRegular>
			<BasicButton type="danger" onPress={removeNode}>
				Yes, delete it forever
			</BasicButton>
			<BasicButton
				type="secondary"
				onPress={() => setIsDeletionModalVisible(false)}
			>
				No, I changed my mind
			</BasicButton>
		</BasicModal>
	);
}
