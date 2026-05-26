import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StoryContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import BasicTextarea from "../base/BasicTextarea";
import BasicTextInput from "../base/BasicTextInput";
import { H1, H3, TextError, TextSubtle } from "../base/textComponents";

export default function EditStoryModal({ story, editStoryModal, setEditStoryModal }) {
	const INITIAL_INPUT = {
		id: story.id,
		title: story.title,
		description: story.description,
		active: currentStoryId === story.id,
	};

	const { currentStoryId, setCurrentStoryId, setStories } = useContext(StoryContext);
	const [input, setInput] = useState(INITIAL_INPUT);
	const [errors, setErrors] = useState({ title: "", description: "" });

	// did user press the "set as active" button?
	// used to display the "don't forget to save!" text
	const [wasActivePressed, setWasActivePressed] = useState(false);

	// used to keep "active" up to date
	useEffect(() => {
		setInput((prev) => ({
			...prev,
			active: currentStoryId === story.id,
		}));
	}, [currentStoryId, story.id]);

	// remove errors when the user is (supposedly) fixing them
	useEffect(() => {
		setErrors((prev) => ({ ...prev, title: "" }));
	}, [input.title]);
	useEffect(() => {
		setErrors((prev) => ({ ...prev, description: "" }));
	}, [input.description]);

	function handleChange(field, value) {
		setInput((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	function updateStory(id) {
		if (!validate()) return;
		setWasActivePressed(false);

		setStories((prevStories) =>
			prevStories.map((s) => {
				if (s.id === story.id)
					return {
						...story,
						title: input.title,
						description: input.description,
						timestamp_edited: Date.now(),
						default: false, // TODO: delete the key instead of setting it to false
					};

				return s;
			}),
		);

		if (input.active) setCurrentStoryId(story.id);

		setEditStoryModal(false);
	}

	function validate() {
		if (input.title === "") {
			setErrors((prev) => ({ ...prev, title: "Title cannot be empty" }));
			return false;
		}
		if (input.title.length > 100) {
			setErrors((prev) => ({
				...prev,
				title: "Title cannot be longer than 100 symbols",
			}));
			return false;
		}
		return true;
	}

	function onClose() {
		setInput({
			id: story.id,
			title: story.title,
			description: story.description,
			active: currentStoryId === story.id,
		});
		setWasActivePressed(false);
	}

	return (
		<BasicModal
			isVisible={editStoryModal}
			setIsVisible={setEditStoryModal}
			handleClose={onClose}
			showCancelButton={true}
		>
			<View
				style={{ flexDirection: "row", gap: 5, justifyContent: "space-between" }}
			>
				<H1 style={{ marginBottom: 10 }}>{story.title}</H1>
				{/* {input.active ? ( */}
				<View style={{ flexDirection: "column", alignItems: "center" }}>
					<BasicButton
						disabled={input.active}
						onPress={() => {
							setInput((prev) => ({
								...prev,
								active: true,
							}));
							setWasActivePressed(true);
						}}
					>
						{input.active ? "Current story" : "Set active"}
					</BasicButton>

					{wasActivePressed ? (
						<>
							<TextSubtle style={{ marginTop: 5 }}>
								Dont forget to
							</TextSubtle>
							<TextSubtle>save your changes!</TextSubtle>
						</>
					) : (
						<></>
					)}
				</View>
			</View>

			<View style={{ marginTop: 10 }}>
				<H3 style={{ marginVertical: 5, marginTop: 10 }}>Title</H3>
				<BasicTextInput
					label={"Title"}
					placeholder={"Title"}
					value={input.title}
					onChangeText={(value) => handleChange("title", value)}
				/>
				{errors.title !== "" ? (
					<TextError style={{ marginVertical: 5 }}>{errors.title}</TextError>
				) : <></>}
				<H3 style={{ marginVertical: 5, marginTop: 10 }}>Description</H3>
				<BasicTextarea
					label={"Description"}
					placeholder={"Description"}
					value={input.description}
					onChangeText={(value) => handleChange("description", value)}
				/>
				{errors.description !== ""? (
					<TextError style={{ marginVertical: 5 }}>
						{errors.description}
					</TextError>
				): <></>}
				<TextSubtle style={{ textAlign: "center", marginTop: 20 }}>
					Dont forget to save your changes!
				</TextSubtle>
				<BasicButton
					onPress={() => updateStory(story.id)}
					style={{ marginTop: 10 }}
				>
					Save changes
				</BasicButton>
			</View>
		</BasicModal>
	);
}
