import React from 'react'

function UserLocation({ title }) {
  return (
    <div className="flex items-center justify-around my-6">
      <p className="text-white text-lg font-medium first capitalize placeholder:lowercase">
        {title}
      </p>
    </div>
  )
}

export default UserLocation
