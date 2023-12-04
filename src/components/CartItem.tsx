"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Products, StateProps } from '../../type/type'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'
import { FiChevronLeft , FiChevronRight  } from 'react-icons/fi'
import { decreaseQuantity, deleteProduct, increaseQuantity } from '@/redux/shoppingSlice'
import toast, { Toaster } from 'react-hot-toast'
import FormatedPrice from './FormatedPrice'


const CartItem = () => {
    const [ valorTotal , setvalorTotal] = useState(0)
    const { productData  } = useSelector((state: StateProps) => state.shopping)
    const dispatch = useDispatch()

    useEffect(() => {
        let amt = 0 
        productData.map((item:Products) => {
            amt += item.price * item.quantity
            return
        })
        setvalorTotal(amt)
    },[productData])

  return (
    <div className=' flex flex-col gap-y-2' >
      <div className=' hidden lg:inline-flex items-center justify-between 
      font-semibold bg-slate-100 p-2' >
        <p className=' w-1/3' >Products</p>
        <p className=' w-1/3 flex items-center justify-center' >Quantity</p>
        <p className=' w-1/3 flex items-center justify-end' >subtotal</p>
      </div>

      <div className=' flex flex-col gap-y-2' >
        {
            productData?.map((item:Products) => (
                <div 
                key={item._id}
                className=' w-full bg-slate-100 p-4 flex flex-col 
                md:flex-row items-center justify-between gap-4'>
                    <div className=' flex items-center gap-x-3 w-full
                     md:w-1/3' >
                        <span 
                        onClick={() => dispatch(deleteProduct(item._id))}
                        className=' text-lg hover:text-red-600 
                        cursor-pointer duration-200' 
                        >
                          < AiOutlineClose />
                        </span>
                        <Image
                         src={item.image}
                         alt='imagens carrinho'
                         width={500} 
                         height={500}
                         className=' w-20 h-20 object-cover'
                         loading='lazy'
                          />
                    </div>
                    <div className=' flex items-center justify-start gap-x-3 
                    border-[1px] border-slate-300 py-2 px-4 w-full md:w-auto'>
                      <p>Quantity</p>
                      <div className=' flex items-center text-lg
                       w-20 justify-between' >

                        <span 
                        onClick={() => dispatch(decreaseQuantity(item))}
                        className=' cursor-pointer' >
                          <FiChevronLeft />
                        </span>

                        <span>
                          {item?.quantity}
                        </span>

                        <span 
                        onClick={() => dispatch(increaseQuantity(item))}
                        className=' cursor-pointer' >
                          <FiChevronRight/>
                        </span>

                      </div>
                    </div>
                    <div className=' w-full md:w-1/3 flex items-end justify-start md:justify-end ' >
                      <p className=' text-lg font-semibold' >
                        <FormatedPrice amount={item?.price * item?.quantity} />
                      </p>
                    </div>
                </div>
            ))}
      </div>
      <div>
      </div>
    </div>
  )
}

export default CartItem
