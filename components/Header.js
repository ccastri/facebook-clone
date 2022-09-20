import Image from 'next/image'
import React from 'react'


import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    UserGroupIcon,
    ViewGridIcon,
} from '@heroicons/react/solid'
import {
    FlagIcon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon,
} from '@heroicons/react/outline'
import { useSession, signOut } from "next-auth/react"
import { HeaderIcon } from './HeaderIcon'


export const Header = () => {
    const { data: session, status } = useSession()
    return (
        <div className='flex items-center sticky top-0 z-50 bg-white p-2 lg:px-5 shadow-md'>
            {/* <h1 className="text-3xl font-bold">Header</h1> */}
            {/* Left */}
            <div className="flex items-center">
                <Image
                    src="https://links.papareact.com/5me"
                    alt=""
                    width={40}
                    height={40}
                    layout="fixed" />
            </div>
            <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">

                <SearchIcon
                    className="h-5" />
                <input
                    className='hidden md:inline-flex  ml-2 bg-transparent placeholder-gray-500 outline-none'
                    type="text" placeholder='Search on Facebook' />
            </div >

            {/* // center */}
            <div className='flex justify-center flex-grow'>
                <div className="flex space-x-6">


                    <HeaderIcon active Icon={HomeIcon} />
                    <HeaderIcon Icon={FlagIcon} />
                    <HeaderIcon Icon={PlayIcon} />
                    <HeaderIcon Icon={ShoppingCartIcon} />
                    <HeaderIcon Icon={UserGroupIcon} />
                </div>
            </div>
            {/* Profile picture */}
            <div className="flex items-center sm:space-x-2">
                <Image
                    onClick={signOut}
                    className="rounded-full cursor-pointer"
                    src={session.user.image}
                    alt=""
                    width={40}
                    height={40}
                    layout="fixed" />

                {/* // Right */}
                <p className=" whitespace-nowrap font-semibold pr-3">{session.user.name}</p>
                <ViewGridIcon className="icon" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <ChevronDownIcon className="icon" />
            </div>
        </div>
    )
}

