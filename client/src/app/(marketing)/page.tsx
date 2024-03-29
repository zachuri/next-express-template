"use client"

import MarketingCard from '@/components/marketing-card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const marketingInfo = [
  {
    title: 'Logistics',
    description: "Pre-screeniing patients to match you with the right specialist!" 
  },
  {
    title: 'Communication',
    description: "Enhancing patient communication, and improving post-visit follow-up procedures." 
  },
  {
    title: 'Appointments',
    description: "We'll find a specialist for you! Just schedule one" 
  },
  {
    title: 'AI Evaluation',
    description: "Integration of AI to analyze SDOH and ECM/HRSN assessments, enhancing pre-visit preparation." 
  }
]

export default function Home() {
	return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center text-sm lg:flex justify-end">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          >
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "hover:text-primary"
              )}
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
         <section className='text-center flex flex-col items-center'>
           <h1 className='text-8xl uppercase font-medium'>Afya Concierge</h1>
           <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
             A Virtual Referral Platform to match patients and specialist for effiecient healthcare delivery.
           </p>
         </section>

      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {marketingInfo.map((marketing, index) => (
          <MarketingCard key={index} tilte={marketing.title} description={marketing.description} />
        ))}
      </div>
    </main>



	);
}
