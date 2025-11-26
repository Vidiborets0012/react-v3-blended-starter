import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { deletePost, fetchPosts } from "../../services/postService";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import PostForm from "../CreatePostForm/CreatePostForm";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {
  const LIMIT = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<null | Post>(null);

  const { data } = useQuery({
    queryKey: ["posts", debouncedSearchQuery],
    queryFn: () => fetchPosts(debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });
  console.log("data:", data);

  const totalPages = data ? Math.ceil(data.length / LIMIT) : 0;

  const paginatedPosts = data?.slice((currentPage - 1) * LIMIT, currentPage * LIMIT) ?? [];

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const changeSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery.trim());
    setCurrentPage(1);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // --- Відкрити модалку для створення ---
  const openCreateModal = () => {
    setEditedPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: Post) => {
    setEditedPost(post); // вставляємо пост у стан
    setIsModalOpen(true); // відкриваємо модалку
  };

  // --- Закрити модалку ---
  const closeModal = () => {
    setIsModalOpen(false);
    setEditedPost(null); // очищуємо форму після закриття
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

        <button className={css.button} onClick={openCreateModal}>
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {editedPost ? (
            <EditPostForm post={editedPost} onClose={closeModal} />
          ) : (
            <PostForm onClose={closeModal} />
          )}
        </Modal>
      )}

      {paginatedPosts.length > 0 && (
        <PostList
          posts={paginatedPosts}
          // toggleModal={openCreateModal}
          toggleEditPost={openEditModal}
          onDelete={handleDelete}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
