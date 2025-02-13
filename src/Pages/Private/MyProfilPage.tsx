import _ from 'lodash';
import { useSelector } from 'react-redux';

import BlogPosts from '@/Components/BlogPosts/BlogPosts';
import { selectUserPosts } from '@/Redux/Slices/postsSlice';
import { selectUser } from '@/Redux/Slices/userSlice';

const MyProfilPage = () => {
  const currentUser = useSelector(selectUser);

  const blogPosts = useSelector((state) =>
    selectUserPosts(state, currentUser.id)
  );

  return (
    <div className="font-inria-sans h-full w-full flex flex-col items-start gap-y-7 pb-4">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">My Profil</h1>
      </div>

      <BlogPosts blogPosts={blogPosts} />
    </div>
  );
};

export default MyProfilPage