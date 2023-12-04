import { getProducts } from '@/helpers'
import  Container  from './Container';
import React from 'react'
import ProductData from './ProductData';
import { Products } from '../../type/type';
import Link from 'next/link';


const Products = async () => {

    const Produtos = await getProducts();

  return (
    <Container className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4
    gap-4 -mt-10'>
      {
        Produtos?.map((item:Products)=> (
            <ProductData item={item} key={item._id} />
        ))
      }
    </Container>
  )
}

export default Products
