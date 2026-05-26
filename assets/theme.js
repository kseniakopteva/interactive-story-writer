import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();

export const colors = {
	primary: "#006263",
	secondary: "#CCDFE0",

	danger: "#AF123B",
	alert: "#f9c753",

	background: "#e9ecf1",
	backgroundDark: "#CCDFE0",

	text: "#262626",
	textLight: "#e9ecf1",
	heading: "#010e54",
	textSubtle: "#9cb1c5",
};

// #093569
// #006263
// #e9ecf1
// #f6f7f9
// #73489c
// #262626
// #000000

// #214977
// #537296
// #4C9192
// #CCDFE0
// #F0F0F0
// #9E7FBA
// #AF123B
// #F68B32

export const fonts = {
	fontHeading: "SourceSans3_700Bold",
	fontParagraph: "Sintony_400Regular",
	fontParagraphBold: "Sintony_700Bold",
};

export const sizes = {
	screenMargin: 15 * fontScale,
	modalMargin: 30,

	panelPadding: 10 * fontScale,
	modalPadding: 20,

	borderRadius: 8 * fontScale,
	buttonBorderRadius: 5 * fontScale,

	textH1: 21,
	textH2: 19,
	textH3: 16,
	textRegular: 14,
};
