import { createContext, useState } from "react";

export const StoryContext = createContext(null);

export function AllStoriesProvider({ children }) {
	const [currentStoryId, setCurrentStoryId] = useState(1);

	const [stories, setStories] = useState(defaultStories);

	// LOADING STORIES!!!
	// useEffect(() => {
	// 	const getStories = async () => {
	// 		try {
	// 			const jsonStories = await AsyncStorage.getItem("stories");
	// 			if (jsonStories != null) {
	// 				setStories(JSON.parse(jsonStories));
	// 			} else {
	// 				setStories(defaultStories);
	// 			}
	// 			// if (!jsonStories) {
	// 			// 	setStories(defaultStories);
	// 			// 	return;
	// 			// }

	// 			// const parsed = JSON.parse(jsonStories);

	// 			// if (!Array.isArray(parsed)) {
	// 			// 	setStories(defaultStories);
	// 			// 	return;
	// 			// }

	// 			// setStories(parsed);
	// 		} catch (e) {
	// 			console.log("Error loading stories", e);
	// 		}
	// 	};
	// 	getStories();
	// }, []);

	// SAVING STORIES!!!
	// useEffect(() => {
	// 	if (stories.length === 0) return;

	// 	const storeStories = async () => {
	// 		try {
	// 			const jsonStories = JSON.stringify(stories);
	// 			await AsyncStorage.setItem("stories", jsonStories);
	// 		} catch (e) {
	// 			console.log("Error saving stories", e);
	// 		}
	// 	};
	// 	storeStories();
	// }, [stories]);

	return (
		<StoryContext.Provider
			value={{
				stories,
				setStories,
				currentStoryId,
				setCurrentStoryId,
			}}
		>
			{children}
		</StoryContext.Provider>
	);
}

const defaultStories = [
	{
		id: 1,
		default: true,
		title: "Default story",
		timestamp_created: Date.now(),
		timestamp_edited: Date.now(),
		storyNodes: [
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
		],
	},
];
