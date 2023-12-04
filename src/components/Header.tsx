"use client";
import React, { useEffect, useState } from 'react'
import Container from './Container'
import Logo from './Logo'
import { IoMdCart } from 'react-icons/io'
import { FiSearch , FiLogOut } from 'react-icons/fi'
import { AiOutlineUser} from 'react-icons/ai'
import { useSession, signIn , signOut } from 'next-auth/react'
import Image from 'next/image'
import naotemimagem from '../public/logotipo-inteligente-com-o-titulo-inteligente_803633-239.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { Products, StateProps } from '../../type/type';
import FormatedPrice from './FormatedPrice';
import Link from 'next/link';
import { addUser, deleteUser } from '@/redux/shoppingSlice';
import { BsBookmarks } from 'react-icons/bs';



const Header = () => {
  const dispatch = useDispatch()
  const{ data : session} = useSession()
  const { productData , orderData } = useSelector((state: StateProps) => state.shopping);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    } else {
      dispatch(deleteUser());
    }
  }, [session, dispatch]);

  const [ToTalAmt , setToTalAmt] = useState(0)

  useEffect(() => {
    let amt = 0;
    productData.map((item:Products) => {
      amt += item.price * item.quantity
      return
    })
    setToTalAmt(amt);
    
  },[productData])
  
  return (
    <div className=' bg-bodyColor h-20 top-0 sticky z-50 ' >
    <Container  className='h-full flex items-center md:gap-x-5 justify-between md:justify-start' >
        <Logo />

        <div className=' w-full hidden md:flex items-center gap-x-1 
          border-[1px] border-lightText/50 
          rounded-full px-4 py-1.5 focus-within:border-orange-600 ' >

          <FiSearch className=" text-gray-500 group-focus-within:text-darkText 
          duration-200" />

          <input type="text"  
          placeholder='procurar produtos' 
          className=' placeholder:text-sm flex-1 outline-none'/>

        </div>

          {!session && (
          <div onClick={() => signIn()}  className=' bg-bgLight text-gray-500 flex items-center 
          justify-center p-1.5 rounded-full hover:bg-white border-[1px] border-gray-200
         hover:border-orange-500 duration-200 cursor-pointer' >
          <AiOutlineUser />
          <p className=' text-sm font-semibold'>login/Register</p>
        </div>
        )}

        <Link href={"/cart"} >
          <div className=' bg-black hover:bg-slate-950 rounded-full
            text-slate-100 hover:text-white flex items-center
              justify-center gap-x-1 px-3 py-1.5 border-[1px] border-black
            hover:border-orange-600 duration-200 relative' >

              <IoMdCart className=" text-xl" />

              <p className=' text-sm font-semibold' > <FormatedPrice amount={ToTalAmt ? ToTalAmt : 0} /></p>

              <span className='bg-white text-orange-600 
                rounded-full text-xs font-semibold 
                absolute -right-2 -top-1 w-5 h-5 flex items-center
                justify-center shadow-xl shadow-black'>
                {productData ? productData.length : 0}
              </span>
          </div>
        </Link>

        {
          session && (
            session?.user?.image ? (
              <Image src={session?.user?.image as string}
              alt='imagem do usuario'
              width={50}
              height={50}
              className=' rounded-full object-cover'
              />
            )
            : <Image src={naotemimagem}
             alt='nao tem imagem' 
             width={50}
             height={50}
             className=' rounded-full object-cover'
            /> 
          )
        }

        {
          orderData?.order?.length > 0 && session && (
            <Link href={'/order'} >
              <BsBookmarks className = "text-2xl"/>
              <p className='text-sm font-semibold'>orders</p>
            </Link>
          )

        }
       { session && (<div onClick={() => signOut()} className=' bg-bgLight text-gray-500 flex items-center 
        justify-center p-1.5 rounded-full hover:bg-white border-[1px] border-gray-200
         hover:border-orange-500 duration-200 cursor-pointer' >
            <FiLogOut className=" text-2xl" />
            <p className=' text-sm font-semibold' >logout</p>
        </div>)}
    </Container>
    </div>
  )
}

export default Header