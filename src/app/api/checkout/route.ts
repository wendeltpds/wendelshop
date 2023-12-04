import {NextResponse , NextRequest} from "next/server"
import Stripe from "stripe"
import { Products } from "../../../../type/type"

export const POST = async(request:NextRequest)=> {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        try {
            const reqBody = await request.json()
            const {items , email} = reqBody;

            const extractingItems = items.map((item: Products) => ({
                quantity: item.quantity,
                price_data: {
                  currency: "BRL",
                  unit_amount: item.price * 100,
                  product_data: {
                    name: item.title,
                    description: item.description,
                    images :[item.image],
                  },
                },
              }));

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: extractingItems,
                mode: 'payment',
                success_url:`${process.env.NEXTAUTH_URL}/success`,
                cancel_url:`${process.env.NEXTAUTH_URL}/checkout`,
                metadata:{
                    email,
                }
            })

            return NextResponse.json({
                message: "connection is active!",
                success: true,
                id: session.id,
            })
        } catch (erro:any) {
            return NextResponse.json({erro: erro.message} , { status: 500});
        }
}