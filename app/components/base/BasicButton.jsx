import { Pressable, Text } from "react-native";

export default function BasicButton({ type = "primary", onPress, children, styles }) {
	const typeSpecificPressableStyles =
		type === "primary"
			? {
					backgroundColor: "black",
				}
			: {
					backgroundColor: "lightgrey",
				};

	const typeSpecificTextStyles = type === "primary" ? { color: "white" } : {};

	return (
		<Pressable
			style={{
				padding: 10,
				borderRadius: 5,
				// marginTop: 10,
				...typeSpecificPressableStyles,
				...styles,
			}}
			onPress={onPress}
		>
			<Text style={{ ...typeSpecificTextStyles, textAlign: "center" }}>
				{children}
			</Text>
		</Pressable>
	);
}
