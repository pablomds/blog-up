import React from 'react'

const BlogPostDetailsPage = () => {
  return (
    <div className="flex flex-col gap-y-5 items-start pb-20">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Post</h1>
      </div>
      <div className="flex flex-col gap-y-3">
        <h1 className="font-inria-sans text-3xl text-blog-up-green">
          15 Disadvantages Of Freedom And How You Can Workaround It.
        </h1>
        <span className="font-inria-sans text-base text-blog-up-gray font-light">
          written by @username
        </span>
      </div>
      <div className="flex flex-col gap-y-3">
        <p className="font-inria-sans text-base">
          {" "}
          <span className="text-4xl">L</span>
          orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Luctus venenatis
          lectus magna fringilla urna. Aliquet porttitor lacus luctus accumsan
          tortor posuere ac ut. Eleifend quam adipiscing vitae proin sagittis
          nisl rhoncus. Faucibus ornare suspendisse sed nisi lacus sed viverra
          tellus. Urna molestie at elementum eu facilisis sed odio morbi. Eget
          mi proin sed libero enim. Quis varius quam quisque id diam vel quam.
          Duis at tellus at urna condimentum mattis pellentesque. Nulla facilisi
          cras fermentum odio eu feugiat pretium nibh. Ut tellus elementum
          sagittis vitae et leo. Cursus in hac habitasse platea dictumst quisque
          sagittis purus. Odio facilisis mauris sit amet. Quis vel eros donec ac
          odio. Orci a scelerisque purus semper. Amet justo donec enim diam
          vulputate ut pharetra. Arcu odio ut sem nulla pharetra diam sit amet
          nisl. Sapien eget mi proin sed libero enim. Nunc sed blandit libero
          volutpat sed cras ornare arcu dui. Neque viverra justo nec ultrices
          dui sapien eget mi. Cras semper auctor neque vitae tempus quam
          pellentesque nec nam. Vitae tortor condimentum lacinia quis vel eros
          donec ac. Consectetur adipiscing elit pellentesque habitant morbi.
          Enim tortor at auctor urna nunc id cursus metus. Elit sed vulputate mi
          sit. Quis viverra nibh cras pulvinar mattis nunc sed. In aliquam sem
          fringilla ut morbi tincidunt. Orci a scelerisque purus semper.
          Dignissim sodales ut eu sem integer vitae justo.{" "}
        </p>
        <div className="flex flex-row justify-between">
          <div className="md:hidden font-inria-sans text-base">27 May 2025</div>
          <div className="font-inria-sans text-base">@userblabla</div>
        </div>
      </div>
      <div className="flex flex-row gap-x-2">
        <div className="border-1 border-blog-up-green rounded-2xl px-5 py-1">
          <span className="font-inria-sans font-light text-blog-up-green">
            #thinkfree
          </span>
        </div>
        <div className="border-1 border-blog-up-green rounded-2xl px-5 py-1">
          <span className="font-inria-sans font-light text-blog-up-green">
            #imagination
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogPostDetailsPage