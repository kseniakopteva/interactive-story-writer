import { useContext, useState } from "react";
import { Text, View } from "react-native";
import BasicButton from "../components/base/BasicButton";
import EditNodeModal from "../components/EditNodeModal";
import { StoryNodeContext } from "../contexts";
import DeletionConfirmationModal from "./DeletionConfirmationModal";

export default function StoryNodeListItem({ node }) {
	const { storyNodes, setStoryNodes } = useContext(StoryNodeContext);

	const [isEditNodeModalVisible, setIsEditNodeModalVisible] = useState(false);
	const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);

	const startNodeStyle = node.start ? { borderColor: "#aaa", borderWidth: 1 } : "";

	return (
		<View
			style={{
				alignSelf: "stretch",
				backgroundColor: "white",
				boxShadow: "0px 2px 3px rgba(0,0,0,0.05)",
				padding: 10,
				borderRadius: 8,
				marginHorizontal: 10,
				...startNodeStyle,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-start",
					justifyContent: "space-between",
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 18,
					}}
				>
					{node.title}
				</Text>
				<View style={{ flexDirection: "row", gap: 5 }}>
					<BasicButton onPress={() => setIsDeletionModalVisible(true)}>
						Remove
					</BasicButton>
					<BasicButton
						type="secondary"
						onPress={() => setIsEditNodeModalVisible(true)}
					>
						Edit Node
					</BasicButton>
				</View>
			</View>
			<View style={{ marginBottom: 10 }}>
				{node.body && node.body.length > 0
					? node.body.map((paragraph) => (
							<Text key={paragraph.id}>{paragraph.text}</Text>
						))
					: ""}
			</View>
			<View
				style={{
					gap: 5,
					paddingVertical: 5,
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
					}}
				>
					Links
				</Text>
				{!Array.isArray(node.links) || !node.links.length ? (
					<Text style={{ fontStyle: "italic", color: "#aaa" }}>
						No links...
					</Text>
				) : (
					node.links.map((link) => {
						const linkTargetNode = storyNodes.find(
							(node) => node.id === link.targetId,
						);
						return (
							<View key={link.id}>
								<Text>
									&quot;{link.text}&quot;
									<Text style={{ fontWeight: "bold" }}>
										{linkTargetNode
											? ` ▶ ${linkTargetNode.title}`
											: "DOESN'T LEAD ANYWHERE"}
									</Text>
								</Text>
							</View>
						);
					})
				)}
			</View>

			<EditNodeModal
				node={node}
				isEditNodeModalVisible={isEditNodeModalVisible}
				setIsEditNodeModalVisible={setIsEditNodeModalVisible}
			/>
			<DeletionConfirmationModal
				node={node}
				isDeletionModalVisible={isDeletionModalVisible}
				setIsDeletionModalVisible={setIsDeletionModalVisible}
			></DeletionConfirmationModal>
		</View>
	);
}
