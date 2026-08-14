import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, Loader2, Mail, RefreshCw, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { deleteMessage, fetchMessages, type Message } from "@/lib/content";

export function AdminMessages() {
  const queryClient = useQueryClient();
  const {
    data: messages = [],
    isLoading,
    isFetching,
  } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    staleTime: 10_000,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    setDeletingId(id);
    try {
      await deleteMessage(id);
      await queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Message deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["messages"] });
    toast.success("Refreshed inbox.");
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Contact Form Inquiries</h2>
          <p className="text-xs text-slate-400">
            Messages and collaboration requests submitted through your portfolio contact form.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isFetching}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-cyan-500 hover:text-white"
        >
          <RefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-500">
            <Mail className="size-6" />
          </div>
          <h3 className="font-bold text-white">No messages yet</h3>
          <p className="mt-1 text-xs text-slate-400">
            New contact submissions will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <User className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{msg.name}</h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {msg.createdAt && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="size-3" />
                      {new Date(msg.createdAt).toLocaleDateString()} at{" "}
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={deletingId === msg.id}
                    className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="mt-3 text-xs font-semibold text-slate-200">
                  Subject: {msg.subject}
                </div>
              )}

              <div className="mt-2 rounded-xl bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-300">
                {msg.message}
              </div>

              <div className="mt-3 flex justify-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your message on my portfolio")}`}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-cyan-500 hover:text-white"
                >
                  Reply via Email &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
