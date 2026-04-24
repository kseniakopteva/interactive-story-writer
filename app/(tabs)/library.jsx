import { Text, View } from "react-native";
import { colors, fonts } from "../../assets/theme";

export default function LibraryScreen() {
	return (
		<View style={{ backgroundColor: colors.background, flex: 1 }}>
			<Text
				style={{
					textAlign: "center",
					fontFamily: fonts.fontParagraphBold,
					color: colors.primary,
					margin: 40,
					fontSize: 17,
				}}
			>
				Coming soon...
			</Text>
		</View>
	);
}
