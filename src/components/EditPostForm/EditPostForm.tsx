import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import css from "./EditPostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPost } from "../../services/postService";
// import { Post } from "../../types/post";

interface EditPostFormProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
  onClose: () => void;
}

const EditPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must have at least 3 characters")
    .max(50, "Title must be less than 50 characters")
    .required("Title is required"),
  body: Yup.string()
    .min(10, "Body must have at least 10 characters")
    .max(500, "Body must be less than 500 characters")
    .required("Body is required"),
});

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      toast.success("Post edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
    onError: () => {
      toast.error("Failed to edit post");
    },
  });

  const handleSubmit = (values: { title: string; body: string }) => {
    mutation.mutate({ id: post.id, title: values.title, body: values.body });
  };

  return (
    <Formik
      initialValues={{ title: post.title, body: post.body }}
      onSubmit={handleSubmit}
      validationSchema={EditPostSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
