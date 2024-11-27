import React from 'react'
import { IoIosSearch } from "react-icons/io";
import OtherUsers from './OtherUsers';

export default function Sidebar() {
  return (
    <div className='p-2'>
     <form action='' className='flex items-center gap-2'>
        <input type=' text' className='input input-bordered rounded-md text-slate-700 bg-white' placeholder='Search...'/>
        <button className='btn bg-zinc-300 border-none hover:bg-slate-500'>
            <IoIosSearch size={22} className='text-slate-50'/>
        </button>
     </form>
     <div className="divider divider-primary"></div>
     <OtherUsers/>
     <div className='my-2'>
       <button className='btn btn-sm bg-slate-200 text-slate-700 border-none hover:bg-slate-300'>Logout</button>
     </div>
    </div>
  )
}
