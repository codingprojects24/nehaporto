import {
  Award,
  Briefcase,
  Code2,
  FolderGit2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type AdminTab =
  "profile" | "projects" | "skills" | "experience" | "certifications" | "education" | "messages";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onSignOut: () => void;
  messageCount?: number;
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  onSignOut,
  messageCount = 0,
}: AdminSidebarProps) {
  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "profile", label: "Profile & Bio", icon: User },
    { id: "projects", label: "Projects & Media", icon: FolderGit2 },
    { id: "skills", label: "Skills & Stack", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "messages", label: "Messages", icon: Mail, badge: messageCount },
  ];

  return (
    <aside className="flex w-full flex-col border-b border-slate-800 bg-slate-900 md:h-screen md:w-64 md:border-b-0 md:border-r">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
          <LayoutDashboard className="size-5" />
        </div>
        <div>
          <span className="block text-sm font-bold text-white">Portfolio Admin</span>
          <span className="block text-[11px] text-slate-400">Content Studio</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex flex-1 flex-row overflow-x-auto p-3 md:flex-col md:space-y-1 md:overflow-x-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group flex items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all md:text-sm",
                isActive
                  ? "bg-cyan-500/15 text-cyan-400 shadow-sm shadow-cyan-500/10"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200",
              )}
            >
              <Icon
                className={cn(
                  "size-4 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-300",
                )}
              />
              <span>{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Sign Out Button */}
      <div className="border-t border-slate-800 p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/10 md:text-sm"
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
