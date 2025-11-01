"use client"

import * as React from "react"
import { format, isValid, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  name?: string
  id?: string
}

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
]

// Generate years from 2020 to 2050
const generateYears = () => {
  const years = []
  for (let year = 2020; year <= 2050; year++) {
    years.push(year.toString())
  }
  return years
}

const years = generateYears()

export function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  className,
  name,
  id,
}: DatePickerProps) {
  const [month, setMonth] = React.useState<string>(
    value ? format(value, "MM") : ""
  )
  const [day, setDay] = React.useState<string>(
    value ? format(value, "dd") : ""
  )
  const [year, setYear] = React.useState<string>(
    value ? format(value, "yyyy") : ""
  )

  React.useEffect(() => {
    if (value) {
      setMonth(format(value, "MM"))
      setDay(format(value, "dd"))
      setYear(format(value, "yyyy"))
    } else {
      setMonth("")
      setDay("")
      setYear("")
    }
  }, [value])

  const updateDate = (newMonth: string, newDay: string, newYear: string) => {
    setMonth(newMonth)
    setDay(newDay)
    setYear(newYear)

    if (newMonth && newDay && newYear) {
      const dateString = `${newYear}-${newMonth}-${newDay}`
      const parsedDate = parse(dateString, "yyyy-MM-dd", new Date())
      
      if (isValid(parsedDate)) {
        onChange?.(parsedDate)
      } else {
        onChange?.(undefined)
      }
    } else {
      onChange?.(undefined)
    }
  }

  const handleMonthChange = (value: string) => {
    updateDate(value, day, year)
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length > 2) value = value.slice(0, 2)
    updateDate(month, value, year)
  }

  const handleYearChange = (value: string) => {
    updateDate(month, day, value)
  }

  const handleDayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 2) value = value.slice(0, 2)
    setDay(value)
    updateDate(month, value, year)
  }

  // Format date for hidden input (for form submission)
  const formattedDate =
    month && day && year && isValid(parse(`${year}-${month}-${day}`, "yyyy-MM-dd", new Date()))
      ? `${year}-${month}-${day}`
      : ""

  return (
    <div className={cn("space-y-2", className)}>
      <div className="grid grid-cols-3 gap-2">
        {/* Month Dropdown */}
        <Select value={month} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Day Input */}
        <Input
          type="text"
          placeholder="Day"
          value={day}
          onChange={handleDayInputChange}
          maxLength={2}
          className="w-full text-center"
          pattern="[0-9]*"
          inputMode="numeric"
        />

        {/* Year Dropdown */}
        <Select value={year} onValueChange={handleYearChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        id={id}
        value={formattedDate}
      />
    </div>
  )
}
