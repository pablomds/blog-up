import lostImage from "../../Assets/NotFound/lost.jpg";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen select-none">
      <h1 className="font-inria-sans text-6xl font-bold text-blog-up-gray">404</h1>
      <p className=" font-inria-sans text-lg mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <img
        src={lostImage}
        alt="Not Found Illustration"
        className="w-72 mt-6 rounded-4xl hover:-rotate-45"
      />
      <Link
        to="/"
        className="font-inria-sans mt-6 px-4 py-2 bg-blog-up-green text-blog-up-black rounded-lg hover:bg-blog-up-gray transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage