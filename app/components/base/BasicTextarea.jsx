import BasicTextInput from "./BasicTextInput";

export default function BasicTextarea({ value, placeholder, onChangeText, props }) {
	return (
		<BasicTextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			editable
			multiline={true}
			numberOfLines={10}
			styles={{
				height: 200,
				textAlignVertical: "top",
			}}
			{...props}
		/>
	);
}
