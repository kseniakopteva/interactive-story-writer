import { sizes } from "@/assets/theme";
import { View } from "react-native";

export default function BasicPanel({
	children,
	padding = sizes.panelPadding,
	backgroundColor = "white",
	style,
}) {
	return (
		<View
			style={{
				alignSelf: "stretch",
				backgroundColor: backgroundColor,
				boxShadow: "0px 2px 3px rgba(0,0,0,0.05)",
				padding: padding,
				borderRadius: sizes.borderRadius,
				...style,
			}}
		>
			{children}
		</View>
	);
}
