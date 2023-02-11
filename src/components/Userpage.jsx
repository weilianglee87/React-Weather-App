import React from 'react'
import UserSetting from './UserSetting'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { UilHome } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'

function Userpage() {
  const [inputList, setInputList] = useState([])

  return (
    <>
      <div
        className={`mx-auto max-w-screen-md mt-4 py-5 px-10 bg-gradient-to-br from-cyan-700 to to-blue-700 h-fit shadow-xl shadow-gray-400 `}
      >
        <Link
          className="flex items-center justify-around my-6 text-white text-lg font-medium "
          to={{
            pathname: '/',
            search: `inputList=${encodeURIComponent(
              JSON.stringify(inputList)
            )}`,
          }}
        >
          <UilHome />
        </Link>
        <div className="flex items-center justify-around my-6 text-white text-lg font-medium ">
          Select 5 Countries
        </div>
        <UserSetting inputList={inputList} setInputList={setInputList} />

        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      </div>
    </>
  )
}

export default Userpage
