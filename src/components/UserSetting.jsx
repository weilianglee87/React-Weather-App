import React, { useState, useEffect } from 'react'
import { UilPlus } from '@iconscout/react-unicons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserLocation from './UserLocation'
import { UilTrash } from '@iconscout/react-unicons'

function UserSetting({ inputList, setInputList }) {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleAddInput = () => {
    if (!inputValue) {
      toast.error('Name input is unavaliable')
    } else if (!/^[a-zA-Z]+$/.test(inputValue)) {
      toast.error('Invalid Input')
    } else if (inputList.length >= 5) {
      toast.error('Max 5 Countries')
    } else {
      setInputList([
        ...inputList,
        { id: inputList.length + 1, title: inputValue },
      ])
      setInputValue('')
      localStorage.setItem(
        'inputList',
        JSON.stringify([
          ...inputList,
          { id: inputList.length + 1, title: inputValue },
        ])
      )
    }
  }

  const handleReset = () => {
    setInputList([])
    localStorage.removeItem('inputList')
  }

  useEffect(() => {
    const storedInputList = localStorage.getItem('inputList')
    if (storedInputList) {
      setInputList(JSON.parse(storedInputList))
    }
  }, [setInputList])

  return (
    <>
      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
          <input
            type="text"
            value={inputValue}
            placeholder="search for city..."
            onChange={handleInputChange}
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none first capitalize placeholder:lowercase"
          />
          <UilPlus
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleAddInput}
          />
        </div>
      </div>
      <div className="flex items-center justify-around my-6">
        {inputList.map((item) => (
          <UserLocation key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
      <button
        className=" text-white text-lg font-medium "
        onClick={handleReset}
      >
        <UilTrash />
      </button>
    </>
  )
}

export default UserSetting
