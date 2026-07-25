import { createExpense, getTodayExpenses } from "@/app/actions"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"

export default async function Page() {
  const todayExpenses = await getTodayExpenses()

  return (
    <div className="flex min-h-svh justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-lg font-medium">오늘 지출 기록하기</h1>
        <ExpenseForm onSubmit={createExpense} />

        <h2 className="mt-8 mb-4 text-base font-medium">오늘 결제한 내역</h2>
        <ExpenseList expenses={todayExpenses} />
      </div>
    </div>
  )
}
