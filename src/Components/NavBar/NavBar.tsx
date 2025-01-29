import { Links } from "react-router"

const navLinks = ["Home", "About", "Contact", "Login", "Sign Up"]

const NavBar = () => {
  return (
    <nav className="w-full h-[58px] py-2 px-5 flex flex-row justify-between absolute top-0 left-0">
      <div className="font-inria-sans text-bold text-4xl">Blog Up</div>
      <div className="flex flex-row items-center gap-x-10">
        {
          navLinks.map(link => {
            return <div className="font-inria-sans text-base">{link}</div>
          })
        }
      </div>
    </nav>
  )
}

export default NavBar