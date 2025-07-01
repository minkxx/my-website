import React from 'react'
import Link from 'next/link'
import { FlaskConical, CircleUser, Coffee, House } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between p-4 h-16 text-white sticky top-0'>
      <div></div>
      <div className='flex gap-3 sm:gap-6'>
        <Link href={"/"} className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-l'><House /><span className='hidden sm:inline'>Home</span></Link>
        <Link href={"/projects"} className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-l'><FlaskConical /><span className='hidden sm:inline'>Projects</span></Link>
        <Link href={"/contact"} className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-l'><CircleUser /><span className='hidden sm:inline'>Contact Me</span></Link>
        <Link href={"/buycoffee"} className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold shadow-lg hover:bg-gradient-to-l'><Coffee /><span className='hidden sm:inline'>Buy Me A Coffee</span></Link>
      </div>
    </nav>
  )
}

export default Navbar
