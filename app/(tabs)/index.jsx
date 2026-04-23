import { useState } from "react";
import { ScrollView, Text } from "react-native";
import AddNodeModal from "../components/AddNodeModal";
import StoryNodeList from "../components/StoryNodeList";
import BasicButton from "../components/base/BasicButton";

export default function HomeScreen() {
	const [addNodeModalVisible, setAddNodeModalVisible] = useState(false);

	return (
		<>
			<ScrollView
				contentContainerStyle={{
					// alignItems: "center",
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
				styles={{
					marginHorizontal: 5,
					position: "absolute",
					bottom: 5,
					left: 5,
					right: 5,
				}}
			>
				Add New Story Node
			</BasicButton>
		</>
	);
}
