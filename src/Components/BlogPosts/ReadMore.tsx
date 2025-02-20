import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

interface IReadMore {
  text: string;
  readMoreLink: string;
}

const ReadMoreText: React.FC<IReadMore> = ({
  text,
  readMoreLink,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, []);

  return (
    <div>
      <p
        ref={textRef}
        className={`font-inria-sans text-base line-clamp-3`}
      >
        {text}
      </p>
      {isClamped && (
        <Link to={readMoreLink} className="text-blog-up-green underline">
          read more
        </Link>
      )}
    </div>
  );
};

export default ReadMoreText;
