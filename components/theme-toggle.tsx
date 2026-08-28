"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { Sun01Icon, MoonIcon } from "@hugeicons/core-free-icons"

export function ThemeToggleIcon() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className="size-4 inline-block" />
  }

  return (
    <HugeiconsIcon
      icon={resolvedTheme === "dark" ? Sun01Icon : MoonIcon}
      className="size-4"
    />
  )
}

export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggle = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return toggle
}
