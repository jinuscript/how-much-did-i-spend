"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const categoryItems = [
  { label: "카테고리 선택", value: null },
  { label: "식비", value: "food" },
  { label: "교통", value: "transport" },
  { label: "쇼핑", value: "shopping" },
  { label: "기타", value: "etc" },
]

const expenseFormSchema = z.object({
  amount: z.coerce.number().positive("금액은 0보다 커야 합니다."),
  itemName: z.string().min(1, "상품명을 입력하세요."),
  category: z.string().min(1, "카테고리를 선택하세요."),
  rating: z.enum(["good", "neutral", "bad"], {
    error: "소비 평가를 선택하세요.",
  }),
  paidAt: z.string().min(1, "결제일시를 입력하세요."),
  memo: z.string().optional(),
})

type ExpenseFormInput = z.input<typeof expenseFormSchema>
export type ExpenseFormValues = z.output<typeof expenseFormSchema>

function nowForDateInput() {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 10)
}

export function ExpenseForm({
  onSubmit,
}: {
  onSubmit?: (values: ExpenseFormValues) => void
}) {
  const form = useForm<ExpenseFormInput, unknown, ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: 0,
      itemName: "",
      category: "",
      rating: undefined,
      paidAt: nowForDateInput(),
      memo: "",
    },
  })

  function handleSubmit(values: ExpenseFormValues) {
    onSubmit?.(values)
    form.reset({
      amount: 0,
      itemName: "",
      category: "",
      rating: undefined,
      paidAt: nowForDateInput(),
      memo: "",
    })
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>금액</FieldLabel>
              <Input
                {...field}
                value={field.value as string | number}
                id={field.name}
                type="number"
                inputMode="numeric"
                aria-invalid={fieldState.invalid}
                placeholder="0"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="itemName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>상품명</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="예: 스타벅스 아메리카노"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>카테고리</FieldLabel>
              <Select
                items={categoryItems}
                value={field.value || null}
                onValueChange={field.onChange}
              >
                <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryItems
                      .filter((item) => item.value !== null)
                      .map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="rating"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id="rating-label">이 소비, 어땠나요?</FieldLabel>
              <ToggleGroup
                aria-labelledby="rating-label"
                value={field.value ? [field.value] : []}
                onValueChange={(value) => field.onChange(value[0])}
                spacing={2}
              >
                <ToggleGroupItem value="good">좋음</ToggleGroupItem>
                <ToggleGroupItem value="neutral">보통</ToggleGroupItem>
                <ToggleGroupItem value="bad">나쁨</ToggleGroupItem>
              </ToggleGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="paidAt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>결제일</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="date"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="memo"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>메모</FieldLabel>
              <Textarea {...field} id={field.name} placeholder="선택 입력" />
              <FieldDescription>선택 사항입니다.</FieldDescription>
            </Field>
          )}
        />

        <Button type="submit">기록하기</Button>
      </FieldGroup>
    </form>
  )
}
