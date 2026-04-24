import { colors, sizes } from "@/assets/theme";
import { ScrollView, View } from "react-native";
import BasicPanel from "../components/base/BasicPanel";
import {
	H1,
	H3,
	TextBold,
	TextRegular,
	TextSubtle,
	Title,
} from "../components/base/textComponents";

export default function HomeScreen() {
	return (
		<ScrollView style={{ backgroundColor: colors.background }}>
			<Title style={{ marginTop: 20, textAlign: "center" }}>Welcome!</Title>
			<H3 style={{ textAlign: "center" }}>It is so nice to see you :)</H3>
			<BasicPanel style={{ margin: sizes.screenMargin }}>
				<H1>Quick introduction to the app</H1>
				<TextRegular
					style={{ marginTop: 10, fontSize: sizes.textRegular * 1.05 }}
				>
					To edit your story, go to the <TextBold>&quot;Editor&quot;</TextBold>{" "}
					tab.
					{"\n\n"}
					To view your current story go to the{" "}
					<TextBold>&quot;Story&quot;</TextBold> tab.
					{"\n\n"}
					Go to the <TextBold>&quot;Library&quot;</TextBold> to choose what
					stories to read/edit.{" "}
					<TextSubtle>(Not available currently, but coming soon!)</TextSubtle>
				</TextRegular>
			</BasicPanel>
			<BasicPanel
				style={{
					marginHorizontal: sizes.screenMargin,
					marginBottom: sizes.screenMargin,
				}}
			>
				<H1>How to use the Editor</H1>
				<H3 style={{ marginTop: 20 }}>What is a node?</H3>
				<TextRegular>
					A node is a story &quot;chapter&quot; that has a body of text and
					links to other such story points. For example:
				</TextRegular>
				<View
					style={{
						borderWidth: 1,
						borderRadius: 14,
						borderColor: colors.textSubtle,
						backgroundColor: "#f6f7f9",
						padding: 10,
						margin: 20,
						boxShadow: "0px 2px 3px rgba(0,0,0,0.05)",
					}}
				>
					<TextRegular style={{ color: "#537296" }}>
						You are standing in a flower field. You feel a gentle breeze on
						your skin. There is a small wooden cabin nearby.
					</TextRegular>
					<TextBold style={{ marginTop: 15 }}>&gt; Enter the cabin</TextBold>
					<TextBold style={{ marginTop: 5 }}>
						&gt; Enjoy the weather a bit more
					</TextBold>
				</View>
				<H3
				// style={{ marginTop: 20 }}
				>
					Creating a node
				</H3>
				<TextRegular>
					Click the button <TextBold>&quot;Add New Story Node&quot;</TextBold>{" "}
					at the bottom! Enter the title of the node (only you can see it, it
					identifies the node amongst others), the body (the text that will be
					shown to the reader) and add links to other nodes. The links you enter
					will create nodes with the according titles. If you wish to change
					where they &quot;point&quot; later, you can do that in the{" "}
					<TextBold>&quot;Edit the Story Node&quot;</TextBold> window (see{" "}
					<TextBold>&quot;Editing node&quot;</TextBold> below)
				</TextRegular>
				<H3 style={{ marginTop: 20 }}>Editing a node</H3>
				<TextRegular>
					Click the button <TextBold>&quot;Edit Node&quot;</TextBold> in the top
					right corner of any node you want to edit! There, you can edit the
					title of the node (only you can see it, it identifies the node amongst
					others), the body (the text that will be shown to the reader) and add,
					edit and remove links to other nodes. Click{" "}
					<TextBold>&quot;Save Changes&quot;</TextBold> after every change,
					nothing happens without your say-so!
				</TextRegular>
				<H3 style={{ marginTop: 20 }}>Deleting a node</H3>
				<TextRegular>
					Click the button <TextBold>&quot;Remove&quot;</TextBold> in the top
					right corner of any node you want to remove. Then confirm by clicking{" "}
					<TextBold>&quot;Yes, delete it forever&quot;</TextBold>.
				</TextRegular>
				<H3 style={{ marginTop: 20 }}>
					Setting a node to be the start of the story
				</H3>
				<TextRegular>
					To choose the node the story will start from, open the{" "}
					<TextBold>&quot;Edit the Story Node&quot;</TextBold> window (see{" "}
					<TextBold>&quot;Editing node&quot;</TextBold> above) and click the
					button <TextBold>&quot;Make story start here&quot;</TextBold> in the
					top right corner. Don&apos;t forget to click{" "}
					<TextBold>&quot;Save Changes&quot;</TextBold>!
				</TextRegular>
			</BasicPanel>
			<BasicPanel
				style={{
					marginHorizontal: sizes.screenMargin,
					marginBottom: sizes.screenMargin,
				}}
			>
				<H1>Changing font size</H1>
				<TextRegular style={{ marginTop: 10 }}>
					The app doesn&apos;t support changing font sizes, but you can change
					your device&apos;s font size in the system settings - the font size
					will change in the app.
				</TextRegular>
			</BasicPanel>
		</ScrollView>
	);
}
