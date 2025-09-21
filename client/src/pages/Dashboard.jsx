import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

import Sidebar from "../components/core/Dashboard/Sidebar"

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
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-16 left-4 z-50 rounded-md bg-richblack-800 p-2 text-richblack-25 md:hidden"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 z-40 bg-richblack-900 bg-opacity-75 md:hidden" 
             onClick={() => setShowSidebar(false)} />
      )}

      {/* Sidebar for mobile */}
      <div className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-richblack-800 transition-transform duration-300 ease-in-out md:hidden ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="pt-16">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:ml-0">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 px-4 md:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard


// import { useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"
// import Sidebar from "../components/core/Dashboard/Sidebar"
// import { useState } from "react"
// import { FiMenu } from "react-icons/fi"

// function Dashboard() {
//   const { loading: profileLoading } = useSelector((state) => state.profile)
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const [showSidebar, setShowSidebar] = useState(false)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative min-h-[calc(100vh-3.5rem)] flex">
//       {/* Mobile Menu Button */}
//       <button
//         className="absolute top-4 left-4 z-20 text-white text-2xl md:hidden"
//         onClick={() => setShowSidebar((prev) => !prev)}
//       >
//         <FiMenu />
//       </button>

//       {/* Sidebar for desktop */}
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>

//       {/* Sidebar for mobile */}
//       {showSidebar && (
//         <div className="fixed inset-y-0 left-0 z-30 w-64 bg-richblack-800 p-4  block md:hidden">
//           <Sidebar />
//           <button
//             className="mt-4 text-yellow-50"
//             onClick={() => setShowSidebar(false)}
//           >
//             Close
//           </button>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
