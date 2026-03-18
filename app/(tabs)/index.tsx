import { useContext, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { StoryNodeContext } from "../contexts";

export default function HomeScreen() {
	const [newNodeModalVisible, setNewNodeModalVisible] = useState(false);

	const [titleInput, setTitleInput] = useState("");
	const [bodyInput, setBodyInput] = useState("");
	const [linkForms, setLinkForms] = useState([""]);

	const updateRow = (index: number, value: string) => {
		const updated = [...linkForms];
		updated[index] = value;
		setLinkForms(updated);
	};

	const addRow = () => {
		setLinkForms([...linkForms, ""]);
	};

	const context = useContext(StoryNodeContext);
	if (!context) return null;

	const { storyNodes, setStoryNodes } = context;

	const saveNewNode = () => {
		// if array has elements, finds the largest and + 1 to it
		const newId =
			storyNodes.length > 0 ? Math.max(...storyNodes.map((n) => n.id)) + 1 : 1;

		// Convert bodyInput to array of paragraphs (split by newline)
		const bodyArray =
			bodyInput.trim() === ""
				? null
				: bodyInput.split("\n").map((text, index) => ({ id: index + 1, text }));

		const linkedNodes = linkForms.map((text, index) => ({
			id: newId + index + 1, // unique ID for each new link node
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
		setNewNodeModalVisible(false);

		// Reset inputs
		setTitleInput("");
		setBodyInput("");
		setLinkForms([""]);
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				margin: 10,
			}}
		>
			{storyNodes.map((node) => (
				<View
					key={node.id}
					style={{
						alignSelf: "stretch",
						backgroundColor: "white",
						boxShadow: "0px 2px 3px rgba(0,0,0,0.05)",
						padding: 10,
						borderRadius: 8,
						marginHorizontal: 5,
						marginTop: 10,
					}}
				>
					<Text
						style={{
							fontWeight: "bold",
						}}
					>
						{node.title}
					</Text>
					{node.body && node.body.length > 0
						? node.body.map((paragraph) => (
								<Text key={paragraph.id}>{paragraph.text}</Text>
							))
						: ""}

					<View
						style={{
							flexDirection: "row",
							gap: 5,
							marginTop: 5,
							minHeight: 15,
							padding: 5,
						}}
					>
						{!Array.isArray(node.links) || !node.links.length ? (
							<Text style={{ fontStyle: "italic" }}>No links...</Text>
						) : (
							node.links.map((link) => (
								<View
									key={link.id}
									style={{
										flex: 1,
										alignSelf: "stretch",
										borderWidth: 1,
										borderColor: "black",
										padding: 5,
									}}
								>
									<Text>
										{link.text}
										<Text style={{ fontWeight: "bold" }}>
											{storyNodes.find(
												(node) => node.id === link.targetId,
											)
												? ""
												: "DOESN'T LEAD ANYWHERE"}
										</Text>
									</Text>
								</View>
							))
						)}
					</View>
				</View>
			))}
			<Text style={{ marginTop: 20 }}>
				... This is it! You should write more of these.
			</Text>

			<Pressable
				style={{
					backgroundColor: "black",
					padding: 10,
					marginHorizontal: 5,
					position: "absolute",
					bottom: 5,
					left: 5,
					borderRadius: 4,
					right: 5,
				}}
				onPress={() => setNewNodeModalVisible(true)}
			>
				<Text style={{ color: "white", textAlign: "center" }}>
					Add New Story Node
				</Text>
			</Pressable>

			<Modal visible={newNodeModalVisible} transparent={true} animationType="none">
				<Pressable
					style={{
						flex: 1,
						justifyContent: "flex-start",
						alignItems: "stretch",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}
					onPress={() => setNewNodeModalVisible(false)} // close modal
				>
					{/* Inner content */}
					<Pressable
						onPress={(e) => e.stopPropagation()} // prevent closing when inner content is clicked
						style={{
							backgroundColor: "white",
							padding: 20,
							borderRadius: 8,
							marginHorizontal: 30,
							marginVertical: 30,
							position: "relative",
						}}
					>
						<ScrollView>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "bold",
									marginBottom: 10,
								}}
							>
								Add New Story Node
							</Text>

							<View style={{ gap: 5, marginBottom: 10 }}>
								<TextInput
									placeholder="Title"
									value={titleInput}
									onChangeText={setTitleInput}
									style={{
										borderWidth: 1,
										borderColor: "black",
										padding: 5,
									}}
								/>
								<TextInput
									placeholder="Body"
									multiline
									numberOfLines={3}
									value={bodyInput}
									onChangeText={setBodyInput}
									style={{
										borderWidth: 1,
										borderColor: "black",
										padding: 5,
									}}
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
								{linkForms.map((link, index) => (
									<View key={index}>
										<TextInput
											placeholder="Link text"
											value={link}
											onChangeText={(text) =>
												updateRow(index, text)
											}
											style={{
												borderWidth: 1,
												borderColor: "black",
												padding: 5,
											}}
										/>
									</View>
								))}
							</View>

							<Pressable
								onPress={addRow}
								style={{
									padding: 5,
									backgroundColor: "lightgrey",
									borderWidth: 1,
									borderColor: "grey",
									borderRadius: 8,
									marginBottom: 5,
								}}
							>
								<Text style={{ textAlign: "center" }}>
									+ Add another item
								</Text>
							</Pressable>
						</ScrollView>

						<Pressable
							onPress={saveNewNode}
							style={{
								padding: 10,
								backgroundColor: "black",
								borderRadius: 5,
								marginTop: 10,
							}}
						>
							<Text style={{ color: "white", textAlign: "center" }}>
								Submit
							</Text>
						</Pressable>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
}
