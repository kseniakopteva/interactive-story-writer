import { colors } from "../../assets/theme";
import BasicPanel from "./base/BasicPanel";
import { TextRegular } from "./base/textComponents";

export default function ErrorBanner({ children, style }) {
	return (
		<BasicPanel style={{ ...style, backgroundColor: colors.alert }}>
			<TextRegular style={{ textAlign: "center" }}>{children}</TextRegular>
		</BasicPanel>
	);
}
