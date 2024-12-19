import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  const { amount } = await request.json()

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: 'receipt_' + Math.random().toString(36).substring(7),
  }

  try {
    const order = await razorpay.orders.create(options)
    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
  }
}
