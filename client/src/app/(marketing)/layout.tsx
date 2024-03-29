import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Layout({children} : Props) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      {/* <Navbar /> */}
      {children}
    </div>
  )
}
