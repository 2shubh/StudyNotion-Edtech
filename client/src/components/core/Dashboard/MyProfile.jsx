import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-8 md:mb-14 text-2xl md:text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 px-6 md:px-12 gap-4 md:gap-0">
       <div className="flex items-center gap-x-4">
  {user?.image && user.image.trim() !== "" ? (
    <img
      src={user.image}
      alt={`profile-${user?.firstName}`}
      className="aspect-square w-[50px] md:w-[60px] rounded-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.style.display = "none"; // Hide broken image
        e.target.parentNode.querySelector(".fallback-avatar").style.display = "flex";
      }}
    />
  ) : null}

  {/* Fallback initials avatar, hidden by default unless image fails */}
  <div
    className="fallback-avatar hidden aspect-square w-[50px] md:w-[60px] items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-white uppercase"
  >
    {`${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`}
  </div>

  <div className="space-y-1">
    <p className="text-lg font-semibold text-richblack-5">
      {user?.firstName + " " + user?.lastName}
    </p>
    <p className="text-xs text-richblack-300">{user?.email}</p>
  </div>
</div>

        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-6 md:my-10 flex flex-col gap-y-6 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 px-6 md:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-6 md:my-10 flex flex-col gap-y-6 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 px-6 md:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-col md:flex-row max-w-full md:max-w-[500px] gap-y-5 md:gap-y-0 md:justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}