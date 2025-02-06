import { useEffect, useState } from "react";
import axios from "axios";

const PostItem = ({ post, onEdit }) => {
	const [imageUrl, setImageUrl] = useState(null);

	const fetchImage = async (id) => {
		try {
			const response = await axios.get(
				`https://postgram-server-zoyv.onrender.com/api/posts/getImage/${id}`,
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
			await axios.delete(
				`https://postgram-server-zoyv.onrender.com/api/posts/${id}`
			);
			window.location.reload(); 
		} catch (error) {
			console.error("Error deleting post:", error.message);
		}
	};

	return (
		<div
			key={post._id}
			className="bg-white rounded-lg shadow-lg overflow-hidden"
		>
			
			{imageUrl && (
				<img
					src={imageUrl}
					alt={post.title}
					className="w-full h-48 object-cover"
				/>
			)}
		
			<div className="p-4">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">
					{post.title}
				</h2>
				<p className="text-gray-600">{post.description}</p>
			</div>

			
			<div className="flex justify-between items-end px-4 pb-4">
				
				<button
					onClick={() => onEdit(post)}
					className="bg-blue-500 hover:bg-blue-600 bottom-0 left-0 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
				>
					Edit
				</button>
				
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
