import { Modal, Pressable } from "react-native";

export default function BasicModal({
	isVisible,
	setIsVisible,
	handleClose = () => {},
	children,
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
					backgroundColor: "rgba(0,0,0,0.5)",
				}}
				onPress={onClose} // close modal
			>
				<Pressable
					onPress={(e) => e.stopPropagation()} // prevent closing when inner content is clicked
					style={{
						backgroundColor: "white",
						padding: 20,
						borderRadius: 8,
						marginHorizontal: 30,
						marginVertical: 30,
						position: "relative",
					}}
				>
					{children}
				</Pressable>
			</Pressable>
		</Modal>
	);
}
