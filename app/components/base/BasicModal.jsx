import { Modal, Pressable, ScrollView } from "react-native";
import { sizes } from "../../../assets/theme";
import BasicButton from "./BasicButton";

export default function BasicModal({
	isVisible,
	setIsVisible,
	handleClose = () => {},
	children,
	showCancelButton = false,
	style,
}) {
	function onClose() {
		handleClose();
		setIsVisible(false);
	}

	return (
		<Modal visible={isVisible} transparent={true} animationType="fade">
			<Pressable
				style={{
					flex: 1,
					justifyContent: "flex-start",
					alignItems: "stretch",
					backgroundColor: "rgba(0, 3, 37, 0.5)",
				}}
				onPress={onClose} // close modal
			>
				<ScrollView>
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
						{showCancelButton ? (
							<BasicButton
								type="secondary"
								style={{ marginTop: 10 }}
								onPress={onClose}
							>
								Cancel
							</BasicButton>
						) : (
							<></>
						)}
					</Pressable>
				</ScrollView>
			</Pressable>
		</Modal>
	);
}
