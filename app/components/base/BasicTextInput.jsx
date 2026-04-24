import { StyleSheet, TextInput } from "react-native";
import { colors, fonts } from "../../../assets/theme";

export default function BasicTextInput({
	value,
	onChangeText,
	placeholder,
	style,
	...props
}) {
	return (
		<TextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			style={{
				// flex: 1,
				borderWidth: 1,
				borderRadius: 5,
				borderColor: "#aaa",
				padding: 10,
				...styles.text,
				...style,
			}}
			{...props}
		/>
	);
}
const styles = StyleSheet.create({
	text: {
		fontFamily: fonts.fontParagraph,
		fontSize: 13,
		color: colors.text,
	},
});
