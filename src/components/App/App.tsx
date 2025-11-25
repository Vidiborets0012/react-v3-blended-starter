// import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
// import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function App() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    placeholderData: keepPreviousData,
  });

  console.log("data:", data);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* <SearchBox /> */}
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
