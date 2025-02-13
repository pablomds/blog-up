import { Route } from 'react-router';
import { useSelector } from "react-redux";

import { selectUser } from '@/Redux/Slices/userSlice';

import PublicLayout from '@/Layouts/PublicLayout'
import PrivateLayout from '@/Layouts/PrivateLayout'
import LoginPage from '@/Pages/Public/LoginPage'
import SignUpPage from '@/Pages/Public/SignUpPage'
import LastestPage from '@/Pages/Private/LastestPage';
import BlogPostDetailsPage from '@/Pages/Private/BlogPostDetailsPage';
import CreateOrEditPostPage from '@/Pages/Private/CreateOrEditPostPage';
import MyProfilPage from '@/Pages/Private/MyProfilPage';
import SearchPostPage from '@/Pages/Private/SearchPostPage';
import NotFoundPage from '@/Pages/Public/NotFoundPage';


export const PublicRoutes = () => {
  return [
    <Route>
      <Route key="lading-page" path="/" element={<PublicLayout />} />
      <Route key="login-page" path="/login" element={<LoginPage />} />
      <Route key="signup-page" path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ]
};

export const PrivateRoutes = () => {

  const currentUser = useSelector(selectUser);

  return (
    <Route element={<PrivateLayout currentUser={currentUser} />}>
      <Route key="lastest-page" path="/my-profil" element={<MyProfilPage />} />
      <Route key="lastest-page" path="/search" element={<SearchPostPage />} />
      <Route key="lastest-page" path="/lastest" element={<LastestPage />} />
      <Route key="post-details-page" path="/post/:id" element={<BlogPostDetailsPage />} />
      <Route key="create-new-post-page" path="/create-post/:id?" element={<CreateOrEditPostPage />} />
    </Route>
  );
};