import { useContext, useState } from "react";
import { PixelRatio, View } from "react-native";
import { colors } from "../../assets/theme";
import BasicButton from "../components/base/BasicButton";
import BasicPanel from "../components/base/BasicPanel";
import { StoryContext } from "../contexts";
import { H1, H2, TextBold, TextRegular, TextSubtle } from "./base/textComponents";
import DeleteNodeConfirmationModal from "./modals/DeleteNodeConfirmationModal";
import EditNodeModal from "./modals/EditNodeModal";

export default function StoryNodeListItem({ node }) {
	const { getCurrentStoryNodes } = useContext(StoryContext);

	const currentStoryNodes = getCurrentStoryNodes();

	const [isEditNodeModalVisible, setIsEditNodeModalVisible] = useState(false);
	const [isDeleteNodeModalVisible, setIsDeleteNodeModalVisible] = useState(false);

	const startNodeStyle = node.start
		? { borderColor: colors.primary, borderWidth: 2, borderStyle: "dotted" }
		: "";

	const isLargeText = PixelRatio.getFontScale() > 1.2;

	const fullText = node.body?.map((paragraph) => paragraph.text).join(`\n`);
	const sliceResult = fullText?.slice(0, 250);
	const excerpt = sliceResult === fullText ? fullText : sliceResult + " ...";

	return (
		<BasicPanel style={{ ...startNodeStyle }}>
			<View
				style={{
					flexDirection: isLargeText ? "column" : "row",
					alignItems: "flex-start",
					justifyContent: "space-between",
				}}
			>
				<H1 style={{ flexShrink: 1, marginBottom: 10 }}>{node.title} </H1>
				<View style={{ flexDirection: "row", gap: 5 }}>
					<BasicButton
						type="secondary"
						onPress={() => setIsDeleteNodeModalVisible(true)}
					>
						Remove
					</BasicButton>
					<BasicButton
						type="primary"
						onPress={() => setIsEditNodeModalVisible(true)}
					>
						Edit Node
					</BasicButton>
				</View>
			</View>
			<View style={{ marginVertical: 10 }}>
				{node.body && node.body.length > 0 ? (
					<TextRegular>{excerpt}</TextRegular>
				) : (
					<TextSubtle>No text...</TextSubtle>
				)}
			</View>
			<View>
				<H2>Links</H2>
				{!Array.isArray(node.links) || !node.links.length ? (
					<TextSubtle>No links...</TextSubtle>
				) : (
					node.links.map((link) => {
						const linkTargetNode = currentStoryNodes.find(
							(node) => node.id === link.targetId,
						);
						return (
							<View key={link.id} style={{ flexDirection: "row" }}>
								<TextRegular>&quot;{link.text}&quot;</TextRegular>
								<TextBold>
									{linkTargetNode
										? ` ▶ ${linkTargetNode.title}`
										: " ▶ "}
								</TextBold>
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
			<DeleteNodeConfirmationModal
				node={node}
				isDeleteNodeModalVisible={isDeleteNodeModalVisible}
				setIsDeleteNodeModalVisible={setIsDeleteNodeModalVisible}
			></DeleteNodeConfirmationModal>
		</BasicPanel>
	);
}
