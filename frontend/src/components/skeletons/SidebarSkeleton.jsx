import React from 'react'
import { User } from 'lucide-react';

const SidebarSkeleton = () => {
    //create 8 skeletons items
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            {/* header */}
            <div className="border-b bg-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <User className='w-6 h-6' />
                    <span className="font-medium hidden lg:block">
                        Chats
                    </span>
                </div>
            </div>

            {/* skeleton chats */}
            <div className="overflow-y-auto w-full py-3">
                {
                    skeletonContacts.map((_, idx) => (
                        <div key={idx} className="w-full p-3 flex items-center gap-3">
                            {/* avatar skeleton */}
                            <div className="relative mx-auto lg:mx-0">
                                <div className='size-12 rounded-full skeleton' />
                            </div>

                            {/* user info skeleton- only visible in large screen */}
                            <div className="hidden lg:block text-left min-w-0 flex-1">
                                <div className='skeleton h-4 w-32 mb-2' />
                                <div className='skeleton h-4 w-32' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </aside>
    )
}

export default SidebarSkeleton