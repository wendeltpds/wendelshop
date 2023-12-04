import Products from "@/components/Products"
import Banner from "../components/Banner"
import Link from "next/link"


export default  function Home() {

  return (
    <main>
        <Banner />
        <Products />
        <Link href={"/order"} > 
            pedidos
        </Link>
    </main>
  )
}
