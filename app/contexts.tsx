import { createContext, useState } from "react";

type Paragraph = { id: number; text: string };
type Link = { id: number; text: string; targetId: number };

type StoryNode = {
	id: number;
	title: string;
	body: Paragraph[] | null;
	links: Link[];
	start: boolean;
};

type StoryNodeContextType = {
	storyNodes: StoryNode[];
	setStoryNodes: React.Dispatch<React.SetStateAction<StoryNode[]>>;
};

export const StoryNodeContext = createContext<StoryNodeContextType | null>(null);

export function StoryNodeProvider({ children }: { children: React.ReactNode }) {
	const [storyNodes, setStoryNodes] = useState<StoryNode[]>([
		{
			id: 1,
			title: "Starting node",
			body: [
				{ id: 1, text: "This is the first paragraph." },
				{ id: 2, text: "This is the second." },
				{ id: 3, text: "Wow! Another one." },
				{ id: 4, text: "...This is getting repetitive." },
			],
			links: [
				{ id: 1, text: "Go left.", targetId: 2 },
				{ id: 2, text: "Go right.", targetId: 3 },
			],
			start: true,
		},
		{
			id: 2,
			title: "Go left.",
			body: [{ id: 1, text: "You went left" }],
			links: [],
			start: false,
		},
		{
			id: 3,
			title: "Go right.",
			body: [{ id: 1, text: "You went right" }],
			links: [],
			start: false,
		},
	]);

	return (
		<StoryNodeContext.Provider value={{ storyNodes, setStoryNodes }}>
			{children}
		</StoryNodeContext.Provider>
	);
}
