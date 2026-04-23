import { TextInput } from "react-native";

export default function BasicTextInput({
	value,
	onChangeText,
	placeholder,
	styles,
	...props
}) {
	return (
		<TextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			style={{
				borderWidth: 1,
				borderRadius: 5,
				borderColor: "#aaa",
				padding: 5,
				...styles,
			}}
			{...props}
		/>
	);
}
