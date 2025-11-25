// import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { data } = useQuery({
    queryKey: ["posts", debouncedSearchQuery],
    queryFn: () => fetchPosts(debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });

  console.log("data:", data);

  const changeSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {/* <Pagination /> */}
        {/* <button className={css.button}>Create post</button> */}
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
      {/* <PostList posts={data} /> */}
      {data && data.length > 0 && (
        <PostList posts={data} toggleModal={() => {}} toggleEditPost={() => {}} />
      )}
    </div>
  );
}
