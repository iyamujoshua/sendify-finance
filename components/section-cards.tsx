"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { TrendingUpIcon } from "@hugeicons/core-free-icons"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Asset Volume (AUM)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,420,500.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={TrendingUpIcon} />
              +8.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Assets locked up this month{" "}
            <HugeiconsIcon icon={TrendingUpIcon} className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total value locked across custody contracts
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>24h Transaction Value</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $235,400.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={TrendingUpIcon} />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Up 12.5% vs yesterday{" "}
            <HugeiconsIcon icon={TrendingUpIcon} className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Volume across fiat & crypto rails
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Investor Wallets</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={TrendingUpIcon} />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user onboarding{" "}
            <HugeiconsIcon icon={TrendingUpIcon} className="size-4" />
          </div>
          <div className="text-muted-foreground">Verified custody accounts active</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Reserve Liquidity Index</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            94.8%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={TrendingUpIcon} />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Optimal system reserves{" "}
            <HugeiconsIcon icon={TrendingUpIcon} className="size-4" />
          </div>
          <div className="text-muted-foreground">Stable-coin collateral health ratio</div>
        </CardFooter>
      </Card>
    </div>
  )
}
