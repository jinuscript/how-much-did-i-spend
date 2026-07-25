"use server"

import { revalidatePath } from "next/cache"

import { createServiceClient } from "@/lib/supabase/server"
import type { ExpenseFormValues } from "@/components/expense-form"

// TODO: 로그인 기능 추가 시 auth.uid()로 교체.
// auth.users에 만들어둔 placeholder 계정(placeholder@money-book.local)의 id.
const TEMP_USER_ID = "bd9bf0f4-d1d4-451d-9b4e-45eb7a38b614"

export async function createExpense(values: ExpenseFormValues) {
  const supabase = createServiceClient()

  const { error } = await supabase.from("expenses").insert({
    user_id: TEMP_USER_ID,
    amount: values.amount,
    item_name: values.itemName,
    category: values.category,
    rating: values.rating,
    paid_at: values.paidAt,
    memo: values.memo || null,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/")
}

export type Expense = {
  id: string
  amount: number
  itemName: string
  category: string
  rating: "good" | "neutral" | "bad"
  paidAt: string
  memo: string | null
}

export async function getTodayExpenses(): Promise<Expense[]> {
  const supabase = createServiceClient()
  const today = new Date().toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from("expenses")
    .select("id, amount, item_name, category, rating, paid_at, memo")
    .eq("user_id", TEMP_USER_ID)
    .eq("paid_at", today)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data.map((row) => ({
    id: row.id,
    amount: row.amount,
    itemName: row.item_name,
    category: row.category,
    rating: row.rating,
    paidAt: row.paid_at,
    memo: row.memo,
  }))
}
