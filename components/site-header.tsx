import { SidebarTrigger } from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Settings01Icon, HelpCircleIcon } from "@hugeicons/core-free-icons"
import { Avatar } from "@/components/ui/avatar"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center justify-between border-b px-6 py-4">
      {/* Left: Page Title */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 md:hidden" />
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      </div>

      {/* Right: Search, Utilities, User Profile */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden sm:block">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-48 md:w-64 pl-9 pr-4 py-1.5 bg-muted/50 rounded-xl text-xs border border-transparent focus:outline-none focus:bg-background focus:border-input transition-colors duration-150"
          />
        </div>

        {/* Settings Button */}
        <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
          <HugeiconsIcon icon={Settings01Icon} className="size-4" />
        </button>
        {/* Help Button */}
        <button className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
          <HugeiconsIcon icon={HelpCircleIcon} className="size-4" />
        </button>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-2 border-l border-border">
          <Avatar className="size-8 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold text-xs flex items-center justify-center">
            B
          </Avatar>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-none">Bruce Wayne</span>
            <span className="text-[10px] text-muted-foreground">brucewayne@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  )
}
