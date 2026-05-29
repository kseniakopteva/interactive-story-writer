import { createContext, useCallback, useState } from "react";

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

	function addNodes(storyId, ...nodes) {
		setStories((prevStories) =>
			prevStories.map((story) => {
				if (story.id !== storyId) return story;

				return {
					...story,
					storyNodes: [...story.storyNodes, ...nodes],
					timestamp_edited: Date.now(),
					default: false, // TODO: delete the key instead of setting it to false
				};
			}),
		);
	}

	function updateNode(storyId, nodeId, newNode) {
		setStories(
			stories.map((story) => {
				if (story.id !== storyId) return story;

				return {
					...story,
					storyNodes: [
						...story.storyNodes.map((node) => {
							if (node.id !== nodeId)
								return {
									...node,
									start: newNode.start ? false : node.start,
								};

							const newValue = {
								...node,
								...newNode,
							};

							return newValue;
						}),
					],
					timestamp_edited: Date.now(),
					default: false, // TODO: delete the key instead of setting it to false
				};
			}),
		);
	}

	function removeNode(storyId, nodeId) {
		setStories(
			stories.map((story) => {
				if (story.id !== storyId) return story;

				return {
					...story,
					storyNodes: story.storyNodes.filter((n) => n.id !== nodeId),
					timestamp_edited: Date.now(),
					default: false, // TODO: delete the key instead of setting it to false
				};
			}),
		);
	}

	function addStory(story) {
		setStories([...stories, story]);
	}

	function updateStory(storyId, story) {
		setStories(
			stories.map((s) => {
				if (s.id === storyId) return { ...s, ...story };
				return s;
			}),
		);
	}

	function removeStory(storyId) {
		setStories((prev) => {
			const newStories = prev.filter((s) => {
				if (s.id !== storyId) return s;
			});

			if (storyId === currentStoryId) setCurrentStoryId(newStories[0].id);

			return newStories;
		});
	}

	const getCurrentStory = useCallback(() => {
		return stories.find((story) => story.id === currentStoryId);
	}, [stories, currentStoryId]);

	function getCurrentStoryNodes() {
		return getCurrentStory().storyNodes;
	}

	return (
		<StoryContext.Provider
			value={{
				stories,
				addNodes,
				updateNode,
				removeNode,
				addStory,
				updateStory,
				removeStory,
				currentStoryId,
				setCurrentStoryId,
				getCurrentStory,
				getCurrentStoryNodes,
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
