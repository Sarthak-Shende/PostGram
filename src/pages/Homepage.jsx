import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import Posts from "../components/Posts";

const Homepage = () => {
	const { createPost, updatePost } = useContext(PostContext);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [postId, setPostId] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: null,
	});

	const openCreatePopup = () => {
		setIsEditMode(false);
		setFormData({ title: "", description: "", image: null });
		setIsPopupOpen(true);
	};

	const openEditPopup = (post) => {
		setIsEditMode(true);
		setPostId(post._id);
		setFormData({
			title: post.title,
			description: post.description,
			image: null,
		});
		setIsPopupOpen(true);
	};

	const closePopup = () => setIsPopupOpen(false);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "image") {
			setFormData({ ...formData, [name]: files[0] });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const formDataToSend = new FormData();
		formDataToSend.append("title", formData.title);
		formDataToSend.append("description", formData.description);
		if (formData.image) {
			formDataToSend.append("image", formData.image);
		}

		try {
			if (isEditMode) {
				await updatePost(postId, formDataToSend);
			} else {
				await createPost(formDataToSend);
			}
			closePopup();
		} catch (error) {
			console.error("Error saving post:", error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="p-4 relative">
			<button
				onClick={openCreatePopup}
				className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg"
			>
				Create Post
			</button>

			<Posts onEdit={openEditPopup} />

			{isPopupOpen && (
				<div className="fixed inset-0 bg-transparent bg-opacity-10 flex  items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-2xl shadow-gray-400 ring-2 ring-gray-500 w-full max-w-md">
						<h2 className="text-2xl font-bold mb-4">
							{isEditMode ? "Edit Post" : "Create Post"}
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">Title</label>
								<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleChange}
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">
									Description
								</label>
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									rows="3"
									required
								></textarea>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">Image</label>
								<input
									type="file"
									name="image"
									onChange={handleChange}
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="flex justify-end space-x-4">
								<button
									type="button"
									onClick={closePopup}
									className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="px-4 py-2 disabled:bg-gray-500 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
								>
									{isSubmitting ? "Submitting..." : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Homepage;
