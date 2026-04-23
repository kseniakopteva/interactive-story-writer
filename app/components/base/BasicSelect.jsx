import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function BasicSelect({
	initialSelected = null,
	options,
	onSelect,
	styles,
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
					borderWidth: 1,
					borderRadius: 5,
					borderColor: "#aaa",
					padding: 5,
					...styles,
				}}
			>
				<Text>{selected?.text || "Select an option"}</Text>
			</Pressable>

			<Modal visible={isSelectVisible} transparent animationType="fade">
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						marginBottom: 10,
						// backgroundColor: "rgba(0,0,0,0.3)",
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
							backgroundColor: "white",
							borderRadius: 8,
							padding: 10,
							elevation: 5,
						}}
					>
						<FlatList
							data={options}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<Pressable
									style={{ padding: 12 }}
									onPress={() => handleSelect(item)}
								>
									<Text>{item.text}</Text>
								</Pressable>
							)}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}
