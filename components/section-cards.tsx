"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChevronDownIcon,
  ArrowUpRight01Icon,
  ArrowRight01Icon,
  ViewIcon,
  ViewOffIcon,
  ArrowDownRight01Icon,
} from "@hugeicons/core-free-icons"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import gsap from "gsap"

const cardCurrencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "Pound Sterling" },
  { code: "JPY", symbol: "¥", name: "Yen" },
  { code: "IDR", symbol: "Rp ", name: "Rupiah" },
]

const monthsList = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const incomeDataByMonth = [
  { income: 12450.00, change: 1200.00, percent: "+10%", trendUp: true },
  { income: 14120.00, change: 1670.00, percent: "+13%", trendUp: true },
  { income: 13850.00, change: -270.00, percent: "-2%", trendUp: false },
  { income: 14842.00, change: 992.00, percent: "+7%", trendUp: true },
  { income: 15900.00, change: 1058.00, percent: "+7%", trendUp: true },
  { income: 16200.00, change: 300.00, percent: "+2%", trendUp: true },
  { income: 17400.00, change: 1200.00, percent: "+7%", trendUp: true },
  { income: 18290.00, change: 3890.00, percent: "+8%", trendUp: true }, // Aug
  { income: 19100.00, change: 810.00, percent: "+4%", trendUp: true },
  { income: 18500.00, change: -600.00, percent: "-3%", trendUp: false },
  { income: 19600.00, change: 1100.00, percent: "+6%", trendUp: true },
  { income: 21400.00, change: 1800.00, percent: "+9%", trendUp: true },
]

