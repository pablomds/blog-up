import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User, AtSign, Eye, EyeOff } from 'lucide-react';

import { selectUserPosts, setUserPosts, fetchUserPostsWithIds, updateAuthorPosts, fetchDeleteAllUserPosts } from '@/Redux/Slices/postsSlice';
import { selectUser, fetchUpdateUser, fetchDeleteUser } from '@/Redux/Slices/userSlice';

import { AppDispatch } from '@/Redux/configureStore';
import BlogPosts from '@/Components/BlogPosts/BlogPosts';
import Tabs from '@/Components/Global/Tabs/Tabs';
import Input from '@/Components/Global/Input/Input';
import { Controller, useForm } from 'react-hook-form';
import { utils } from '@/Utils/utils';
import CustomToast from '@/Components/Global/Toast/CustomToast';
import Modal from '@/Components/Global/Modal/Modal';
import { resetState } from '@/Redux/rootReducer';
import { deleteUserAccount } from '@/Redux/Slices/authSlice';
import ActionButton from '@/Components/Global/Button/ActionButton';

const InformationsSchema = yup.object({
  name: yup.string().required(),
  email: yup.string(),
  password: yup.string(),
  confirmPassword: yup.string(),
});

type FormInformationsSchema = yup.InferType<typeof InformationsSchema>;

const MyProfilPage = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
      const { handleSubmit,control, formState: { errors }, reset } = useForm<FormInformationsSchema>({
        resolver: yupResolver(InformationsSchema),
        mode: "onSubmit"
      });
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const {userPosts, isLoading} = useSelector((state) => selectUserPosts(state, currentUser.id));

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
    }

    const timeout = setTimeout(() => {
      if (!isLoading) {
        setShowSkeleton(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isLoading, userPosts.length]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(setUserPosts({ userId: currentUser.id }));
      reset({
        name: currentUser.name,
        email: currentUser.email,
        password: currentUser.password,
        confirmPassword: currentUser.password
      });
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (userPosts.length && currentUser) {
      let currentPostsIds = _.map(userPosts, (post) => post.id);
      const postsIdsToFetch = _.differenceWith(
        currentUser.postsIds,
        currentPostsIds,
        _.isEqual
      );
      if (postsIdsToFetch.length) {
        dispatch(
          fetchUserPostsWithIds({
            author: currentUser?.name,
            postsIds: postsIdsToFetch,
          })
        );
      }
    }
  }, []);

    const onSubmit = async (formValues: FormInformationsSchema) => {
      const { name } = formValues;
      try {
        dispatch(fetchUpdateUser({ userId: currentUser.id, name: name}));
        dispatch(updateAuthorPosts({ userId: currentUser.id, name: name}));
        CustomToast({ variant: "success", message: "Your informations are updated!"});
      } catch (error) {
        CustomToast({ variant: "failed", message: "An error occued!"});
        console.log("Error onSubmit()", error)
      }
    };

    const onDelete = async () => {
      dispatch(fetchDeleteUser({userId: currentUser.id}));
      if (currentUser.postsIds) {
        dispatch(fetchDeleteAllUserPosts({postsIds: currentUser.postsIds}))
      };
      dispatch(deleteUserAccount())
      CustomToast({ variant: "success", message: "Your account was deleted!"});
      dispatch(resetState())
    }

    const MyInformations = () => {
      return (
        <div className="flex flex-col gap-y-4">
          <form
            className="flex flex-col gap-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name={"name"}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={"Whats your name ?"}
                  error={errors.name?.message}
                  icon={<User className="w-5 h-5 opacity-60" />}
                />
              )}
            />
            <Controller
              control={control}
              name={"email"}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={"Whats your email ?"}
                  error={errors.email?.message}
                  icon={<AtSign className="w-5 h-5 opacity-60" />}
                  isDisabled={true}
                />
              )}
            />
            <Controller
              control={control}
              name={"password"}
              render={({ field }) => (
                <Input
                  {...field}
                  type={true ? "password" : "text"}
                  autoComplete="on"
                  placeholder={"Whats your new password ?"}
                  error={errors.password?.message}
                  isDisabled={true}
                  icon={
                    <div className="cursor-pointer">
                      {true ? (
                        <Eye className="w-5 h-5 opacity-60" />
                      ) : (
                        <EyeOff className="w-5 h-5 opacity-60" />
                      )}
                    </div>
                  }
                />
              )}
            />
            <Controller
              control={control}
              name={"confirmPassword"}
              render={({ field }) => (
                <Input
                  {...field}
                  type={true ? "confirmPassword" : "text"}
                  autoComplete="on"
                  placeholder={"Can you confirm your new password ?"}
                  error={errors.password?.message}
                  isDisabled={true}
                  icon={
                    <div className="cursor-pointer">
                      {true ? (
                        <Eye className="w-5 h-5 opacity-60" />
                      ) : (
                        <EyeOff className="w-5 h-5 opacity-60" />
                      )}
                    </div>
                  }
                />
              )}
            />
            <div className="flex gap-x-2">
            <ActionButton variant="valid" type="submit" label="SAVE" />
            <div onClick={() => setIsModalOpen(true)} className="font-bold rounded-[10px] text-2xl bg-blog-up-red h-10 w-60 text-blog-up-white cursor-pointer flex justify-center items-center hover:bg-blog-up-dark-red">
              DELETE ACCOUNT
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="flex flex-col justify-center items-center gap-y-4">
              <p className="text-blog-up-gray font-semibold text-lg">Are You Sure You Want Delete Your Account ?</p>
              <p className="text-blog-up-gray text-base">This Action Cannot Be Undone!</p>
              <div onClick={onDelete} className="text-blog-up-white font-semibold h-10 bg-blog-up-red p-2 rounded-[5px]"> DELETE MY ACCOUNT </div>
              </div>
            </Modal>
            </div>
          </form>
          
          <div>
            <p className="text-xl">Member since : {utils.formatDateToArray(currentUser.createdDate).join(" ")}</p>
            <p className="text-xl">Posts : {currentUser.postsIds.length}</p>
          </div>
        </div>
      );
    }

  return (
    <div className="mx-auto flex flex-col items-start md:px-20 px-10 pt-28 pb-8">
      <div className="flex flex-col pb-4">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">My Profil</h1>
      </div>
      <Tabs tabs={["Posts", "Informations"]} tabsComponents={[<BlogPosts showSkeleton={showSkeleton}  blogPosts={userPosts} />, <MyInformations />]} />
    </div>
  );
};

export default MyProfilPage