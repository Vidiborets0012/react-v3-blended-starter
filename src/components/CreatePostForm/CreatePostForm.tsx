import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import toast from "react-hot-toast";

const PostShema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must have at least 3 characters")
    .max(50, "Title must be less then 50 characters")
    .required("Title is required"),
  body: Yup.string()
    .min(10, "Body must have at least 10 characters")
    .max(500, "Body must be less then 500 characters")
    .required("Body is required"),
});

interface FormValues {
  title: string;
  body: string;
}

const initialValues: FormValues = {
  title: "",
  body: "",
};

interface PostFormProps {
  onClose: () => void;
}

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully!");
      onClose();
    },
  });
  const handleSubmit = (formValues: FormValues, actions: FormikHelpers<FormValues>) => {
    mutation.mutate(formValues);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostShema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
