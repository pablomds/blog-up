import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

interface IReadMore {
  text: string;
  maxLines?: number;
  readMoreLink: string;
}

const ReadMoreText: React.FC<IReadMore> = ({
  text,
  maxLines = 3,
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
        className={`font-inria-sans text-base line-clamp-${maxLines}`}
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
