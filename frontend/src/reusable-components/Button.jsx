import React from 'react'

function Button({children, ...props}) {
  return (
    <button className= "tracking-wide bg-[#6366F1] py-2 px-3 text-[#FFFFFF] capitalize rounded-md mt-5" {...props}>{children}</button>
  )
}

export default Button
