import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/posts");
			setPosts(response.data);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	const updatePost = async (postId, formData) => {
		try {
			const response = await axios.put(
				`http://localhost:5000/api/posts/${postId}`,
				formData
			);
			setPosts(
				posts.map((post) => (post._id === postId ? response.data : post))
			);
		} catch (error) {
			console.error("Error updating post:", error);
		}
	};


	const createPost = async (formData) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/posts",
				formData
			);
			setPosts([...posts, response.data]);
		} catch (error) {
			console.error("Error creating post:", error);
		}
	};

	

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<PostContext.Provider value={{  updatePost,fetchPosts, createPost, posts }}>
			{children}
		</PostContext.Provider>
	);
};
