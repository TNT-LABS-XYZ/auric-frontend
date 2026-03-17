import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:3002'
const OPERATOR_API_KEY = process.env.OPERATOR_API_KEY ?? ''

export async function POST() {
  if (!OPERATOR_API_KEY) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  // 1. Create user + wallet
  const userRes = await fetch(`${BACKEND_URL}/users`, {
    method: 'POST',
    headers: { 'x-api-key': OPERATOR_API_KEY },
  })

  if (!userRes.ok) {
    const body = await userRes.json().catch(() => ({}))
    return NextResponse.json(
      { error: body?.message ?? 'Failed to create account' },
      { status: userRes.status },
    )
  }

  const user = await userRes.json()

  // 2. Generate Telegram link token using the new user's API key
  const linkRes = await fetch(`${BACKEND_URL}/telegram/link`, {
    method: 'POST',
    headers: { 'x-api-key': user.api_key },
  })

  let telegram_token: string | null = null
  if (linkRes.ok) {
    const linkData = await linkRes.json()
    telegram_token = linkData.token
  }

  return NextResponse.json({
    user_id: user.user_id,
    api_key: user.api_key,
    wallet_address: user.wallet_address,
    telegram_token,
  })
}
