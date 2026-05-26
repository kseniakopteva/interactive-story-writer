import { StyleSheet, Text } from "react-native";
import { colors, fonts, sizes } from "../../../assets/theme";

export function Title({ children, style }) {
	return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
}

export function H1({ children, style }) {
	return <Text style={{ ...styles.h1, ...style }}>{children}</Text>;
}

export function H2({ children, style, accent }) {
	return (
		<Text
			style={
				accent ? { ...styles.h2Special, ...style } : { ...styles.h2, ...style }
			}
		>
			{children}
		</Text>
	);
}

export function H3({ children, style }) {
	return <Text style={{ ...styles.h3, ...style }}>{children}</Text>;
}

export function TextRegular({ children, sizeMultiplier = 1, style }) {
	return (
		<Text
			style={{
				...styles.text,
				fontSize: styles.text.fontSize * sizeMultiplier,
				...style,
			}}
		>
			{children}
		</Text>
	);
}

export function TextBold({ children, style }) {
	return <Text style={{ ...styles.textBold, ...style }}>{children}</Text>;
}

export function TextSubtle({ children, style }) {
	return <Text style={{ ...styles.textSubtle, ...style }}>{children}</Text>;
}

export function TextError({ children, style }) {
	return <Text style={{ ...styles.textError, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
	title: {
		fontSize: 45,
		fontFamily: fonts.fontHeading,
		color: colors.heading,
	},
	h1: {
		fontFamily: fonts.fontHeading,
		fontSize: sizes.textH1,
		color: colors.heading,
		// fontSize: 20,
		// fontFamily: fontParagraphBold,
		// color: colors.heading,
	},
	h2: {
		// fontFamily: fontParagraphBold,
		// fontSize: 17,
		// color: colors.primary,
		// marginBottom: 10,
		fontFamily: fonts.fontHeading,
		fontSize: sizes.textH2,
		paddingBottom: 7,
		color: colors.heading,
	},
	h3: {
		fontFamily: fonts.fontParagraphBold,
		fontSize: sizes.textH3,
		paddingBottom: 7,
		color: colors.primary,
	},
	text: {
		fontFamily: fonts.fontParagraph,
		fontSize: sizes.textRegular,
		color: colors.text,
	},
	textBold: {
		fontFamily: fonts.fontParagraphBold,
		// color: colors.text,
		// fontSize: 13,
		color: colors.primary,
	},
	textSubtle: {
		fontFamily: fonts.fontParagraph,
		color: colors.textSubtle,
	},
	textError: {
		color: colors.danger,
		fontFamily: fonts.fontParagraphBold,
	},
});
