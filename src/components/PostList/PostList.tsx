import { Post } from "../../types/post";
import css from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
}

export default function PostList({ posts, toggleModal, toggleEditPost }: PostListProps) {
  return (
    <ul className={css.list}>
      {posts.map(({ id, title, body }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{body}</p>
          <div className={css.footer}>
            <button className={css.edit}>Edit</button>
            <button className={css.delete}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
