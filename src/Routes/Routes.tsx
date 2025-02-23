import { Route } from 'react-router';
import { useSelector } from "react-redux";

import { selectUser } from '@/Redux/Slices/userSlice';

import PublicLayout from '@/Layouts/PublicLayout';
import PrivateLayout from '@/Layouts/PrivateLayout';
import { lazy, Suspense } from 'react';
import Loader from '@/Components/Global/Loader/Loader';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const HomePage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Public/HomePage"))
);
const LoginPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Public/LoginPage"))
);
const SignUpPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Public/SignUpPage"))
);
const NotFoundPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Public/NotFoundPage"))
);

const MyProfilPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Private/MyProfilPage"))
);
const SearchPostPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Private/SearchPostPage"))
);
const LastestPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Private/LastestPage"))
);
const BlogPostDetailsPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Private/BlogPostDetailsPage"))
);
const CreateOrEditPostPage = lazy(() =>
  sleep(500).then(() => import("@/Pages/Private/CreateOrEditPostPage"))
);




export const PublicRoutes = () => [
  <Route key="public-layout" element={<PublicLayout />}>
    <Route
      key="home-page"
      path="/"
      element={
        <Suspense fallback={<Loader />}>
          <HomePage />
        </Suspense>
      }
    />
    <Route
      key="login-page"
      path="/login"
      element={
        <Suspense fallback={<Loader />}>
          <LoginPage />
        </Suspense>
      }
    />
    <Route
      key="signup-page"
      path="/sign-up"
      element={
        <Suspense fallback={<Loader />}>
          <SignUpPage />
        </Suspense>
      }
    />
    <Route
      key="not-found-page"
      path="*"
      element={
        <Suspense fallback={<Loader />}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </Route>,
];

export const PrivateRoutes = () => {
  const currentUser = useSelector(selectUser);

  return [
    <Route key="private-layout" element={<PrivateLayout currentUser={currentUser} />}>
      <Route
        key="my-profil"
        path="/my-profil"
        element={
          <Suspense fallback={<Loader />}>
            <MyProfilPage />
          </Suspense>
        }
      />
      <Route
        key="search"
        path="/search"
        element={
          <Suspense fallback={<Loader />}>
            <SearchPostPage />
          </Suspense>
        }
      />
      <Route
        key="lastest"
        path="/lastest"
        element={
          <Suspense fallback={<Loader />}>
            <LastestPage />
          </Suspense>
        }
      />
      <Route
        key="post-details"
        path="/post/:id"
        element={
          <Suspense fallback={<Loader />}>
            <BlogPostDetailsPage />
          </Suspense>
        }
      />
      <Route
        key="create-post"
        path="/create-post/:id?"
        element={
          <Suspense fallback={<Loader />}>
            <CreateOrEditPostPage />
          </Suspense>
        }
      />
    </Route>,
  ];
};