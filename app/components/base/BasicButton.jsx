import { colors, fonts, sizes } from "@/assets/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export default function BasicButton({ type = "primary", onPress, children, style }) {
	const typeSpecificPressableStyles =
		type === "primary"
			? styles.buttonPrimary
			: type === "secondary"
				? styles.buttonSecondary
				: type === "danger"
					? styles.buttonDanger
					: {};

	const typeSpecificTextStyles =
		type === "primary"
			? styles.textPrimary
			: type === "secondary"
				? styles.textSecondary
				: type === "danger"
					? styles.textDanger
					: {};

	return (
		<Pressable
			style={{
				padding: 10,
				borderRadius: sizes.buttonBorderRadius,
				...typeSpecificPressableStyles,
				...style,
			}}
			onPress={onPress}
		>
			<Text
				style={{
					...typeSpecificTextStyles,
					textAlign: "center",
				}}
			>
				{children}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonPrimary: {
		backgroundColor: colors.primary,
	},
	buttonSecondary: {
		backgroundColor: colors.secondary,
	},
	buttonDanger: { backgroundColor: colors.danger },
	textPrimary: { color: "white", fontFamily: fonts.fontParagraph },
	textSecondary: { fontFamily: fonts.fontParagraph },
	textDanger: { color: "white", fontFamily: fonts.fontParagraphBold },
});
