import { useEffect, useState } from "react";
import axios from "axios";

const PostItem = ({ post }) => {
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
		</div>
	);
};

export default PostItem;
