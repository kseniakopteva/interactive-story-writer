import { useState } from "react";
import { ImageBackground, ScrollView } from "react-native";
import { colors, sizes } from "../../assets/theme";
import BasicButton from "../components/base/BasicButton";
import AddNodeModal from "../components/modals/AddNodeModal";
import StoryNodeList from "../components/StoryNodeList";

export default function EditorScreen() {
	const [addNodeModalVisible, setAddNodeModalVisible] = useState(false);

	return (
		<ImageBackground
			source={require("../../assets/images/bg_transparent.png")}
			resizeMode="repeat"
			style={{ flex: 1, backgroundColor: colors.background }}
		>
			<ScrollView
				style={{}}
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				<StoryNodeList />
				<AddNodeModal
					addNodeModalVisible={addNodeModalVisible}
					setAddNodeModalVisible={setAddNodeModalVisible}
				/>
			</ScrollView>
			<BasicButton
				onPress={() => setAddNodeModalVisible(true)}
				style={{
					position: "absolute",
					bottom: sizes.screenMargin,
					left: sizes.screenMargin,
					right: sizes.screenMargin,
				}}
			>
				Add New Story Node
			</BasicButton>
		</ImageBackground>
	);
}
