import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

export default function OtherUser({user}) {
    const dispatch = useDispatch()
    const seletecUserhandler =(user)=>{
        dispatch(setSelectedUser(user))
    }
    const {selectedUser} = useSelector(store=>store.user)
    
  return (
    <div>
        <div onClick={()=>seletecUserhandler(user)} className={`${selectedUser?._id === user._id? 'bg-white/50 ': '' } flex items-center gap-4 bg-slate-50/20 hover:bg-slate-50/60 rounded-md  cursor-pointer  p-2`}>
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
