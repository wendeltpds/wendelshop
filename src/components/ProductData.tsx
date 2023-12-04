'use client'
import { calculatePercentage } from "@/helpers"
import { ItemProps} from "../../type/type"
import Image from 'next/image'
import FormatedPrice from "./FormatedPrice"
import { IoIosStar } from "react-icons/io"
import Link from "next/dist/client/link"
import { useDispatch } from "react-redux"
import { addToCart } from "@/redux/shoppingSlice"
import toast, { Toaster } from 'react-hot-toast';

const ProductData = ({item}: ItemProps ) => {
  const dispatch = useDispatch();

  const startArray = Array.from({length: item?.rating} , (_, index)=> (
    <span key={index} className=" text-yellow-400" >
      <IoIosStar />
    </span>
  ));

  return (
    <div className=" w-full rounded-lg overflow-hidden relative" >
      <div>

        <Link  href={{pathname: "/product", query: {_id: item._id} }} >
          <div  className=" w-full h-96 group overflow-hidden" >

            <Image src={item?.image} alt="imagem dos produtos"
            width={500} height={500} 
            className=" w-full h-full object-cover group-hover:scale-110
            duration-200 rounded-t-lg"
            />   

            {
              item?.isNew && (
                <span className=" absolute top-2 right-2 font-medium 
                text-xs py-1 px-3 rounded-full bg-white group-hover:text-white
               group-hover:bg-orange-600 duration-200" >new Arrival</span>
              )
            }
          </div>
        </Link>

          <div className=" border-[1px] border-slate-300 border-t-0
          px-2 py-4 flex flex-col gap-y-2 bg-white rounded-b-lg" >

            <p>{item.title}</p>

            <div className=" flex items-center justify-between" >

                <div className=" border-[1px] border-orange-600 py-1 px-4 rounded-full text-xs" >
                  <p>{calculatePercentage( item?.oldPrice , item?.price)}% off</p>
                </div>

                <div className=" flex items-center gap-x-2" >
                  <span className=" text-slate-500 line-through text-sm" >
                    <FormatedPrice amount={item?.oldPrice} />
                  </span>

                  <span className=" font-semibold" >
                      <FormatedPrice amount={item?.price} />
                  </span>

                </div>
            </div>
            <div className=" flex items-center justify-between" >

              <button onClick={() => dispatch(addToCart(item)) && toast.success(`${item.title.substring(0 , 15)} adicionado com sucesso!`)} 
              className=" bg-orange-600 px-4 py-2 text-sm tracking-wide rounded-full
              text-slate-100 hover:bg-orange-800 hover:text-white duration-200 " >
                add to cart
              </button>

              <div className=" flex items-center gap-x-1" >{startArray}</div>

            </div>
          </div>
      </div>
      <Toaster />
    </div>
  )
}

export default ProductData
