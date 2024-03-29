'use client'

import { RegisterForm } from '@/components/register-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

function BackButton() {
  return(
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute left-4 top-4 md:left-8 md:top-8"
      )}
    >
      <>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </>
    </Link>
  )
}

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <BackButton />

      <RegisterForm />
    </div>
  )
}
