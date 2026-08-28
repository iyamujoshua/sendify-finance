"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronDownIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
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

const currencies = [
  { code: "GBP", name: "Pound Sterling", symbol: "£" },
  { code: "IDR", name: "Rupiah", symbol: "Rp " },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "JPY", name: "Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$ " },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$ " },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$ " },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF " },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$ " },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$ " },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$ " },
  { code: "BRL", name: "Brazilian Real", symbol: "R$ " },
  { code: "ZAR", name: "South African Rand", symbol: "R " },
]

const assetHoldings = [
  { id: "bitcoin", name: "Bitcoin", amount: 0.4, symbol: "BTC", dotColor: "bg-emerald-800", barColor: "bg-emerald-800" },
  { id: "ethereum", name: "Ethereum", amount: 2.3, symbol: "ETH", dotColor: "bg-emerald-600", barColor: "bg-emerald-600" },
  { id: "solana", name: "Solana", amount: 30.0, symbol: "SOL", dotColor: "bg-[#c5e3a5]", barColor: "bg-[#c5e3a5]" },
  { id: "cardano", name: "Cardano", amount: 500.0, symbol: "ADA", dotColor: "bg-yellow-500", barColor: "bg-yellow-500" },
  { id: "tether", name: "Tether", amount: 1200.0, symbol: "USDT", dotColor: "bg-orange-500", barColor: "bg-orange-500" },
]

