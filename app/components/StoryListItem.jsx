import { useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { colors } from "../../assets/theme";
import BasicPanel from "../components/base/BasicPanel";
import {
	H1,
	H3,
	TextBold,
	TextRegular,
	TextSubtle,
} from "../components/base/textComponents";
import DeleteStoryConfirmationModal from "../components/modals/DeleteStoryConfirmationModal";
import { StoryContext } from "../contexts";
import BasicButton from "./base/BasicButton";
import EditStoryModal from "./modals/EditStoryModal";

export default function StoryListItem({ story }) {
	const { currentStoryId, setCurrentStoryId } = useContext(StoryContext);
	const [editStoryModal, setEditStoryModal] = useState(false);
	const [isDeleteStoryModalVisible, setIsDeleteStoryModalVisible] = useState(false);

	const activeStoryStyle =
		story.id === currentStoryId
			? { borderColor: colors.primary, borderWidth: 2, borderStyle: "dotted" }
			: "";

	const storyCreatedDate = new Date(story.timestamp_created).toLocaleString(undefined, {
		dateStyle: "long",
		timeStyle: "short",
	});
	const storyEditedDate = new Date(story.timestamp_edited).toLocaleString(undefined, {
		dateStyle: "long",
		timeStyle: "short",
	});

	return (
		<Pressable
			onPress={() => {
				setCurrentStoryId(story.id);
			}}
		>
			<BasicPanel style={{ ...activeStoryStyle }}>
				<View style={{ flexDirection: "row", gap: 5 }}>
					<View style={{ flex: 1 }}>
						<View
							style={{
								flexDirection: "column",
								alignItems: "flex-start",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									gap: 5,
									alignItems: "flex-start",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<H1 style={{ flexShrink: 1, wordBreak: "break-all" }}>
									{story.title}
								</H1>
								<View
									style={{
										flexDirection: "row",
										gap: 5,
									}}
								>
									<BasicButton
										type="secondary"
										onPress={() => setIsDeleteStoryModalVisible(true)}
									>
										Remove
									</BasicButton>
									<BasicButton onPress={() => setEditStoryModal(true)}>
										Edit Info
									</BasicButton>
								</View>
							</View>
							{story.default ? (
								<TextBold
									style={{
										marginBottom: 5,
										backgroundColor: colors.alert,
										padding: 5,
										borderRadius: 8,
									}}
								>
									Default
								</TextBold>
							) : (
								<></>
							)}
						</View>

						{story.description ? (
							<View>
								<H3 style={{ marginVertical: 5, marginTop: 10 }}>
									Description
								</H3>
								<TextRegular>{story.description}</TextRegular>
							</View>
						) : (
							<TextSubtle style={{ marginVertical: 5, marginTop: 10 }}>
								No description...
							</TextSubtle>
						)}
						<View style={{ marginTop: 10 }}>
							<TextSubtle style={{ fontStyle: "italic" }}>
								Date created: {storyCreatedDate}
							</TextSubtle>
							<TextSubtle style={{ fontStyle: "italic" }}>
								Last edited:{" "}
								{storyEditedDate === storyCreatedDate
									? "No edits yet! I wonder what this story will be..."
									: storyEditedDate}
							</TextSubtle>
						</View>
					</View>
				</View>
			</BasicPanel>
			<EditStoryModal
				story={story}
				editStoryModal={editStoryModal}
				setEditStoryModal={setEditStoryModal}
			/>
			<DeleteStoryConfirmationModal
				isDeleteStoryModalVisible={isDeleteStoryModalVisible}
				setIsDeleteStoryModalVisible={setIsDeleteStoryModalVisible}
				story={story}
			/>
		</Pressable>
	);
}
