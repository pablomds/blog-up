import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { addPost } from '../../Redux/Slices/postsSlice';
import { selectUser, setUser } from '../../Redux/Slices/userSlice';
import { createPost } from '../../Controllers/postsControllers';
import Input from '../../Components/Global/Input/Input';
import { PostSchema, FormPostSchema } from '../../Schemas/PostSchema';
import { useToast } from '../../Context/ToastContext';
import { updateUser } from '../../Controllers/usersControllers';

const CreateNewPostPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const currentUser = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormPostSchema>({
    resolver: yupResolver(PostSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (formValues: FormPostSchema) => {
    const newPost = { ...formValues, createdBy: currentUser.id}
    try {
      const newPostId = await createPost(newPost);
      const newPostWithId = {...newPost, id: newPostId, createdByName: currentUser.name};
      await updateUser(currentUser.id, { postsIds: [...currentUser.postsIds, newPostId]} )
      dispatch(addPost(newPostWithId))
      dispatch(setUser({...currentUser, postsIds: [...currentUser.postsIds, newPostId]}))
      toast?.open("Your post is online!", "success");
    } catch (error) {
      toast?.open("An Error Occured Creating Your Post!", "failed");
      console.log("Error On onSubmit()", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Create new post</h1>
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
        <span>{errors?.title && errors.title?.message}</span>
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
        <span>{errors?.text && errors.text?.message}</span>
        <button
          type="submit"
          className="font-inria-sans font-bold rounded-[10px] text-2xl bg-blog-up-green h-10 w-52 max-w-[150px] text-blog-up-black cursor-pointer flex justify-center items-center"
        >
          {"SAVE"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewPostPage