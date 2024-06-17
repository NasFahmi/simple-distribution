"use client";

import { containerserver } from "@/utlis/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Detail({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  interface Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    created_at: string;
  }
  interface DataPost {
    location: string;
    posts: Post[];
  }
  const [posts, setPosts] = useState<DataPost>();
  const [location, setlocation] = useState("");
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${containerserver}/posts/${params.slug}`
      );
      const data = (await response.json()) as DataPost;
      console.log(data);
      setlocation(data.location);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    // Fetch posts from the API when the component mounts

    fetchPosts();
  }, []);
  return (
    <div className="bg-slate-900 flex min-h-screen flex-col items-center p-24">
      <div className="">
        <Link className="text-red-400" href={"/"}>
          Back
        </Link>
        <h1>Halaman Detail {posts?.posts[0].title}</h1>
        <h1 className="mb-2">Server Location : {location}</h1>
        {posts?.posts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-700 p-4 mb-
        4 rounded"
          >
            <p className="mb-1">id : {post.id}</p>
            <h2 className="mb-1">title : {post.title}</h2>
            <p className="mb-1">content : {post.content}</p>
            <p className="mb-1">created at : {post.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
