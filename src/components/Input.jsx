import React from 'react'
import { forwardRef } from 'react'
//creatinng a usable input component

const Input =  forwardRef(function Input({label, textarea, ...props}, ref) {
  const tailwindClass = "bg-neutral-400 flex-1 w-full focus:outline-none focus:border-b-2 border-0 focus:border-bottomColor focus:text-amber-950 mb-4"
  return (
    <>
      <p className = "w-10/12">
          <label htmlFor="tile" className = "uppercase block flex-1 w-full font-semibold ">{label}</label>
          {textarea ? <textarea className = {tailwindClass} {...props} ref = {ref}/> : <input className = {tailwindClass} {...props} ref = {ref}/>}               
      </p>
    </>
  )
})

export default Input