export function ChartAreaInteractive() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [timeRange, setTimeRange] = React.useState("1W")
  const [targetCurrency, setTargetCurrency] = React.useState(currencies[0])
  const [liveRate, setLiveRate] = React.useState(15824)
  const [exchangeRates, setExchangeRates] = React.useState<Record<string, number>>({})
  const [currencySearchQuery, setCurrencySearchQuery] = React.useState("")

  const filteredCurrencies = React.useMemo(() => {
    return currencies.filter((curr) =>
      curr.name.toLowerCase().includes(currencySearchQuery.toLowerCase()) ||
      curr.code.toLowerCase().includes(currencySearchQuery.toLowerCase())
    )
  }, [currencySearchQuery])

  const [prices, setPrices] = React.useState<{ [key: string]: number }>({
    bitcoin: 78900,
    ethereum: 2480,
    solana: 104,
    cardano: 0.20,
    tether: 1.0,
  })

  // Fetch exchange rates from USD
  React.useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setExchangeRates(data.rates)
          const newRate = data.rates[targetCurrency.code]
          if (newRate) setLiveRate(newRate)
        }
      })
      .catch((err) => console.error("Error fetching exchange rates:", err))
  }, [])

  // Sync rate when selected currency updates
  React.useEffect(() => {
    const rate = exchangeRates[targetCurrency.code]
    if (rate) {
      setLiveRate(rate)
    }
  }, [targetCurrency, exchangeRates])

  // Generate dynamic chart points based on current exchange rate
  const dynamicExchangeData = React.useMemo(() => {
    const baseFluctuations = [0.993, 0.997, 0.995, 1.000, 0.998, 1.001, 0.999, 1.000]
    const dates = ["02 Apr", "03 Apr", "04 Apr", "05 Apr", "06 Apr", "07 Apr", "08 Apr", "09 Apr"]
    return dates.map((date, idx) => {
      const rawRate = liveRate * baseFluctuations[idx]
      return {
        date,
        rate: parseFloat(rawRate.toFixed(2)),
      }
    })
  }, [liveRate])

  // Automatically fit Recharts Y-axis boundaries
  const yDomain = React.useMemo(() => {
    const rates = dynamicExchangeData.map((d) => d.rate)
    const min = Math.min(...rates)
    const max = Math.max(...rates)
    const padding = (max - min) * 0.1 || min * 0.005
    return [parseFloat((min - padding).toFixed(2)), parseFloat((max + padding).toFixed(2))]
  }, [dynamicExchangeData])

  React.useEffect(() => {
    // Fetch live prices from CoinGecko
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,tether&vs_currencies=usd")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.bitcoin && data.ethereum && data.solana && data.cardano && data.tether) {
          setPrices({
            bitcoin: data.bitcoin.usd,
            ethereum: data.ethereum.usd,
            solana: data.solana.usd,
            cardano: data.cardano.usd,
            tether: data.tether.usd,
          })
        }
      })
      .catch((err) => console.error("Error fetching CoinGecko prices:", err))
  }, [])

  // Calculate dynamic values
  const cryptoAssetsWithValues = React.useMemo(() => {
    const assets = assetHoldings.map((holding) => {
      const price = prices[holding.id] || 0
      const value = holding.amount * price
      return {
        ...holding,
        value,
      }
    })

    const totalValue = assets.reduce((sum, item) => sum + item.value, 0)

    return assets.map((asset) => {
      const percentage = totalValue > 0 ? (asset.value / totalValue) * 100 : 0
      return {
        ...asset,
        percentage,
        formattedAmount: `${asset.amount.toLocaleString(undefined, { minimumFractionDigits: asset.id === "tether" ? 2 : 6, maximumFractionDigits: asset.id === "tether" ? 2 : 6 })} ${asset.symbol}`,
      }
    })
  }, [prices])

  const totalUSDValue = React.useMemo(() => {
    return cryptoAssetsWithValues.reduce((sum, item) => sum + item.value, 0)
  }, [cryptoAssetsWithValues])

  const totalBTCValue = React.useMemo(() => {
    const btcPrice = prices.bitcoin || 1
    return totalUSDValue / btcPrice
  }, [totalUSDValue, prices.bitcoin])

  React.useEffect(() => {
    if (!containerRef.current) return

    // Stagger entry animations
    const panels = containerRef.current.querySelectorAll(".chart-panel-item")
    gsap.fromTo(
      panels,
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
        delay: 0.15, // stagger after KPI cards
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Exchange Chart Panel */}
      <Card className="chart-panel-item rounded-2xl border bg-card p-6 md:col-span-2 flex flex-col gap-4 opacity-0 shadow-xs hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Exchange USD to {targetCurrency.name}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger render={<button className="flex items-center gap-1 text-xs border rounded-lg px-2.5 py-1 bg-muted/50 cursor-pointer font-medium hover:bg-muted transition-colors text-foreground" />}>
                {targetCurrency.code} <HugeiconsIcon icon={ChevronDownIcon} className="size-3 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52 bg-popover text-popover-foreground rounded-lg shadow-md border p-2 flex flex-col gap-1.5 z-50">
                <input
                  type="text"
                  placeholder="Search currency..."
                  value={currencySearchQuery}
                  onChange={(e) => setCurrencySearchQuery(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded-md bg-muted/40 focus:outline-none focus:bg-background focus:border-input transition-colors duration-150"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <DropdownMenuSeparator className="h-px bg-muted my-0.5" />
                <DropdownMenuGroup className="max-h-48 overflow-y-auto flex flex-col gap-0.5 pr-1">
                  <DropdownMenuLabel className="px-2 py-1 text-[10px] font-semibold text-muted-foreground">Select Currency</DropdownMenuLabel>
                  {filteredCurrencies.length > 0 ? (
                    filteredCurrencies.map((curr) => (
                      <DropdownMenuItem
                        key={curr.code}
                        onClick={() => {
                          setTargetCurrency(curr)
                          setCurrencySearchQuery("")
                        }}
                        className="flex justify-between items-center px-2 py-1.5 text-xs rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      >
                        <span>{curr.name} ({curr.code})</span>
                        <span className="font-semibold text-muted-foreground">{curr.symbol.trim()}</span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-[10px] text-muted-foreground text-center py-2">No results</div>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Time range toggles */}
          <div className="flex items-center gap-1 border rounded-lg p-0.5 bg-muted/30">
            {["1D", "1W", "1M", "All"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-colors cursor-pointer ${
                  timeRange === range
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight">
            {targetCurrency.symbol}
            {liveRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </span>
        </div>

        {/* Recharts area chart */}
        <div className="h-48 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dynamicExchangeData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary, #059669)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-primary, #059669)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                style={{ fontSize: "10px", fill: "var(--text-muted)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={yDomain}
                tickFormatter={(val) => `${targetCurrency.symbol}${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                style={{ fontSize: "10px", fill: "var(--text-muted)" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xs">
                        <span className="font-semibold text-emerald-600">
                          {targetCurrency.symbol}
                          {payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                        </span>
                      </div>
                    )
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--color-primary, #059669)"
                strokeWidth={2}
                fill="url(#fillRate)"
                activeDot={{ r: 5, fill: "var(--color-primary, #059669)", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Crypto Balance Allocation Panel */}
      <Card className="chart-panel-item rounded-2xl border bg-card p-6 flex flex-col gap-4 opacity-0 shadow-xs hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">Crypto Balance</span>
          <a href="#" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">
            View More <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
          </a>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight">BTC {totalBTCValue.toFixed(6)}</span>
          <span className="text-xs text-muted-foreground mt-0.5">= ${totalUSDValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        {/* Custom Segmented Bar */}
        <div className="flex h-3 w-full rounded-full overflow-hidden bg-muted mt-3">
          {cryptoAssetsWithValues.map((asset) => (
            <div
              key={asset.name}
              style={{ width: `${asset.percentage}%` }}
              className={`${asset.barColor} transition-all duration-300`}
            />
          ))}
        </div>

        {/* Legend Grid */}
        <div className="flex flex-col gap-3 mt-2 text-xs font-medium">
          {cryptoAssetsWithValues.map((asset) => (
            <div key={asset.name} className="flex items-center justify-between py-0.5">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <span className={`size-2.5 rounded-full ${asset.dotColor}`} />
                <span className="font-semibold text-foreground/80">{asset.name}</span>
              </div>
              <span className="text-foreground font-semibold">{asset.formattedAmount}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
