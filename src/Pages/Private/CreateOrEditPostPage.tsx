import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Trash2 } from 'lucide-react';

import { addPost, selectPostWithId, updatePost as updatePostInRedux, deletePost as deletePostInRedux } from '../../Redux/Slices/postsSlice';
import { selectUser, setUser } from '../../Redux/Slices/userSlice';
import { createPost, deletePost, updatePost } from '../../Controllers/postsControllers';
import { PostSchema, FormPostSchema } from '../../Schemas/PostSchema';
import { useToast } from '../../Context/ToastContext';
import { updateUser } from '../../Controllers/usersControllers';
import _ from 'lodash';

const CreateOrEditPostPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const currentUser = useSelector(selectUser);

  const selectedPost = useSelector((state) => selectPostWithId(state, id));

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormPostSchema>({
    resolver: yupResolver(PostSchema),
    mode: "onSubmit",
  });


  useEffect(() => {
    if (selectedPost) {
      reset({
        id: selectedPost.id,
        title: selectedPost.title,
        text: selectedPost.text
      });
    }
  }, [selectedPost, reset]); 

  const onSubmit = async (formValues: FormPostSchema) => {

    const newPost = { ...formValues, createdBy: currentUser.id}

    try {
      if (formValues.id) {
        const updatedPost = {title: formValues.title, text: formValues.text}
        await updatePost(formValues.id, updatedPost);
        dispatch(updatePostInRedux({...updatedPost, id: formValues.id}));
        toast?.open("Your post is updated!", "success");
        navigate(`/post/${formValues.id}`)
      } else {
        const newPostId = await createPost(newPost);
        const newPostWithId = {
          ...newPost,
          id: newPostId,
          author: currentUser.name,
        };
        await updateUser(currentUser.id, {
          postsIds: [...currentUser.postsIds, newPostId],
        });
        dispatch(addPost(newPostWithId));
        dispatch(
          setUser({
            ...currentUser,
            postsIds: [...currentUser.postsIds, newPostId],
          })
        );
        toast?.open("Your post is online!", "success");
        navigate(`/post/${newPostId}`)
      }
    } catch (error) {
      toast?.open("An Error Occured Creating Your Post!", "failed");
      console.log("Error On onSubmit()", error);
    }

  };

  const onDelete = async () => {
    try {
      await deletePost(selectedPost.id)
      dispatch(deletePostInRedux({id: selectedPost.id}));
      dispatch(setUser({...currentUser, postsIds: _.filter(currentUser.postsIds, (postId: any) => postId !== selectedPost.id) }))
      toast?.open("Your Post Was Deleted!", "success");
      navigate("/lastest");
    } catch (error) {
      toast?.open("An Error Occured Deleting Your Post!", "failed");
      console.log("Error On onDelete()", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">
          {selectedPost ? `Edit Post` : "Create a New Post"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 w-full max-w-[508px]"
      >
        <Controller
          control={control}
          name={"title"}
          render={({ field }) => (
            <textarea
              {...field}
              rows={1}
              className="font-inria-sans w-full border-2 border-blog-up-green py-4 pl-6 pr-12 rounded-[5px] focus:outline-none resize-none overflow-hidden"
              placeholder={"Whats your title ?"}
            />
          )}
        />
        <span className="font-inria-sans text-blog-up-red">
          {errors?.title && errors.title?.message}
        </span>
        <Controller
          control={control}
          name={"text"}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              className="font-inria-sans w-full min-h-24 h-40 max-h-60 xs:max-h-96 border-2 border-blog-up-green py-3 pl-4 pr-10 rounded-[5px] focus:outline-none resize-y overflow-auto"
              placeholder={"Whats in your mind ?"}
            />
          )}
        />
        <div className="flex flex-row gap-x-4">
          <button
            type="submit"
            className="font-inria-sans font-bold rounded-[10px] text-2xl bg-blog-up-green h-10 w-52 max-w-[150px] text-blog-up-black cursor-pointer flex justify-center items-center"
          >
            {"SAVE"}
          </button>
          {selectedPost && selectedPost.createdBy === currentUser.id ? (
            <div
              onClick={() => onDelete()}
              className="font-inria-sans font-bold rounded-[10px] text-2xl bg-blog-up-red hover:bg-blog-up-gray h-10 w-52 max-w-[150px] text-blog-up-white cursor-pointer flex justify-center items-center select-none"
            >
              {"DELETE"}
              <Trash2 className="text-blog-up-white" />
            </div>
          ) : <></>}
        </div>
        <span className="font-inria-sans text-blog-up-red">
          {errors?.text && errors.text?.message}
        </span>
      </form>
    </div>
  );
};

export default CreateOrEditPostPage