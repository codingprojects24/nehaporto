import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import { Database, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminCertifications } from "@/components/admin/AdminCertifications";
import { AdminEducation } from "@/components/admin/AdminEducation";
import { AdminExperience } from "@/components/admin/AdminExperience";
import { AdminMessages } from "@/components/admin/AdminMessages";
import { AdminProfile } from "@/components/admin/AdminProfile";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminSidebar, type AdminTab } from "@/components/admin/AdminSidebar";
import { AdminSkills } from "@/components/admin/AdminSkills";
import { signOutAdmin } from "@/hooks/useAuth";
import { fetchMessages, seedFirestoreForce } from "@/lib/content";

export function AdminDashboard({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<AdminTab>("profile");
  const [isSeeding, setIsSeeding] = useState(false);

  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    staleTime: 30_000,
  });

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
      toast.success("Signed out successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign out.");
    }
  };

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        "Sync starter portfolio data to your new Firestore database? This will populate your empty collections so you can edit all content directly.",
      )
    )
      return;

    setIsSeeding(true);
    try {
      await seedFirestoreForce();
      await queryClient.invalidateQueries();
      toast.success("Firestore populated with starter data successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Database initialization failed. Check your Firebase security rules.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white md:flex-row">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
        messageCount={messages.length}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex size-2 rounded-full bg-emerald-400" />
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="size-4 text-cyan-400" />
              <span>Logged in as:</span>
              <strong className="font-semibold text-slate-200">{user.email}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              title="Populate empty Firestore with default data"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-500 hover:text-white sm:flex"
            >
              <Database className="size-3.5 text-cyan-400" />
              <span>{isSeeding ? "Syncing…" : "Initialize Starter Data"}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 transition-colors hover:bg-cyan-500/20"
            >
              <span>View Live Site</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </header>

        {/* Tab Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-5xl">
            {activeTab === "profile" && <AdminProfile />}
            {activeTab === "projects" && <AdminProjects />}
            {activeTab === "skills" && <AdminSkills />}
            {activeTab === "experience" && <AdminExperience />}
            {activeTab === "certifications" && <AdminCertifications />}
            {activeTab === "education" && <AdminEducation />}
            {activeTab === "messages" && <AdminMessages />}
          </div>
        </main>
      </div>
    </div>
  );
}
