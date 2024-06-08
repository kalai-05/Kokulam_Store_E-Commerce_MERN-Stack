import React from "react";
import {
  AiOutlinePhone,
  AiOutlineClockCircle,
  AiOutlineNotification,
} from "react-icons/ai";

const Contact = () => {
  return (
    <div className=" pt-10 pb-10 sm:pt-10 sm:pb-16 lg:pb-16 md:h-[92vh]">
      <div className=" mx-auto max-w-5xl px-4 sm:px-6 lg:px-3 py-5 bg-white rounded-3xl shadow-lg">
        <div className=" mb-4">
          <div className=" mb-6 max-w-3xl text-center sm:text-center md:mx-auto">
            <h2 className=" mb-4 font-bold tracking-tight text-black text-3xl sm:text-5xl">
              Let's Connect
            </h2>
            <p className=" mx-auto mt-4 max-w-3xl text-xl text-black">
              and start working on amazing things
            </p>
          </div>
          <div className=" flex justify-center">
            <div className=" grid md:grid-cols-2">
              <div className=" my-auto pr-6">
                <ul>
                  <li className=" flex">
                    <a
                      href="https://maps.app.goo.gl/5vfCu8XnSE46qfVt7?g_st=iw"
                      className=" transition-all duration-200 hover:scale-110 cursor-pointer"
                    >
                      <AiOutlineNotification className=" w-[70px] h-auto" />
                    </a>
                    <div className=" m-5">
                      <h3 className=" text-lg font-bold text-black ">
                        Our Address
                      </h3>
                      <p className=" text-black/85">Darmarama Street</p>
                      <p className=" text-black/85">Colombo-06</p>
                    </div>
                  </li>
                  <li className=" flex">
                    <a
                      href="https://maps.app.goo.gl/5vfCu8XnSE46qfVt7?g_st=iw"
                      className=" transition-all duration-200 hover:scale-110 cursor-pointer"
                    >
                      <AiOutlinePhone className=" w-[70px] h-auto" />
                    </a>
                    <div className=" m-5">
                      <h3 className=" text-lg font-bold text-black ">
                        Contact
                      </h3>
                      <p className=" text-black/85">Mobile:-0761597810</p>
                      <p className=" text-black/85">
                        E-Mail:-kandypan7@gmail.com
                      </p>
                    </div>
                  </li>
                  <li className=" flex">
                    <a
                      href="https://maps.app.goo.gl/5vfCu8XnSE46qfVt7?g_st=iw"
                      className=" transition-all duration-200 hover:scale-110 cursor-pointer"
                    >
                      <AiOutlineClockCircle className=" w-[70px] h-auto" />
                    </a>
                    <div className=" m-5">
                      <h3 className=" text-lg font-bold text-black ">
                        Working Hours
                      </h3>
                      <p className=" text-black/85">
                        Monday-Friday : 08:00-17:00
                      </p>
                      <p className=" text-black/85">
                        Saturday &amp; Sunday :08:00-12:00
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className=" max-w-6xl p-2 md:p-2" id="form">
                <h2 className=" mb-4 text-2xl font-bold text-black">
                  Ready To Get Started?
                </h2>
                <form action="https://getform.io/f/nbdoqoga" method="post">
                  <div className=" mb-6">
                    <div className=" mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <input
                          type="text"
                          id="name"
                          autoComplete="given-name"
                          placeholder="Your name"
                          className=" mb-2 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                          name="name"
                        />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <input
                          type="email"
                          id="email"
                          autoComplete="email"
                          placeholder="Your Email Address"
                          name="email"
                          className=" mb-2 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                        />
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <textarea
                        name="textarea"
                        id="textarea"
                        placeholder="Write Your Massage......"
                        cols="30"
                        rows="10"
                        className=" mb-2 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className=" w-full bg-black text-white px-2 py-3 font-bold text-xl rounded-md  "
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
