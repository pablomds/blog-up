import MobileBackgroundImage from "../../Assets/Background/background-about-page-mobile.jpg"

const AboutPage = () => {

  const Mobile = () => {
    return (
      <div
        className="md:hidden min-h-screen w-screen select-none bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${MobileBackgroundImage})` }}
      >
        {/* Overlay transparent avec opacité uniquement sur l'image de fond */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#2C2C2C] opacity-97"></div>

        <div className="container mx-auto px-2.5 pt-13 flex flex-col gap-y-6 relative z-10">
          <h1 className="font-inria-sans font-bold text-center text-5xl">
            About
          </h1>
          <div className="flex flex-col gap-y-7">
            <p className="font-inria-sans text-base">
              Welcome to Blog Up – a space where creativity and imagination
              converge. Here, every post is a canvas, and every word is a
              brushstroke of self-expression. Blog Up is designed to inspire,
              inform, and connect, offering a platform for sharing ideas,
              stories, and passions that resonate. Whether you're here to
              explore fresh perspectives, discover engaging content, or find
              your voice as a writer, Blog Up is your companion on this journey.
              Let your imagination speak, and together, let’s build a world of
              endless inspiration.
            </p>
            <div className="flex flex-col">
              <p className="font-inria-sans italic text-2xl">
                “Logic will get you from A to B. Imagination will take you
                everywhere.”
              </p>
              <span className="font-inria-sans text-base">Albert Einstein</span>
            </div>
            <p className="font-inria-sans text-base">
              Blog Up is more than just a website; it’s a hub for creativity,
              connection, and exploration. My goal with this platform is to
              provide a space where ideas come to life, stories are shared, and
              voices are heard. Whether it’s through insightful articles,
              engaging stories, or inspiring perspectives, I want Blog Up to be
              a place where readers and writers alike can find value and
              inspiration. This website is about building a community that
              thrives on imagination, fuels curiosity, and empowers everyone to
              express themselves authentically. Together, let’s create something
              meaningful.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Desktop = () => {
    return (
      <div
        id="about"
        className="max-md:hidden min-h-screen w-screen bg-[#2C2C2C]"
      >
        <div className="flex min-h-screen">
          <div
            className="flex justify-center items-center w-1/5 min-h-full bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${MobileBackgroundImage})` }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#000000] opacity-75"></div>
            <h1 className="font-inria-sans font-bold text-center text-8xl -rotate-90">
              About
            </h1>
          </div>
          <div className="h-min-h-screen  bg-white w-1.5"></div>
          <div className="flex justify-center items-center container mx-auto pl-28 pr-44">
            <p className="font-inria-sans text-2xl">
              Welcome to Blog Up – a space where creativity and imagination
              converge. Here, every post is a canvas, and every word is a
              brushstroke of self-expression. Blog Up is designed to inspire,
              inform, and connect, offering a platform for sharing ideas,
              stories, and passions that resonate. Whether you're here to
              explore fresh perspectives, discover engaging content, or find
              your voice as a writer, Blog Up is your companion on this journey.
              Let your imagination speak, and together, let’s build a world of
              endless inspiration.
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div id="about" className="">
      <Mobile />
      <Desktop />
    </div>
  );
}

export default AboutPage