import { createExpense } from "@/app/actions"
import { ExpenseForm } from "@/components/expense-form"

export default function Page() {
  return (
    <div className="flex min-h-svh justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-lg font-medium">오늘 지출 기록하기</h1>
        <ExpenseForm onSubmit={createExpense} />
      </div>
    </div>
  )
}
