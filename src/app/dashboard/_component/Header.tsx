"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'

function Header() {
    const path = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleNavigation = (url) => {
        setMenuOpen(false); // Close menu on navigation
        router.push(url);
    };

    return (
        <div className='flex h-20 p-4 items-center justify-between bg-secondary shadow-lg'>
            <Image src={'/logo.svg'} width={60} height={40} alt='logo' />
            
            {/* Desktop Menu */}
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard' && 'text-primary font-bold' }
                `}  onClick={() => handleNavigation('/dashboard')}
                >Dashboard</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard/myinterviews' && 'text-primary font-bold' }
                `} onClick={() => handleNavigation('/dashboard/myinterviews')}
                >Interviews</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard/upgrade' && 'text-primary font-bold' }
                `} onClick={() => handleNavigation('/dashboard/upgrade')}
                >Upgrade</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == '/dashboard/howitworks' && 'text-primary font-bold' }
                `} onClick={() => handleNavigation('/dashboard/about-us')}
                >About Us</li>
            </ul>

            <div className='flex items-center gap-3'>
                <UserButton />
                {/* Mobile Menu Icon */}
                <div className='md:hidden'>
                    <FaBars className='text-primary cursor-pointer' size={24} onClick={() => setMenuOpen(!menuOpen)} />
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className='absolute top-20 left-0 w-full bg-secondary p-4 md:hidden'>
                    <ul className='flex flex-col gap-4'>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                            ${path == '/dashboard' && 'text-primary font-bold' }
                        `} 
                        onClick={() => handleNavigation('/dashboard')}
                        >Dashboard</li>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                            ${path == '/dashboard/myinterviews' && 'text-primary font-bold' }
                        `}
                        onClick={() => handleNavigation('/dashboard/myinterviews')}
                        >Interviews</li>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                            ${path == '/dashboard/upgrade' && 'text-primary font-bold' }
                        `}
                        onClick={() => handleNavigation('/dashboard/upgrade')}
                        >Upgrade</li>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                            ${path == '/dashboard/howitworks' && 'text-primary font-bold' }
                        `}
                        onClick={() => handleNavigation('/dashboard/about-us')}
                        >About Us</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Header
