import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { StoryContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import BasicSelect from "../base/BasicSelect";
import BasicTextarea from "../base/BasicTextarea";
import BasicTextInput from "../base/BasicTextInput";
import { H1, H3, TextError, TextSubtle } from "../base/textComponents";

export default function EditNodeModal({
	node,
	isEditNodeModalVisible,
	setIsEditNodeModalVisible,
}) {
	const INITIAL_INPUT = {
		id: node.id,
		title: node.title,
		body: node.body?.map((paragraph) => paragraph.text).join(`\n`),
		links: node.links,
		createdLinks: [],
		start: node.start,
	};

	const { currentStoryId, updateNode, addNodes, getCurrentStoryNodes } =
		useContext(StoryContext);
	const [input, setInput] = useState(INITIAL_INPUT);
	const [errors, setErrors] = useState({ title: "" });

	const currentStoryNodes = getCurrentStoryNodes();

	// did user press the "set as start" button?
	// used to display the "don't forget to save!" text
	const [wasStartPressed, setWasStartPressed] = useState(false);

	// without this, when changing stories, the modal will show the
	// previous node opened
	useEffect(() => {
		setInput({
			id: node.id,
			title: node.title,
			body: node.body?.map((paragraph) => paragraph.text).join("\n"),
			links: node.links,
			createdLinks: [],
			start: node.start,
		});
	}, [node, isEditNodeModalVisible]);

	// remove errors when the user is (supposedly) fixing them
	useEffect(() => {
		setErrors((prev) => ({ ...prev, title: "" }));
	}, [input.title]);

	// reset on modal close
	function onClose() {
		setInput(INITIAL_INPUT);
		setWasStartPressed(false);
	}

	function handleChange(field, text) {
		setInput((prev) => ({
			...prev,
			[field]: text,
		}));
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

	function updateNodeLocal(id) {
		if (!validate()) return;

		// reset
		setWasStartPressed(false);

		// new links
		const linkedNodes = input.createdLinks
			.filter((link) => link.text.trim() !== "")
			.map((link, index) => ({
				id: Date.now() + index,
				title: link.text,
				body: null,
				links: [],
				start: false,
			}));

		const linksArray = linkedNodes.map((node) => ({
			id: node.id,
			text: node.title,
			targetId: node.id,
		}));
		// end new links
		
		updateNode(currentStoryId, node.id, {
			title: input.title,
			body: input.body?.split("\n").map((paragraph, index) => ({
				id: index + 1,
				text: paragraph,
			})),
			links: [...input.links, ...linksArray],
			start: input.start,
		});
		addNodes(currentStoryId, ...linkedNodes);

		setIsEditNodeModalVisible(false);
	}

	return (
		<BasicModal
			isVisible={isEditNodeModalVisible}
			setIsVisible={setIsEditNodeModalVisible}
			handleClose={onClose}
			showCancelButton={true}
		>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<H1 style={{ marginBottom: 10 }}>Edit Story Node</H1>
				<View style={{ flexDirection: "column", alignItems: "center" }}>
					<BasicButton
						disabled={input.start ? true : false}
						type={input.start ? "secondary" : "primary"}
						onPress={() => {
							setInput((prev) => ({
								...prev,
								start: true,
							}));
							if (!input.start) setWasStartPressed(true);
						}}
					>
						{input.start ? "Story starts here" : "Make story start here"}
					</BasicButton>
					{wasStartPressed ? (
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
			<H3 style={{ marginVertical: 5, marginTop: 10 }}>Title</H3>
			<BasicTextInput
				label={"Title"}
				placeholder={"Title"}
				value={input.title}
				onChangeText={(text) => handleChange("title", text)}
			/>
			{errors.title !== "" ? (
				<TextError style={{ marginVertical: 5 }}>{errors.title}</TextError>
			) : (
				<></>
			)}
			<H3 style={{ marginVertical: 5, marginTop: 10 }}>Body</H3>
			<BasicTextarea
				placeholder={"Body"}
				value={input.body}
				onChangeText={(text) => handleChange("body", text)}
				label={"Body"}
				numberOfLines={20}
				style={{
					height: 330,
				}}
			/>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "baseline",
					marginVertical: 10,
				}}
			>
				<H3>Links</H3>
				<BasicButton
					type="secondary"
					onPress={() =>
						setInput((prev) => ({
							...prev,
							createdLinks: [
								...prev.createdLinks,
								{ id: Date.now(), text: "", targetId: null },
							],
						}))
					}
				>
					Add link
				</BasicButton>
			</View>

			{input.links.map((link, index) => {
				const initialTargetNode = currentStoryNodes.find(
					(node) => node.id === link.targetId,
				);

				return (
					<View
						key={index}
						style={{
							gap: 5,
							marginBottom: 10,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<BasicTextInput
							style={{ flex: 1 }}
							value={link.text}
							onChangeText={(text) => {
								setInput((prev) => ({
									...prev,
									links: input.links.map((l) =>
										l.id === link.id ? { ...l, text: text } : l,
									),
								}));
							}}
						/>
						<Text>▶</Text>
						<BasicSelect
							options={currentStoryNodes.map((elem) => {
								return { id: elem.id, text: elem.title };
							})}
							initialSelected={
								initialTargetNode
									? {
											id: initialTargetNode.id,
											text: initialTargetNode.title,
										}
									: null
							}
							onSelect={(selected) => {
								setInput((prev) => ({
									...prev,
									links: prev.links.map((l) =>
										l.id === link.id
											? { ...l, targetId: selected.id }
											: l,
									),
								}));
							}}
						/>
						<BasicButton
							onPress={() => {
								setInput((prev) => ({
									...prev,
									links: input.links.filter((l) => l.id !== link.id),
								}));
							}}
						>
							✖
						</BasicButton>
					</View>
				);
			})}

			{input.createdLinks?.map((createdLink, index) => {
				return (
					<View
						key={index}
						style={{
							gap: 5,
							marginBottom: 10,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<BasicTextInput
							style={{ flex: 1 }}
							value={createdLink.text}
							onChangeText={(text) => {
								setInput((prev) => ({
									...prev,
									createdLinks: input.createdLinks.map((l) =>
										l.id === createdLink.id
											? { ...l, text: text }
											: l,
									),
								}));
							}}
						/>
					</View>
				);
			})}

			<TextSubtle style={{ textAlign: "center", marginTop: 10 }}>
				Dont forget to save your changes!
			</TextSubtle>
			<BasicButton
				onPress={() => updateNodeLocal(node.id)}
				style={{ marginTop: 10 }}
			>
				Save changes
			</BasicButton>
		</BasicModal>
	);
}
