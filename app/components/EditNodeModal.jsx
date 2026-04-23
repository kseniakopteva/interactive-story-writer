import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { StoryNodeContext } from "../contexts";
import BasicButton from "./base/BasicButton";
import BasicModal from "./base/BasicModal";
import BasicSelect from "./base/BasicSelect";
import BasicTextarea from "./base/BasicTextarea";
import BasicTextInput from "./base/BasicTextInput";

export default function EditNodeModal({
	node,
	isEditNodeModalVisible,
	setIsEditNodeModalVisible,
}) {
	const { storyNodes, setStoryNodes } = useContext(StoryNodeContext);

	const [input, setInput] = useState({
		id: node.id,
		title: node.title,
		body: node.body?.map((paragraph) => paragraph.text).join(`\n`),
		links: node.links,
		start: node.start,
	});

	useEffect(() => {
		if (!isEditNodeModalVisible) return;

		setInput({
			id: node.id,
			title: node.title,
			body: node.body?.map((p) => p.text).join("\n"),
			links: node.links,
			start: node.start,
		});
	}, [node, isEditNodeModalVisible]);

	function handleChange(field, text) {
		setInput((prev) => ({
			...prev,
			[field]: text,
		}));
	}

	// function updateNode(id) {
	// 	const nodesWithClearedStart = input.start
	// 		? storyNodes.map((elem) => ({
	// 				...elem,
	// 				start: false,
	// 			}))
	// 		: storyNodes;

	// 	const updatedNodes = nodesWithClearedStart.map((elem) => {
	// 		if (elem.id === id)
	// 			return {
	// 				id: input.id,
	// 				title: input.title,
	// 				body: input.body.split("\n").map((paragraph, index) => {
	// 					return { id: index + 1, text: paragraph };
	// 				}),
	// 				links: input.links,
	// 				start: input.start,
	// 			};
	// 		else return elem;
	// 	});

	// 	setStoryNodes(updatedNodes);

	// 	setEditNodeModalVisible(false);
	// }
	function updateNode(id) {
		const updatedNodes = storyNodes.map((elem) => ({
			...elem,
			start: elem.id === id ? input.start : false,
		}));

		const finalNodes = updatedNodes.map((elem) =>
			elem.id === id
				? {
						...elem,
						id: input.id,
						title: input.title,
						body: input.body.split("\n").map((paragraph, index) => ({
							id: index + 1,
							text: paragraph,
						})),
						links: input.links,
					}
				: elem,
		);

		setStoryNodes(finalNodes);
		setIsEditNodeModalVisible(false);
	}

	return (
		<BasicModal
			// handleClose={() => {
			// 	setInput(initialInput);
			// }}
			isVisible={isEditNodeModalVisible}
			setIsVisible={setIsEditNodeModalVisible}
		>
			<Text>Title:</Text>
			<View style={{ flexDirection: "row", gap: 5 }}>
				<BasicTextInput
					styles={{ flex: 1 }}
					placeholder={"Title"}
					value={input.title}
					onChangeText={(text) => handleChange("title", text)}
				/>
				<BasicButton
					disabled={input.start ? true : false}
					type={input.start ? "secondary" : "primary"}
					onPress={() => {
						setInput((prev) => ({
							...prev,
							start: true,
						}));
						// setStoryNodes((prev) =>
						// 	prev.map((elem) => ({
						// 		...elem,
						// 		start: false,
						// 	})),
						// );
					}}
				>
					{input.start ? "Already start" : "Make Start"}
				</BasicButton>
			</View>
			<Text>Body:</Text>
			<BasicTextarea
				placeholder={"Body"}
				value={input.body}
				onChangeText={(text) => handleChange("body", text)}
			/>

			<Text
				style={{
					fontSize: 15,
					fontWeight: "bold",
					marginVertical: 5,
				}}
			>
				Links
			</Text>
			{input.links.map((link, index) => {
				const initialTargetNode = storyNodes.find(
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
							styles={{ flex: 1 }}
							value={link.text}
							// onChangeText={handleChange('links')}
							onChangeText={(text) => {
								setInput((prev) => ({
									...prev,
									links: input.links.map((l) =>
										l.id === link.id ? { ...l, text: text } : l,
									),
								}));
							}}
						/>
						<Text> ▶ </Text>
						<BasicSelect
							styles={{ flex: 1 }}
							options={storyNodes.map((elem) => {
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
							Remove
						</BasicButton>
					</View>
				);
			})}
			<BasicButton
				type="secondary"
				onPress={() =>
					setInput((prev) => ({
						...prev,
						links: [
							...prev.links,
							{ id: Date.now(), text: "", targetId: null },
						],
					}))
				}
			>
				Add New Link
			</BasicButton>
			<BasicButton onPress={() => updateNode(node.id)}>Update Node</BasicButton>
		</BasicModal>
	);
}
