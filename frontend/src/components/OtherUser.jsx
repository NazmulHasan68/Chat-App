import React from 'react'

export default function OtherUser({user}) {
  return (
    <div>
        <div className='flex items-center gap-4 bg-slate-50/60 rounded-md hover:bg-slate-50/50 cursor-pointer  p-2'>
            <div className='avatar online'>
                <div className='w-10 h-10 rounded-full'>
                    <img alt='dp' src={user?.profilePhoto}/>
                </div>
            </div>
            <div className='text-slate-700'>
                <p>{user?.fullname}</p>
            </div>
        </div>
        <div className='divider my-0 py-0 h-1'></div>
    </div>
  )
}
