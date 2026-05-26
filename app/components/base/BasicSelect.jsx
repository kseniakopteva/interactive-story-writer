import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, sizes } from "../../../assets/theme";
import BasicButton from "./BasicButton";
import { TextRegular } from "./textComponents";

export default function BasicSelect({
	initialSelected = null,
	options,
	onSelect,
	style,
}) {
	const [selected, setSelected] = useState(initialSelected ?? null);
	const [isSelectVisible, setIsSelectVisible] = useState(false);

	function handleSelect(item) {
		setSelected(item);
		setIsSelectVisible(false);
		onSelect?.(item);
	}

	return (
		<View>
			{/* the visible button with selected option */}
			<Pressable
				onPress={() => setIsSelectVisible(true)}
				style={{
					// borderWidth: 1,
					borderRadius: 5,
					// borderColor: "#aaa",
					backgroundColor: colors.secondary,
					// padding: 5,
					...style,
				}}
			>
				<TextRegular style={{ padding: 10 }}>
					{selected?.text || "Select an option"} ▼
				</TextRegular>
			</Pressable>

			<Modal visible={isSelectVisible} transparent animationType="fade">
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						marginBottom: 10,
						backgroundColor: "rgba(0, 3, 37, 0.5)",
					}}
				>
					{/* background click catcher */}
					<Pressable
						style={StyleSheet.absoluteFill}
						onPress={() => setIsSelectVisible(false)}
					/>

					{/* the list */}
					<View
						style={{
							marginHorizontal: 20,
							marginVertical: "auto",
							backgroundColor: "white",
							borderRadius: sizes.borderRadius,
							padding: 20,
							elevation: 5,
						}}
					>
						<TextRegular>
							Choose the node you want this link to point to:
						</TextRegular>
						<FlatList
							data={options}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<BasicButton
									style={{ marginTop: 5 }}
									onPress={() => handleSelect(item)}
								>
									<Text>{item.text}</Text>
								</BasicButton>
							)}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}
