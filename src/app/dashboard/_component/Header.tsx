import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex p-4'>
        <Image src={'/logo.svg'} width={100} height={100} alt='logo'/>
        <ul>
            <li>Dashboard</li>
            <li>Questions</li>
            <li>Upgrade</li>
            <li>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
