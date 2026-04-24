import { Modal, Pressable } from "react-native";
import { sizes } from "../../../assets/theme";

export default function BasicModal({
	isVisible,
	setIsVisible,
	handleClose = () => {},
	children,
	style,
}) {
	function onClose() {
		handleClose();
		setIsVisible(false);
	}

	return (
		<Modal visible={isVisible} transparent={true}>
			<Pressable
				style={{
					flex: 1,
					justifyContent: "flex-start",
					alignItems: "stretch",
					backgroundColor: "rgba(0, 3, 37, 0.5)",
				}}
				onPress={onClose} // close modal
			>
				<Pressable
					onPress={(e) => e.stopPropagation()} // prevent closing when inner content is clicked
					style={{
						backgroundColor: "white",
						padding: sizes.modalPadding,
						borderRadius: sizes.borderRadius,
						margin: sizes.modalMargin,
						position: "relative",
						...style,
					}}
				>
					{children}
				</Pressable>
			</Pressable>
		</Modal>
	);
}
