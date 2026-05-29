import { useContext } from "react";
import { StoryContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import { H1, TextBold, TextRegular } from "../base/textComponents";

export default function DeleteNodeConfirmationModal({
	node,
	isDeleteNodeModalVisible,
	setIsDeleteNodeModalVisible,
}) {
	const { currentStoryId, removeNode } = useContext(StoryContext);

	const sumOfSymbols = node?.body?.map((paragraph) => paragraph.text).join(`\n`).length;

	return (
		<BasicModal
			isVisible={isDeleteNodeModalVisible}
			setIsVisible={setIsDeleteNodeModalVisible}
			style={{ gap: 10 }}
		>
			<H1 style={{ marginBottom: 10 }}>Delete Node</H1>
			<TextRegular style={{ marginBottom: 10 }}>
				You are deleting node <TextBold>&quot;{node.title}&quot;</TextBold> with{" "}
				{node.body?.length} paragraphs written, a total of {sumOfSymbols} symbols,
				and {node.links.length} links to other nodes.
			</TextRegular>
			<TextRegular style={{ marginBottom: 10 }}>Are you sure?</TextRegular>
			<BasicButton
				type="danger"
				onPress={() => removeNode(currentStoryId, node.id)}
			>
				Yes, delete it forever
			</BasicButton>
			<BasicButton
				type="secondary"
				onPress={() => setIsDeleteNodeModalVisible(false)}
			>
				No, I changed my mind
			</BasicButton>
		</BasicModal>
	);
}
