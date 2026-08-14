import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Portfolio Management" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-400">
        <Loader2 className="size-8 animate-spin text-cyan-400" />
        <p className="mt-3 text-xs">Authenticating session…</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return <AdminDashboard user={user} />;
}
