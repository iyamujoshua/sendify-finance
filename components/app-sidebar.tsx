"use client"

import * as React from "react"
import { ThemeToggleIcon, useThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  CreditCardIcon,
  ArrowLeftRightIcon,
  BarChartIcon,
  FileTextIcon,
  PiggyBankIcon,
  BitcoinIcon,
  TrendingUpIcon,
  ArrowUpDownIcon,
  Settings01Icon,
  UserGroupIcon,
  FlashIcon,
} from "@hugeicons/core-free-icons"

const data = {
  mainMenu: [
    {
      title: "Dashboard",
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} className="size-4" />,
    },
    {
      title: "Card",
      icon: <HugeiconsIcon icon={CreditCardIcon} className="size-4" />,
    },
    {
      title: "Transaction",
      icon: <HugeiconsIcon icon={ArrowLeftRightIcon} className="size-4" />,
    },
    {
      title: "Analytics",
      icon: <HugeiconsIcon icon={BarChartIcon} className="size-4" />,
    },
    {
      title: "Report",
      icon: <HugeiconsIcon icon={FileTextIcon} className="size-4" />,
    },
    {
      title: "Savings",
      icon: <HugeiconsIcon icon={PiggyBankIcon} className="size-4" />,
    },
  ],
  financialHub: [
    {
      title: "Crypto",
      icon: <HugeiconsIcon icon={BitcoinIcon} className="size-4" />,
    },
    {
      title: "Stocks",
      icon: <HugeiconsIcon icon={TrendingUpIcon} className="size-4" />,
    },
    {
      title: "Exchange",
      icon: <HugeiconsIcon icon={ArrowUpDownIcon} className="size-4" />,
    },
  ],
  secondaryMenu: [
    {
      title: "Settings",
      icon: <HugeiconsIcon icon={Settings01Icon} className="size-4" />,
    },
    {
      title: "Referral",
      icon: <HugeiconsIcon icon={UserGroupIcon} className="size-4" />,
    },
  ],
}

function ThemeMenuItem() {
  const toggleTheme = useThemeToggle()

  return (
    <SidebarMenuButton
      tooltip="Theme"
      onClick={toggleTheme}
      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
    >
      <ThemeToggleIcon />
      <span className="text-[13px]">Theme</span>
    </SidebarMenuButton>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="h-(--header-height) border-b border-sidebar-border px-6 flex items-center">
        <div className="flex items-center gap-2.5">
          {/* Sendify Custom Logo */}
          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
            </svg>
          </div>
          <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
            Sendify Finance
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-3 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          {/* Main Menu */}
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {data.mainMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.title === "Dashboard"}
                      tooltip={item.title}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg data-[active=true]:bg-emerald-500/10 data-[active=true]:text-emerald-600 dark:data-[active=true]:text-emerald-400 transition-all duration-200 ease-out hover:translate-x-1 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:scale-115"
                    >
                      {item.icon}
                      <span className="text-[13px]">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Financial Hub */}
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Financial Hub
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {data.financialHub.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-out hover:translate-x-1 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:scale-115"
                    >
                      {item.icon}
                      <span className="text-[13px]">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Settings & Referral */}
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {data.secondaryMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-out hover:translate-x-1 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:scale-115"
                    >
                      {item.icon}
                      <span className="text-[13px]">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <ThemeMenuItem />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Upgrade Promo Box */}
        <div className="px-1 mt-4">
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 p-4 border border-emerald-100/50 dark:border-emerald-900/30 flex flex-col gap-3 relative overflow-hidden group">
            {/* Decorative background line patterns */}
            <svg
              className="absolute -right-4 -bottom-4 size-28 text-emerald-600/15 dark:text-emerald-400/5 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="100" cy="100" r="30" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="90" />
              <circle cx="100" cy="100" r="110" />
              <circle cx="100" cy="100" r="130" />
            </svg>

            <div className="flex size-8 items-center justify-center rounded-xl bg-white dark:bg-emerald-900 text-emerald-600 shadow-sm z-10">
              <HugeiconsIcon icon={FlashIcon} className="size-4 fill-emerald-600" />
            </div>
            <div className="flex flex-col gap-1 z-10">
              <span className="font-semibold text-sm text-emerald-950 dark:text-emerald-100">
                Upgrade to Pro Today
              </span>
              <span className="text-xs text-emerald-800 dark:text-emerald-300 leading-normal">
                Level up your dashboard and start saving smarter.
              </span>
            </div>
            <button className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-xl text-xs font-semibold transition-colors duration-150 cursor-pointer z-10">
              Upgrade
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
