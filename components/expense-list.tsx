import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Expense } from "@/app/actions"

const categoryLabels: Record<string, string> = {
  food: "식비",
  transport: "교통",
  shopping: "쇼핑",
  etc: "기타",
}

const ratingLabels: Record<Expense["rating"], string> = {
  good: "좋음",
  neutral: "보통",
  bad: "나쁨",
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("ko-KR").format(amount) + "원"
}

export function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        오늘 기록한 지출이 없어요.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {expenses.map((expense) => (
        <Card key={expense.id} size="sm">
          <CardHeader>
            <CardTitle>{expense.itemName}</CardTitle>
            <CardDescription>
              {categoryLabels[expense.category] ?? expense.category} ·{" "}
              {ratingLabels[expense.rating]}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="font-medium">{formatAmount(expense.amount)}</p>
            {expense.memo && (
              <p className="text-sm text-muted-foreground">{expense.memo}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
