import { useContext } from "react";
import { StoryContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import { H2, TextBold, TextRegular } from "../base/textComponents";

export default function DeleteNodeConfirmationModal({
	story,
	isDeleteStoryModalVisible,
	setIsDeleteStoryModalVisible,
}) {
	const { removeStory } = useContext(StoryContext);

	const sumOfSymbols =
		story.storyNodes
			.map(
				(node) =>
					node.body?.map((paragraph) => paragraph.text || "").join("\n") || "",
			)
			.join("\n").length || 0;

	return (
		<BasicModal
			isVisible={isDeleteStoryModalVisible}
			setIsVisible={setIsDeleteStoryModalVisible}
			style={{ gap: 10 }}
		>
			<H2>Delete Story</H2>
			<TextRegular style={{ marginBottom: 10 }}>
				You are deleting story <TextBold>&quot;{story.title}&quot;</TextBold> with{" "}
				{story.storyNodes.length} story nodes, and a total of {sumOfSymbols}{" "}
				symbols written.
			</TextRegular>
			<TextRegular style={{ marginBottom: 10 }}>Are you sure?</TextRegular>
			<BasicButton type="danger" onPress={() => removeStory(story.id)}>
				Yes, delete it forever
			</BasicButton>
			<BasicButton
				type="secondary"
				onPress={() => setIsDeleteStoryModalVisible(false)}
			>
				No, I changed my mind
			</BasicButton>
		</BasicModal>
	);
}
