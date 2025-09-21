import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-full max-w-maxContent flex-col-reverse justify-between gap-y-8 md:gap-y-12 py-8 md:py-12 lg:flex-row lg:gap-y-0 lg:gap-x-12">
          <div className="mx-auto w-full max-w-[450px] lg:mx-0">
            <h1 className="text-[1.5rem] md:text-[1.875rem] font-semibold leading-[2rem] md:leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.5rem] md:leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-full max-w-[450px] lg:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="w-full h-auto"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-2 md:-top-4 right-2 md:right-4 z-10 w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template