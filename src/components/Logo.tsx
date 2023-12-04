import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <h3>
        <Link href={"/"}>
            <h3 className=' text-3xl font-semibold hover:text-orange-500 
            cursor-pointer duration-200' >
                smart.
            </h3>
        </Link>
    </h3>
  )
}

export default Logo
