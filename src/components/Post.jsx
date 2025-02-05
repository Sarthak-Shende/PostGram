import { useEffect, useState } from "react";
import axios from "axios";

const PostItem = ({ post, onEdit }) => {
	const [imageUrl, setImageUrl] = useState(null);

	const fetchImage = async (id) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/posts/getImage/${id}`,
				{ responseType: "blob" }
			);
			setImageUrl(URL.createObjectURL(response.data));
		} catch (error) {
			console.error("Error fetching image:", error);
		}
	};
	useEffect(() => {
		fetchImage(post.image);
	}, [post.image]);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/api/posts/${id}`);
			window.location.reload(); // Refresh the page after deletion
		} catch (error) {
			console.error("Error deleting post:", error.message);
		}
	};

	return (
		<div
			key={post._id}
			className="bg-white rounded-lg shadow-lg overflow-hidden"
		>
			{/* Image */}
			{imageUrl && (
				<img
					src={imageUrl}
					alt={post.title}
					className="w-full h-48 object-cover"
				/>
			)}
			{/* Content */}
			<div className="p-4">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">
					{post.title}
				</h2>
				<p className="text-gray-600">{post.description}</p>
			</div>

			{/* Edit Button */}
			<div className="flex justify-between items-end px-4 pb-4">
				{/* Edit Button */}
				<button
					onClick={() => onEdit(post)}
					className="bg-blue-500 hover:bg-blue-600 bottom-0 left-0 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
				>
					Edit
				</button>
				{/* Delete Button */}
				<button
					onClick={() => handleDelete(post._id)}
					className="bg-red-500 hover:bg-red-600 bottom-0 right-0 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default PostItem;
