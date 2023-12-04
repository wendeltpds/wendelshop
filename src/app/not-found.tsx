import Container from '@/components/Container';
import React from 'react'
import Link from 'next/dist/client/link';

const NotFound = () => {
  return (
    <Container className=' flex items-center justify-center py-20' >
        <div className=' max-w-2xl min-h-[500px] flex flex-col
         items-center justify-center gap-y-5'>
            <h2 className=' text-4xl font-bold' >
                pagina nao encontrada
            </h2>

            <p className=' text-base font-medium text-center' >
                Oops! A pagina que voce esta procurando não foi encontrada.
            </p>

            <Link href={"/"} className=' bg-black text-slate-100
            w-44 h-12 rounded-full text-base font-semibold flex 
            items-center justify-center hover:bg-orange-600
            hover:text-white duration-200' >
                Voltar para Home
            </Link>
        </div>
    </Container>
  )
}

export default NotFound;
