import Navbar from '@/components/navbar'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Layout({children} : Props) {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <div className='h-full flex flex-col items-center justify-center'>
          {children}
        </div>
    </div>
  )
}
