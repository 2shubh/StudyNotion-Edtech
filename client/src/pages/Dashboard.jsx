// import { useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"

// import Sidebar from "../components/core/Dashboard/Sidebar"

// function Dashboard() {
//   const { loading: profileLoading } = useSelector((state) => state.profile)
//   const { loading: authLoading } = useSelector((state) => state.auth)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]">

//    <Sidebar />

//       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { useState } from "react"
import { FiMenu } from "react-icons/fi"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [showSidebar, setShowSidebar] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex">
      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 z-20 text-white text-2xl md:hidden"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        <FiMenu />
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar for mobile */}
      {showSidebar && (
        <div className="fixed inset-y-0 left-0 z-30 w-64 bg-richblack-800 p-4  block md:hidden">
          <Sidebar />
          <button
            className="mt-4 text-yellow-50"
            onClick={() => setShowSidebar(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
