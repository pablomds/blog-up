import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../../Components/Global/Input/Input';
import { PostSchema, FormPostSchema } from '../../Schemas/PostSchema';

const CreateNewPostPage = () => {

      const { register, handleSubmit,control, formState: { errors } } = useForm<FormPostSchema>({
        resolver: yupResolver(PostSchema),
        mode: "onSubmit"
      });

  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Create new post</h1>
      </div>
      <form className="flex flex-col gap-y-8 w-full">
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
        <button
          type="submit"
          className="font-inria-sans font-bold rounded-[10px] text-2xl bg-blog-up-green h-10 w-52 max-w-[150px] text-blog-up-black cursor-pointer flex justify-center items-center"
        >
          {"SAVE"}
        </button>
      </form>
    </div>
  );
}

export default CreateNewPostPage