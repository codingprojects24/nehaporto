import { ArrowLeft, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { signIn } from "@/hooks/useAuth";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      toast.success("Signed in successfully!");
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof Error
          ? err.message.replace("Firebase: ", "")
          : "Invalid credentials. Please check your email and password.";
      setError(msg);
      toast.error("Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-10 size-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        <a
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to website
        </a>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <ShieldCheck className="size-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Admin Portal
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">Sign In</h1>
            <p className="mt-1 text-xs text-slate-400">
              Manage portfolio content, gallery media, and project uploads
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                Admin Email
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-slate-800/60 bg-slate-950/40 p-3 text-center text-[11px] text-slate-500">
            <KeyRound className="mx-auto mb-1 size-3.5 text-slate-400" />
            Direct access only. Credentials are authenticated with Firebase.
          </div>
        </div>
      </div>
    </div>
  );
}