export function SectionCards() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [showBalance, setShowBalance] = React.useState(true)
  const [selectedCurrency, setSelectedCurrency] = React.useState(cardCurrencies[0])
  const [exchangeRates, setExchangeRates] = React.useState<Record<string, number>>({})

  // Month Picker State
  const [showMonthPicker, setShowMonthPicker] = React.useState(false)
  const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(7) // August by default
  const [pickerYear, setPickerYear] = React.useState(2026)

  // Lottery animation state trackers
  const [animVal1, setAnimVal1] = React.useState<number | null>(null)
  const [animVal2, setAnimVal2] = React.useState<number | null>(null)
  const [animVal3, setAnimVal3] = React.useState<number | null>(null)

  React.useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setExchangeRates(data.rates)
        }
      })
      .catch((err) => console.error("Error fetching rates in section-cards:", err))
  }, [])

  // Close calendar popover on outside clicks
  React.useEffect(() => {
    if (!showMonthPicker) return
    const handleOutsideClick = () => {
      setShowMonthPicker(false)
    }
    window.addEventListener("click", handleOutsideClick)
    return () => window.removeEventListener("click", handleOutsideClick)
  }, [showMonthPicker])

  const baseBalance = 245180.50
  const convertedBalance = React.useMemo(() => {
    const rate = exchangeRates[selectedCurrency.code] || 1
    return baseBalance * rate
  }, [selectedCurrency, exchangeRates])

  const baseChange = 3890.00
  const convertedChange = React.useMemo(() => {
    const rate = exchangeRates[selectedCurrency.code] || 1
    return baseChange * rate
  }, [selectedCurrency, exchangeRates])

  const currentIncomeData = incomeDataByMonth[selectedMonthIndex]

  // Dynamic values that fall back to static converted values once slot animation finishes
  const valToShow1 = animVal1 !== null ? animVal1 : convertedBalance
  const valToShow2 = animVal2 !== null ? animVal2 : (currentIncomeData.income * (exchangeRates[selectedCurrency.code] || 1))
  const valToShow3 = animVal3 !== null ? animVal3 : (95400.00 * (exchangeRates[selectedCurrency.code] || 1))

  // Lottery rolling ticker triggers (Starts from 94% of target for a highly polished design interaction)
  const triggerLottery = (targetVal: number, setVal: (v: number | null) => void) => {
    const startVal = targetVal * 0.94
    const obj = { val: startVal }
    gsap.killTweensOf(obj)
    gsap.to(obj, {
      val: targetVal,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        setVal(obj.val)
      },
      onComplete: () => {
        setVal(null)
      }
    })
  }

  // Trigger lottery rolling tickers on initial mounts, currency edits, or month edits
  React.useEffect(() => {
    if (showBalance && convertedBalance > 0) {
      triggerLottery(convertedBalance, setAnimVal1)
    }
  }, [selectedCurrency, exchangeRates])

  React.useEffect(() => {
    const target = currentIncomeData.income * (exchangeRates[selectedCurrency.code] || 1)
    if (showBalance && target > 0) {
      triggerLottery(target, setAnimVal2)
    }
  }, [selectedCurrency, selectedMonthIndex, exchangeRates])

  React.useEffect(() => {
    const target = 95400.00 * (exchangeRates[selectedCurrency.code] || 1)
    if (showBalance && target > 0) {
      triggerLottery(target, setAnimVal3)
    }
  }, [selectedCurrency, exchangeRates])

  React.useEffect(() => {
    if (!containerRef.current) return

    // Staggered entry animation on load
    const cards = containerRef.current.querySelectorAll(".section-card-item")
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      }
    )
  }, [])

  // GSAP Mouse hover effects for outer cards
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -5,
      scale: 1.01,
      boxShadow: "0 12px 24px -10px rgba(0, 0, 0, 0.06), 0 8px 16px -8px rgba(0, 0, 0, 0.04)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  // GSAP Mouse hover effects for inner savings cards
  const handleInnerMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      duration: 0.25,
      ease: "power2.out",
    })
  }

  const handleInnerMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    })
  }

  // GSAP hover animation for main figures text
  const handleFigureMouseEnter1 = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!showBalance) return
    triggerLottery(convertedBalance, setAnimVal1)
    gsap.to(e.currentTarget, {
      scale: 1.05,
      letterSpacing: "0.02em",
      duration: 0.35,
      ease: "back.out(1.8)",
    })
  }

  const handleFigureMouseEnter2 = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!showBalance) return
    const target = currentIncomeData.income * (exchangeRates[selectedCurrency.code] || 1)
    triggerLottery(target, setAnimVal2)
    gsap.to(e.currentTarget, {
      scale: 1.05,
      letterSpacing: "0.02em",
      duration: 0.35,
      ease: "back.out(1.8)",
    })
  }

  const handleFigureMouseEnter3 = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!showBalance) return
    const target = 95400.00 * (exchangeRates[selectedCurrency.code] || 1)
    triggerLottery(target, setAnimVal3)
    gsap.to(e.currentTarget, {
      scale: 1.05,
      letterSpacing: "0.02em",
      duration: 0.35,
      ease: "back.out(1.8)",
    })
  }

  const handleFigureMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      letterSpacing: "0em",
      duration: 0.25,
      ease: "power2.out",
    })
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-6 px-6 md:grid-cols-3">
      {/* Card 1: Available Balance */}
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="section-card-item rounded-2xl rounded-tr-none border bg-card p-6 flex flex-col gap-4 relative opacity-0 shadow-xs cursor-pointer"
      >
        {/* macOS Desktop File Folded Corner */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-muted/80 dark:bg-muted border-l border-b border-border/60 rounded-bl-md shadow-xs pointer-events-none" />
        <div className="flex items-center justify-between pr-2 z-10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">Available Balance</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowBalance(!showBalance)
              }}
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-md hover:bg-muted/50 cursor-pointer"
              title={showBalance ? "Hide Balance" : "Show Balance"}
            >
              <HugeiconsIcon icon={showBalance ? ViewIcon : ViewOffIcon} className="size-4" />
            </button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-xs border rounded-lg px-2.5 py-1 bg-muted/50 cursor-pointer font-medium hover:bg-muted transition-colors text-foreground" />}>
              {selectedCurrency.code} <HugeiconsIcon icon={ChevronDownIcon} className="size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground rounded-lg shadow-md border p-1 z-50">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Select Currency</DropdownMenuLabel>
                <DropdownMenuSeparator className="h-px bg-muted my-1" />
                {cardCurrencies.map((curr) => (
                  <DropdownMenuItem
                    key={curr.code}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCurrency(curr)
                    }}
                    className="flex justify-between items-center px-2 py-1.5 text-xs rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <span>{curr.name} ({curr.code})</span>
                    <span className="font-semibold text-muted-foreground">{curr.symbol.trim()}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-1 z-10">
          <span
            onMouseEnter={handleFigureMouseEnter1}
            onMouseLeave={handleFigureMouseLeave}
            className="text-3xl font-bold tracking-tight inline-block origin-left text-foreground"
          >
            {showBalance ? (
              `${selectedCurrency.symbol}${valToShow1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            ) : (
              `${selectedCurrency.symbol} ••••••••`
            )}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-border/50 z-10">
          <div className="flex items-center gap-1 font-medium text-emerald-600">
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3.5" />
            <span>+40%</span>
            <span className="text-muted-foreground font-normal">of this month's income</span>
          </div>
          <span className="font-semibold text-emerald-600">
            {showBalance ? (
              `+${selectedCurrency.symbol}${convertedChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            ) : (
              `+${selectedCurrency.symbol} ••••`
            )}
          </span>
        </div>
      </Card>

      {/* Card 2: Total Income */}
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`section-card-item rounded-2xl rounded-tr-none border bg-card p-6 flex flex-col gap-4 relative opacity-0 shadow-xs cursor-pointer ${
          showMonthPicker ? "z-30" : "z-10"
        }`}
      >
        {/* macOS Desktop File Folded Corner */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-muted/80 dark:bg-muted border-l border-b border-border/60 rounded-bl-md shadow-xs pointer-events-none" />
        <div className="flex items-center justify-between pr-2 z-10">
          <span className="text-sm font-semibold text-muted-foreground">Total Income</span>
          
          {/* Calendar trigger button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMonthPicker(!showMonthPicker)
            }}
            className="flex items-center gap-1 text-xs border rounded-lg px-2.5 py-1 bg-muted/50 cursor-pointer font-medium hover:bg-muted transition-colors text-foreground"
          >
            {monthsList[selectedMonthIndex]} <HugeiconsIcon icon={ChevronDownIcon} className="size-3 text-muted-foreground" />
          </button>
        </div>
        <div className="flex flex-col gap-1 z-10">
          <span
            onMouseEnter={handleFigureMouseEnter2}
            onMouseLeave={handleFigureMouseLeave}
            className="text-3xl font-bold tracking-tight inline-block origin-left text-foreground"
          >
            {showBalance ? (
              `${selectedCurrency.symbol}${valToShow2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            ) : (
              `${selectedCurrency.symbol} ••••••••`
            )}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-border/50 z-10">
          <div className={`flex items-center gap-1 font-medium ${currentIncomeData.trendUp ? "text-emerald-600" : "text-red-500"}`}>
            <HugeiconsIcon icon={currentIncomeData.trendUp ? ArrowUpRight01Icon : ArrowDownRight01Icon} className="size-3.5" />
            <span>{currentIncomeData.percent}</span>
            <span className="text-muted-foreground font-normal">from last month</span>
          </div>
          <span className={`font-semibold ${currentIncomeData.trendUp ? "text-emerald-600" : "text-red-500"}`}>
            {showBalance ? (
              `${currentIncomeData.trendUp ? "+" : "-"}${selectedCurrency.symbol}${(Math.abs(currentIncomeData.change) * (exchangeRates[selectedCurrency.code] || 1)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            ) : (
              `${currentIncomeData.trendUp ? "+" : "-"}${selectedCurrency.symbol} ••••`
            )}
          </span>
        </div>

        {/* Custom Month Picker Calendar Popover (Rendered at the bottom to guarantee overlay stacking!) */}
        {showMonthPicker && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-14 right-6 w-52 bg-card text-popover-foreground rounded-xl shadow-xl border border-border/80 p-2.5 z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="flex items-center justify-between text-[11px] font-bold border-b border-border/50 pb-1.5 px-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPickerYear(pickerYear - 1)
                }}
                className="px-1.5 py-0.5 hover:bg-muted rounded-md cursor-pointer transition-colors"
              >
                &lt;
              </button>
              <span className="text-foreground">{pickerYear}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPickerYear(pickerYear + 1)
                }}
                className="px-1.5 py-0.5 hover:bg-muted rounded-md cursor-pointer transition-colors"
              >
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1 text-[10px] text-center font-semibold">
              {monthsList.map((month, idx) => {
                const isSelected = selectedMonthIndex === idx
                return (
                  <button
                    key={month}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMonthIndex(idx)
                      setShowMonthPicker(false)
                    }}
                    className={`py-1 rounded-md cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-emerald-800 text-white font-bold"
                        : "hover:bg-muted text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {month}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Card 3: Total Savings */}
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="section-card-item rounded-2xl rounded-tr-none border bg-card p-6 flex flex-col gap-4 relative opacity-0 shadow-xs cursor-pointer"
      >
        {/* macOS Desktop File Folded Corner */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-muted/80 dark:bg-muted border-l border-b border-border/60 rounded-bl-md shadow-xs pointer-events-none" />
        <div className="flex items-center justify-between pr-2">
          <span className="text-sm font-semibold text-muted-foreground">Total Savings</span>
          <a href="#" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">
            View More <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <span
            onMouseEnter={handleFigureMouseEnter3}
            onMouseLeave={handleFigureMouseLeave}
            className="text-3xl font-bold tracking-tight inline-block origin-left text-foreground"
          >
            {showBalance ? (
              `${selectedCurrency.symbol}${valToShow3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            ) : (
              `${selectedCurrency.symbol} ••••••••`
            )}
          </span>
        </div>

        {/* Budget targets side by side */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          {/* Wedding */}
          <div
            onMouseEnter={handleInnerMouseEnter}
            onMouseLeave={handleInnerMouseLeave}
            className="rounded-xl rounded-tr-none bg-emerald-800 text-white p-2.5 flex flex-col justify-between h-20 relative overflow-hidden transition-shadow duration-200 hover:shadow-xs group/wedding"
          >
            <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 border-l border-b border-white/10 rounded-bl-sm pointer-events-none" />
            {/* Decorative line pattern */}
            <svg
              className="absolute -right-3 -bottom-3 size-16 text-white/10 pointer-events-none transition-transform duration-500 ease-out group-hover/wedding:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="100" cy="100" r="20" />
              <circle cx="100" cy="100" r="35" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="65" />
            </svg>
            <span className="text-[10px] font-semibold opacity-85 leading-tight pr-2 relative z-10">Wedding</span>
            <div className="flex justify-between items-baseline mt-auto relative z-10">
              <span className="text-xs font-bold">60%</span>
              <span className="text-[9px] font-medium opacity-90">
                {showBalance ? (
                  `${selectedCurrency.symbol}${(57240.00 * (exchangeRates[selectedCurrency.code] || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                ) : (
                  "••••"
                )}
              </span>
            </div>
          </div>
          {/* Dream Car */}
          <div
            onMouseEnter={handleInnerMouseEnter}
            onMouseLeave={handleInnerMouseLeave}
            className="rounded-xl rounded-tr-none bg-[#b04a2c] text-white p-2.5 flex flex-col justify-between h-20 relative overflow-hidden transition-shadow duration-200 hover:shadow-xs group/car"
          >
            <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 border-l border-b border-white/10 rounded-bl-sm pointer-events-none" />
            {/* Decorative line pattern */}
            <svg
              className="absolute -right-3 -bottom-3 size-16 text-white/10 pointer-events-none transition-transform duration-500 ease-out group-hover/car:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="100" cy="100" r="20" />
              <circle cx="100" cy="100" r="35" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="65" />
            </svg>
            <span className="text-[10px] font-semibold opacity-85 leading-tight pr-2 relative z-10">Dream Car</span>
            <div className="flex justify-between items-baseline mt-auto relative z-10">
              <span className="text-xs font-bold">20%</span>
              <span className="text-[9px] font-medium opacity-90">
                {showBalance ? (
                  `${selectedCurrency.symbol}${(19080.00 * (exchangeRates[selectedCurrency.code] || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                ) : (
                  "••••"
                )}
              </span>
            </div>
          </div>
          {/* Holiday */}
          <div
            onMouseEnter={handleInnerMouseEnter}
            onMouseLeave={handleInnerMouseLeave}
            className="rounded-xl rounded-tr-none bg-[#c5e3a5] text-emerald-950 p-2.5 flex flex-col justify-between h-20 relative overflow-hidden transition-shadow duration-200 hover:shadow-xs group/holiday"
          >
            <div className="absolute top-0 right-0 w-3 h-3 bg-black/10 border-l border-b border-black/10 rounded-bl-sm pointer-events-none" />
            {/* Decorative line pattern */}
            <svg
              className="absolute -right-3 -bottom-3 size-16 text-emerald-950/10 pointer-events-none transition-transform duration-500 ease-out group-hover/holiday:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle cx="100" cy="100" r="20" />
              <circle cx="100" cy="100" r="35" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="65" />
            </svg>
            <span className="text-[10px] font-semibold opacity-85 leading-tight pr-2 relative z-10">Holiday</span>
            <div className="flex justify-between items-baseline mt-auto relative z-10">
              <span className="text-xs font-bold">15%</span>
              <span className="text-[9px] font-medium opacity-90">
                {showBalance ? (
                  `${selectedCurrency.symbol}${(14310.00 * (exchangeRates[selectedCurrency.code] || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                ) : (
                  "••••"
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
