import { useContext, useState } from "react";
import { PixelRatio, View } from "react-native";
import { colors } from "../../assets/theme";
import BasicButton from "../components/base/BasicButton";
import BasicPanel from "../components/base/BasicPanel";
import { StoryNodeContext } from "../contexts";
import { H1, H2, TextBold, TextRegular, TextSubtle } from "./base/textComponents";
import DeletionConfirmationModal from "./modals/DeletionConfirmationModal";
import EditNodeModal from "./modals/EditNodeModal";

export default function StoryNodeListItem({ node }) {
	const { storyNodes, setStoryNodes } = useContext(StoryNodeContext);

	const [isEditNodeModalVisible, setIsEditNodeModalVisible] = useState(false);
	const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);

	const startNodeStyle = node.start
		? { borderColor: colors.primary, borderWidth: 2, borderStyle: "dotted" }
		: "";


  const isLargeText = PixelRatio.getFontScale() > 1.2;
	
	return (
		<BasicPanel style={{ ...startNodeStyle }}>
			<View
				style={{
					flexDirection: isLargeText ? 'column' : 'row',
					alignItems: "flex-start",
					justifyContent: "space-between",
				}}
			>
				<H1 style={{  flexShrink: 1, marginBottom: 10 }}>{node.title} </H1>
				<View style={{ flexDirection: "row", gap: 5}}>
					<BasicButton
						type="secondary"
						onPress={() => setIsDeletionModalVisible(true)}
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
			<View style={{ marginBottom: 10 }}>
				{node.body && node.body.length > 0 ? (
					node.body.map((paragraph) => (
						<TextRegular key={paragraph.id}>{paragraph.text}</TextRegular>
					))
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
						const linkTargetNode = storyNodes.find(
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
			<DeletionConfirmationModal
				node={node}
				isDeletionModalVisible={isDeletionModalVisible}
				setIsDeletionModalVisible={setIsDeletionModalVisible}
			></DeletionConfirmationModal>
		</BasicPanel>
	);
}
