import { PostContext } from "../context/PostContext";
import { useContext } from "react";
import PostItem from "./Post";

const Posts = ({onEdit}) => {
	const { posts } = useContext(PostContext);

	return (
		<div className="container mx-auto px-4">
			{posts.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post) => (
						<PostItem key={post._id} post={post} onEdit={onEdit}  />
					))}
				</div>
			) : (
				<p className="text-center text-gray-600">No posts available.</p>
			)}
		</div>
	);
};

export default Posts;
