import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3002";
const OPERATOR_API_KEY = process.env.OPERATOR_API_KEY ?? "";

export async function POST() {
  try {
    if (!OPERATOR_API_KEY) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 },
      );
    }

    // 1. Create user + wallet
    const res = await axios.post(`${BACKEND_URL}/users`, null, {
      headers: { "x-api-key": OPERATOR_API_KEY },
    });

    // 2. Generate Telegram link token using the new user's API key
    const linkRes = await axios.post(`${BACKEND_URL}/telegram/link`, null, {
      headers: { "x-api-key": res.data.api_key },
    });

    let telegram_token: string = linkRes.data.token;

    return NextResponse.json({
      user_id: res.data.user_id,
      api_key: res.data.api_key,
      smart_account_address: res.data.smart_account_address,
      telegram_token,
    });
  } catch (error) {
    console.log("Error creating account:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 },
    );
  }
}
