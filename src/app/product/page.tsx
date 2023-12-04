import { getSingleProudct, getTrendingProducts } from "@/helpers"
import Container from "@/components/Container";
import { Products } from "../../../type/type";
import ProductData from "@/components/ProductData";
import SingleProduct from "@/components/SingleProduct";

type Props = {
  searchParams:{[key:string]:string | string[] | undefined}
}

const ProductPage = async ({searchParams}: Props) => {
  const _idSting = searchParams?._id;
  const _id = Number(_idSting)
  const product = getSingleProudct(_id);
  const data = await getTrendingProducts()

  return (
    <div>
      <Container>
        <SingleProduct products={product} />
        <div>
          <p className=" text-xl py-1 font-semibold" >tranding Products</p>
          <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4" >
            {data?.map((item: Products) => (
                <ProductData key={item._id} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProductPage
