import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { StoryNodeContext } from "../../contexts";
import BasicButton from "../base/BasicButton";
import BasicModal from "../base/BasicModal";
import BasicSelect from "../base/BasicSelect";
import BasicTextarea from "../base/BasicTextarea";
import BasicTextInput from "../base/BasicTextInput";
import { H1, H2, TextBold, TextSubtle } from "../base/textComponents";

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

	const [startPressed, setStartPressed] = useState(false);

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

	function updateNode(id) {
		setStartPressed(false);

		const updatedNodes = storyNodes.map((elem) => ({
			...elem,
			start: elem.id === id ? input.start : false,
		}));

		const finalNodes = updatedNodes.map((elem) =>
			elem.id === id
				? {
						id: input.id,
						title: input.title,
						body: input.body.split("\n").map((paragraph, index) => ({
							id: index + 1,
							text: paragraph,
						})),
						links: input.links,
						start: input.start,
					}
				: elem,
		);

		setStoryNodes(finalNodes);
		setIsEditNodeModalVisible(false);
	}

	return (
		<BasicModal
			isVisible={isEditNodeModalVisible}
			setIsVisible={setIsEditNodeModalVisible}
			handleClose={() => setStartPressed(false)}
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
							if (!input.start) setStartPressed(true);
						}}
					>
						{input.start ? "Story starts here" : "Make story start here"}
					</BasicButton>
					{startPressed ? (
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
			<TextBold style={{ fontSize: 16, marginVertical: 5, marginTop: 10 }}>
				Title
			</TextBold>
			<BasicTextInput
				label={"Title"}
				placeholder={"Title"}
				value={input.title}
				onChangeText={(text) => handleChange("title", text)}
			/>
			<TextBold style={{ fontSize: 16, marginVertical: 5, marginTop: 10 }}>
				Body
			</TextBold>
			<BasicTextarea
				placeholder={"Body"}
				value={input.body}
				onChangeText={(text) => handleChange("body", text)}
				label={"Body"}
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
					Add link
				</BasicButton>
			</View>

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
							✖
						</BasicButton>
					</View>
				);
			})}

			<BasicButton onPress={() => updateNode(node.id)} style={{ marginTop: 20 }}>
				Save changes
			</BasicButton>
			<TextSubtle style={{ textAlign: "center", marginTop: 10 }}>
				Dont forget to save your changes!
			</TextSubtle>
		</BasicModal>
	);
}
