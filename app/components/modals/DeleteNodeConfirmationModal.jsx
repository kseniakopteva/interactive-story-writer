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
	const { setStories, currentStoryId } = useContext(StoryContext);

	const sumOfSymbols = node?.body?.map((paragraph) => paragraph.text).join(`\n`).length;

	function removeNode() {
		setStories((prevStories) =>
			prevStories?.map((story) => {
				if (story.id !== currentStoryId) return story;

				return {
					...story,
					storyNodes: story.storyNodes.filter((n) => n.id !== node.id),
					timestamp_edited: Date.now(),
					default: false, // TODO: delete the key instead of setting it to false
				};
			}),
		);
	}

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
			<BasicButton type="danger" onPress={removeNode}>
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
