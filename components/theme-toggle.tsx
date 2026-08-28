"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { Sun01Icon, MoonIcon } from "@hugeicons/core-free-icons"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === "dark"

  const handleToggle = React.useCallback(() => {
    setTheme(isDark ? "light" : "dark")
  }, [isDark, setTheme])

  if (!mounted) {
    return <span className="size-4 inline-block" />
  }

  return (
    <span
      onClick={handleToggle}
      className="flex size-4 items-center justify-center text-current cursor-pointer transition-transform duration-200 hover:rotate-12"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      role="switch"
      aria-checked={isDark}
    >
      <HugeiconsIcon
        icon={isDark ? Sun01Icon : MoonIcon}
        className="size-4"
      />
    </span>
  )
}
