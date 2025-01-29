import MobileNavBar from '../Components/NavBar/MobileNavBar'
import NavBar from '../Components/NavBar/NavBar';
import FreeImaginationSvg from '../Assets/Svg/Ilustration.svg'

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen overflow-hidden justify-center items-center pt-2 px-3 xs:pt-5 xs:px-6 gap-y-14 xs:gap-y-20 md:px-15 md:pt-0 bg-[#2C2C2C] relative select-none">
      <div className="md:hidden">
          <MobileNavBar />
      </div>
      <div className="hidden md:block">
        <NavBar />
      </div>
      <div className="flex flex-col md:flex-row gap-y-16 xs:gap-y-20 md:gap-y-0">
        <div className="flex flex-col gap-y-10">
          <h1 className="font-inria-sans font-bold text-5xl xs:text-6xl sm:text-7xl lg:text-8xl">Blog Up</h1>
          <p className="font-inria-sans text-[12px] xs:text-sm sm:text-base md:text-lg lg:text-xl md:w-1/2">
            Blog Up is a dynamic platform where creativity knows no bounds. It’s
            a space where your imagination takes center stage, empowering you to
            express your thoughts, share your passions, and let your ideas speak
            for themselves. Whether you’re writing, storytelling, or sharing
            your unique perspective, Blog Up provides the tools and community to
            bring your vision to life.
          </p>
          <div>
            <a
              href=""
              className="font-inria-sans text-[#0E0E0E] text-lg xs:text-xl lg:text-2xl bg-white py-1 px-11 rounded-[10px]"
            >
              READ MORE
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center md:justify-start md:items-start">
          <img className="xxs:-right-[1.95rem] xs:-right-[2.5rem]  md:right-0 md:top-[30%] xl:top-[25%] xxs:-bottom-[1.75rem] xs:-bottom-[2rem] xxs:-rotate-30 md:-rotate-90 absolute z-0 hidden xxs:block xxs:w-56 xxs:h-56 xs:w-64 xs:h-72 sm:w-64 sm:h-64 md:w-[24rem] md:h-[30rem] lg:w-[30rem] lg:h-[34rem] xl:w-[36rem] xl:h-[40rem]" alt="Free Imagination" src={FreeImaginationSvg}></img>
        </div>
      </div>
    </div>
  );
}

export default LandingPage