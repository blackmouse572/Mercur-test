"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { clx } from "@medusajs/ui"

// import "react-day-picker/src/style.css"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clx("p-3 txt-small", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "txt-medium font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: clx(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-4",
        nav_button_next: "absolute right-4",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: clx(
          "bg-ui-bg-base txt-compact-small relative flex size-8 items-center justify-center rounded-md outline-none transition-fg border border-transparent",
          "hover:bg-ui-bg-base-hover",
          "focus-visible:shadow-borders-focus focus-visible:border-ui-border-interactive"
          // "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 text-center"
        ),
        day: clx(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-center txt-compact-small rounded-md cursor-pointer",
          "focus-visible:shadow-borders-focus focus-visible:border-ui-border-interactive"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-ui-bg-interactive",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ className, ...props }) => (
          <ChevronLeft
            {...(props as any)}
            className={clx("absolute left-4 top-5", className)}
          />
        ),
        NextMonthButton: ({ className, ...props }) => (
          <ChevronRight
            {...(props as any)}
            className={clx("absolute right-4 top-5", className)}
          />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
