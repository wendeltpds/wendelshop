"use client"
import { useDispatch, useSelector } from 'react-redux'
import { Products, StateProps } from '../../type/type'
import { useEffect, useState } from 'react'
import Image from "next/image"
import FormatedPrice from './FormatedPrice'
import { resetOrder } from '@/redux/shoppingSlice'
import Link from 'next/link'

const OrderDertails = () => {
    const dispatch = useDispatch()
    const {orderData} = useSelector((state : StateProps) => state?.shopping)

    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
    let amt = 0;
    orderData?.order?.map((item: Products) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [orderData.order]);

  return (
    <div>
        {
          orderData?.order?.length > 0 ?
        <div>
              <div className=' grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-gray-300 border-b-[1px] ' >
                  <p className=' col-span-4' >Items</p>
                  <p className=' flex items-center justify-center'>Quantity</p>
                  <p className=' flex items-center justify-center'>Unit Price</p>
                  <p className=' flex items-center justify-center'>Amount</p>
              </div>
              <div>
              {orderData?.order?.map((item: Products) => (
                    <div
                      key={item?._id}
                      className="py-2 border-b-[1px] border-gray-300 grid grid-cols-7 items-center"
                    >
                      <div className="col-span-4 flex items-start gap-2 text-sm">
                        <Image
                          src={item?.image}
                          alt="product image"
                          width={500}
                          height={500}
                          className="w-12 h-12 object-cover"
                        />
    
                        <div>
                          <h3 className="text-base font-semibold mb-.5">
                            {item?.title}
                          </h3>
                          <p>{item?.description}</p>
                        </div>
                      </div>
    
                      <p className="flex items-center justify-center">
                        {item?.quantity}
                      </p>
    
                      <p className="flex items-center justify-center">
                        <FormatedPrice amount={item?.price} />
                      </p>
    
                      <p className="flex items-center justify-center">
                        <FormatedPrice amount={item?.price * item.quantity} />
                      </p>
    
                    </div>
                  ))}
              </div>
              <div className=' text-lg font-medium py-2 border-b-[1px]
              border-b-gray-300'>
                <p>Paymnent Details</p>
              </div>
              <p>
                ToTal Paid {" "}
                <span className=' text-xl font-semibold'>
                  <FormatedPrice amount={totalAmount} />
                </span>
              </p>
              <button onClick={() => dispatch(resetOrder())} className=' mt-5 border-[1px] border-gray-500 py-1 px-4 
              font-medium rounded-md hover:border-orange-600 cursor-pointer 
              duration-200'>
                Reset Order
              </button>
          </div>
          : 
          <div className=' py-10 bg-white text-black text-2xl text-center' >
                <p>nothing to show</p>
                
                <Link href={"/"} >
                  <button className='bg-black text-slate-100 w-44 h-12 
                  rounded-full text-base font-semibold mt-2 hover:bg-orange-600
                  duration-300'>Continue shopping</button>
                </Link>
          </div>
    
        }
    </div>
  )
}

export default OrderDertails

