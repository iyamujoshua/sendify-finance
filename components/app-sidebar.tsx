"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Task01Icon,
  BarChartIcon,
  Folder01Icon,
  UserGroupIcon,
  Camera01Icon,
  FileTextIcon,
  Settings01Icon,
  HelpCircleIcon,
  Search01Icon,
  Database01Icon,
  FileChartPieIcon,
  File01Icon,
  CommandIcon
} from "@hugeicons/core-free-icons"

const data = {
  user: {
    name: "FestiPlays Admin",
    email: "admin@festiplays.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Ledger Dashboard",
      url: "#",
      icon: (
        <HugeiconsIcon icon={DashboardSquare01Icon} />
      ),
    },
    {
      title: "Liquidity Pools",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Task01Icon} />
      ),
    },
    {
      title: "Trade Desk Volume",
      url: "#",
      icon: (
        <HugeiconsIcon icon={BarChartIcon} />
      ),
    },
    {
      title: "Asset Custody",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Folder01Icon} />
      ),
    },
    {
      title: "Compliance Audits",
      url: "#",
      icon: (
        <HugeiconsIcon icon={UserGroupIcon} />
      ),
    },
  ],
  navClouds: [
    {
      title: "KYC Processing",
      icon: (
        <HugeiconsIcon icon={Camera01Icon} />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Pending Approval",
          url: "#",
        },
        {
          title: "Approved Customers",
          url: "#",
        },
      ],
    },
    {
      title: "AML Monitoring",
      icon: (
        <HugeiconsIcon icon={FileTextIcon} />
      ),
      url: "#",
      items: [
        {
          title: "Active Flags",
          url: "#",
        },
        {
          title: "Resolution Log",
          url: "#",
        },
      ],
    },
    {
      title: "Tax Form Filing",
      icon: (
        <HugeiconsIcon icon={FileTextIcon} />
      ),
      url: "#",
      items: [
        {
          title: "1099-B Generating",
          url: "#",
        },
        {
          title: "Quarterly Reports",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Security Settings",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Settings01Icon} />
      ),
    },
    {
      title: "API Support",
      url: "#",
      icon: (
        <HugeiconsIcon icon={HelpCircleIcon} />
      ),
    },
    {
      title: "Global Search",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Search01Icon} />
      ),
    },
  ],
  documents: [
    {
      name: "Ledger Database",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Database01Icon} />
      ),
    },
    {
      name: "Balance Sheets",
      url: "#",
      icon: (
        <HugeiconsIcon icon={FileChartPieIcon} />
      ),
    },
    {
      name: "Auditor Statements",
      url: "#",
      icon: (
        <HugeiconsIcon icon={File01Icon} />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <HugeiconsIcon icon={CommandIcon} className="size-5!" />
              <span className="text-base font-semibold">Sendify Finance</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
