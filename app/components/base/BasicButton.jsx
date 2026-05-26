import { colors, fonts, sizes } from "@/assets/theme";
import { Pressable, StyleSheet, Text } from "react-native";
export default function BasicButton({
	disabled,
	type = "primary",
	onPress,
	children,
	style,
}) {
	const typeSpecificPressableStyles =
		disabled || type === "disabled"
			? styles.buttonDisabled
			: type === "primary"
				? styles.buttonPrimary
				: type === "secondary"
					? styles.buttonSecondary
					: type === "danger"
						? styles.buttonDanger
						: {};

	const typeSpecificTextStyles =
		disabled || type === "disabled"
			? styles.textDisabled
			: type === "primary"
				? styles.textPrimary
				: type === "secondary"
					? styles.textSecondary
					: type === "danger"
						? styles.textDanger
						: {};

	return (
		<Pressable
			disabled={disabled}
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
	buttonDisabled: { backgroundColor: colors.textLight },
	textPrimary: { color: "white", fontFamily: fonts.fontParagraph },
	textSecondary: { color: colors.primary, fontFamily: fonts.fontParagraph },
	textDanger: { color: "white", fontFamily: fonts.fontParagraphBold },
	textDisabled: { color: colors.textSubtle, fontFamily: fonts.fontParagraph },
});
