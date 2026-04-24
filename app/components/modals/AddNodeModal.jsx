import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StoryNodeContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import BasicTextInput from "../base/BasicTextInput";
import BasicTextarea from "../base/BasicTextarea";
import { H1, H2, TextError } from "../base/textComponents";

export default function AddNodeModal({ addNodeModalVisible, setAddNodeModalVisible }) {
	const { storyNodes, setStoryNodes } = useContext(StoryNodeContext);

	const [titleInput, setTitleInput] = useState("");
	const [bodyInput, setBodyInput] = useState("");
	const [linkForms, setLinkForms] = useState([]);

	const [errors, setErrors] = useState({ title: "", body: "", links: "" });

	useEffect(() => {
		setErrors({ title: "", body: "", links: "" });
	}, [titleInput]);

	// adds another form to link forms
	const addRow = () => {
		setLinkForms([...linkForms, ""]);
	};

	const updateRow = (index, value) => {
		const updated = [...linkForms];
		updated[index] = value;
		setLinkForms(updated);
	};

	const saveNewNode = () => {
		if (!validate()) return;

		const newId = Date.now();

		// Convert bodyInput to array of paragraphs (split by newline)
		const bodyArray =
			bodyInput.trim() === ""
				? null
				: bodyInput.split("\n").map((text, index) => ({ id: index + 1, text }));

		const linkedNodes = linkForms
			.filter((text) => text.trim() !== "")
			.map((text, index) => ({
				id: Date.now(),
				title: text,
				body: null,
				links: [],
				start: false,
			}));

		const linksArray = linkedNodes.map((node) => ({
			id: node.id,
			text: node.title,
			targetId: node.id,
		}));

		const newNode = {
			id: newId,
			title: titleInput,
			body: bodyArray,
			links: linksArray,
			start: false,
		};

		// Add new node to the array
		setStoryNodes([...storyNodes, newNode, ...linkedNodes]);

		// Close modal
		setAddNodeModalVisible(false);

		// Reset inputs
		setTitleInput("");
		setBodyInput("");
		setLinkForms([""]);
	};

	function validate() {
		if (titleInput === "") {
			setErrors((prev) => ({ ...prev, title: "Title cannot be empty" }));
			return false;
		}
		return true;
	}

	return (
		<BasicModal
			isVisible={addNodeModalVisible}
			setIsVisible={setAddNodeModalVisible}
			handleClose={() => setLinkForms([])}
		>
			<H1 style={{ marginBottom: 10 }}>Add New Story Node</H1>

			<View style={{ gap: 5, marginBottom: 10 }}>
				<BasicTextInput
					placeholder={"Title"}
					value={titleInput}
					onChangeText={setTitleInput}
				/>
				{errors.title !== "" && (
					<TextError style={{ marginVertical: 5 }}>{errors.title}</TextError>
				)}
				<BasicTextarea
					placeholder={"Body"}
					value={bodyInput}
					onChangeText={setBodyInput}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "baseline",
						marginVertical: 10,
					}}
				>
					<H2>Links</H2>
					<BasicButton onPress={addRow} type="secondary">
						Add link
					</BasicButton>
				</View>
				{linkForms?.map((link, index) => (
					<View key={index}>
						<BasicTextInput
							placeholder={"Link text"}
							value={link}
							onChangeText={(text) => updateRow(index, text)}
						/>
					</View>
				))}
			</View>

			<BasicButton onPress={saveNewNode} style={{ marginTop: 20 }}>
				Create Node
			</BasicButton>
		</BasicModal>
	);
}
