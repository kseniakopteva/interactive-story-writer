import BasicTextInput from "./BasicTextInput";

export default function BasicTextarea({
	value,
	placeholder,
	onChangeText,
	props,
	style,
}) {
	return (
		<BasicTextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			editable
			multiline={true}
			numberOfLines={10}
			style={{
				height: 200,
				textAlignVertical: "top",
				...style,
			}}
			{...props}
		/>
	);
}
