import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StoryContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import BasicTextarea from "../base/BasicTextarea";
import BasicTextInput from "../base/BasicTextInput";
import { H1, TextError } from "../base/textComponents";

export default function AddStoryModal({ addStoryModalVisible, setAddStoryModalVisible }) {
	const [titleInput, setTitleInput] = useState("");
	const [descriptionInput, setDescriptionInput] = useState("");

	const { setStories, setCurrentStoryId } = useContext(StoryContext);

	const [errors, setErrors] = useState({ title: "", description: "" });

	useEffect(() => {
		setErrors({ title: "", description: "" });
	}, [titleInput]);

	function saveNewStory() {
		if (!validate()) return;

		const newId = Date.now();

		const newStory = {
			id: newId,
			title: titleInput,
			description: descriptionInput,
			timestamp_created: Date.now(),
			storyNodes: [],
		};

		setStories((prev) => {
			return [...prev, newStory];
		});

		setCurrentStoryId(newId);

		setAddStoryModalVisible(false);
		setTitleInput("");
		setDescriptionInput("");
		setErrors({ title: "", description: "" });
	}

	function validate() {
		if (titleInput === "") {
			setErrors((prev) => ({
				...prev,
				title: "Title cannot be empty",
			}));
			return false;
		}
		if (titleInput.length > 100) {
			setErrors((prev) => ({
				...prev,
				title: "Title cannot be longer than 100 symbols",
			}));

			return false;
		}
		if (descriptionInput.length > 500) {
			setErrors((prev) => ({
				...prev,
				description: "Description cannot be longer than 500 symbols",
			}));

			return false;
		}
		return true;
	}

	function onClose() {
		setTitleInput("");
		setDescriptionInput("");
	}

	return (
		<BasicModal
			isVisible={addStoryModalVisible}
			setIsVisible={setAddStoryModalVisible}
			handleClose={onClose}
			showCancelButton={true}
		>
			<H1 style={{ marginBottom: 10 }}>Add New Story</H1>

			<View style={{ gap: 5, marginBottom: 10 }}>
				<BasicTextInput
					placeholder={"Title"}
					value={titleInput}
					onChangeText={setTitleInput}
				/>
				{errors.title !== "" ? (
					<TextError style={{ marginVertical: 5 }}>{errors.title}</TextError>
				): <></>}
				<BasicTextarea
					placeholder={
						"Description (optional, and isn't exported if you are exporting a story to Twee)"
					}
					value={descriptionInput}
					onChangeText={setDescriptionInput}
				/>
				{errors.description !== "" ? (
					<TextError style={{ marginVertical: 5 }}>
						{errors.description}
					</TextError>
				): <></>}
			</View>

			<BasicButton onPress={saveNewStory} style={{ marginTop: 20 }}>
				Create Story
			</BasicButton>
		</BasicModal>
	);
}
