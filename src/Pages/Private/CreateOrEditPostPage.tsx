import _ from 'lodash';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { addPost, selectPostWithId, updatePost as updatePostInRedux, fetchDeletePost } from '@/Redux/Slices/postsSlice';
import { selectUser, setUser, fetchDeletePostFromPostsIds } from '@/Redux/Slices/userSlice';
import { createPost, updatePost } from '@/Controllers/postsControllers';
import { updateUser } from '@/Controllers/usersControllers';
import { PostSchema, FormPostSchema } from '@/Schemas/PostSchema';

import CustomToast from '@/Components/Global/Toast/CustomToast';
import { AppDispatch } from '@/Redux/configureStore';
import ActionButton from '@/Components/Global/Button/ActionButton';

const CreateOrEditPostPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const selectedPost = useSelector((state) => selectPostWithId(state, id));

  const isOwner = (): boolean => currentUser.id === selectedPost.createdBy;

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
      if (!isOwner()) {
          navigate("/create-post")
          return
      }
      reset({
        id: selectedPost.id,
        title: selectedPost.title,
        text: selectedPost.text
      });
    } else {
      reset({
        id: "",
        title: "",
        text: ""
      })
    }
  }, [id,selectedPost, reset]); 

  const onSubmit = async (formValues: FormPostSchema) => {

    const newPost = { ...formValues, createdBy: currentUser.id}

    try {
      if (formValues.id) {
        const updatedPost = {title: formValues.title, text: formValues.text}
        await updatePost(formValues.id, updatedPost);
        dispatch(updatePostInRedux({...updatedPost, id: formValues.id}));
        CustomToast({ variant: "success", message: "Your post is updated!" })
        navigate(`/lastest`)
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
        CustomToast({ variant: "success", message: "Your post is online!" });
        navigate(`/post/${newPostId}`)
      }
    } catch (error) {
      CustomToast({ variant: "failed", message: "An Error Occured Creating Your Post!" });
      console.log("Error On onSubmit()", error);
    }

  };

  const onDelete = async () => {
    try {
      const filteredPostsIds = _.filter(currentUser.postsIds, (postId: any) => postId !== selectedPost.id);
      dispatch(fetchDeletePost({postId: selectedPost.id}));
      dispatch(fetchDeletePostFromPostsIds({ userId: currentUser.id, postsIds: filteredPostsIds }));
      CustomToast({ variant: "success", message: "Your Post Was Deleted!"});
      navigate("/lastest");
    } catch (error) {
      CustomToast({ variant: "failed", message: "An Error Occured Deleting Your Post!"});
      console.log("Error On onDelete()", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7 mx-auto md:items-start md:px-20 px-10 pt-28 pb-8">
      <div className="flex flex-col select-none">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">
          {selectedPost ? `Edit Post` : "Create a New Post"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 w-full max-w-[508px]"
      >
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
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
          <span className="font-inria-sans text-blog-up-red">
            {errors?.text && errors.text?.message}
          </span>
        </div>
        <div className="flex flex-row gap-x-4">
          <ActionButton variant="valid" type="submit" label="SAVE" />
          {selectedPost && isOwner() ? (
            <div
              onClick={() => onDelete()}
              className="font-inria-sans font-bold rounded-[10px] text-lg bg-blog-up-red hover:bg-blog-up-gray h-10 w-52 max-w-[150px] text-blog-up-black cursor-pointer flex justify-center items-center select-none"
            >
              {"DELETE"}
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateOrEditPostPage