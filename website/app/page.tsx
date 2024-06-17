"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
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
export default function Home() {
  const [posts, setPosts] = useState<DataPost>();
  const [location, setlocation] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [createForm, setCreateForm] = useState({
    title: "",
    content: "",
  });
  const [editForm, setEditForm] = useState({
    id: 0,
    title: "",
    content: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://172.25.100.1:80/posts");
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

  const handleEdit = (post: Post) => {
    setEditForm({
      id: post.id,
      title: post.title,
      content: post.content,
    });
    setShowEditModal(true);
  };
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://172.25.100.1:80/posts/${editForm.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      console.log("Post updated successfully");
      fetchPosts();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handleDelete = async (id: number) => {
    // console.log("delete");
    try {
      const response = await fetch(`http://172.25.100.1:80/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      fetchPosts();
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleCreate = () => {
    console.log("modal show");
    setShowModal(true); // Show the modal when "Create" button is clicked
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", createForm);
    try {
      const response = await fetch("http://172.25.100.1:80/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createForm),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      // Clear the form after successful creation
      setCreateForm({
        title: "",
        content: "",
      });

      console.log("Post created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
    }
    fetchPosts();
    setShowModal(false); // Close the modal after form submission
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <main className="bg-slate-900 flex min-h-screen flex-col items-start p-24">
      <div className="w-full flex justify-between items-center mb-5">
        <div className="">
          <h1>Halaman Home</h1>
          <h1 className="mb-2">Server Location : {location}</h1>
        </div>

        <button
          onClick={() => handleCreate()}
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Create
        </button>
      </div>

      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {posts?.posts.map((post) => (
              <tr
                key={post.slug}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post.title}
                </th>
                <td className="px-6 py-4">{post.content}</td>
                <td className="px-6 py-4">{post.slug}</td>
                <td className="px-6 py-4">{post.created_at}</td>
                <td className="px-6 py-4">
                  <Link className="text-blue-400" href={post.slug}>
                    Detail
                  </Link>
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-green-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for creating data */}
      {showModal && (
        <div className="fixed  inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          {/* <!-- Modal content --> */}
          <div className="relative  w-full max-w-2xl  bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Data Post
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4 w-full">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-100"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={createForm.title}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, title: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-100"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={createForm.content}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, content: e.target.value })
                    }
                    rows={3}
                    className="mt-1 block w-full px-3 text-gray-900 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  ></textarea>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="static-modal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                  <button
                    data-modal-hide="static-modal"
                    type="button"
                    onClick={handleCloseModal}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Modal for edit data */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          {/* Modal content */}
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Data Post
              </h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4 w-full">
              <form onSubmit={handleUpdateSubmit}>
                {/* Form fields */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-100"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="mt-1 block w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-100"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={editForm.content}
                    onChange={(e) =>
                      setEditForm({ ...editForm, content: e.target.value })
                    }
                    rows={3}
                    className="mt-1 block w-full px-3 text-gray-900 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  ></textarea>
                </div>
                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="static-modal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                  <button
                    data-modal-hide="static-modal"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
