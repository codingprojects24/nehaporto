import { useQueryClient } from "@tanstack/react-query";
import { Award, ExternalLink, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { MediaUploader } from "@/components/admin/MediaUploader";
import { useCollectionData } from "@/hooks/useContent";
import { createItem, deleteItem, saveItem } from "@/lib/content";
import { seedCertifications } from "@/lib/seed-data";
import type { Certification } from "@/lib/types";

const EMPTY_CERT: Omit<Certification, "id"> = {
  title: "",
  issuer: "",
  date: "2024",
  credentialUrl: "",
  badgeImageUrl: "",
  order: 1,
};

export function AdminCertifications() {
  const queryClient = useQueryClient();
  const { data: certs = seedCertifications, isLoading } =
    useCollectionData<Certification>("certifications");
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setEditingCert({
      id: `cert_${Date.now()}`,
      ...EMPTY_CERT,
      order: certs.length + 1,
    });
    setIsCreating(true);
  };

  const startEdit = (cert: Certification) => {
    setEditingCert({ ...cert });
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    setSaving(true);
    try {
      if (isCreating) {
        await createItem("certifications", editingCert);
      } else {
        await saveItem("certifications", editingCert.id, editingCert);
      }
      await queryClient.invalidateQueries({ queryKey: ["certifications"] });
      toast.success(isCreating ? "Certification created!" : "Certification updated!");
      setEditingCert(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save certification.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete certification "${title}"?`)) return;
    try {
      await deleteItem("certifications", id);
      await queryClient.invalidateQueries({ queryKey: ["certifications"] });
      toast.success("Certification deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete certification.");
    }
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
          <h2 className="text-xl font-bold text-white">Certifications &amp; Badges</h2>
          <p className="text-xs text-slate-400">
            Professional credentials, course certifications, and licenses.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="flex items-start gap-3">
              {cert.badgeImageUrl ? (
                <img
                  src={cert.badgeImageUrl}
                  alt={cert.title}
                  className="size-12 rounded-xl object-contain bg-slate-800 p-1.5"
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Award className="size-6" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-bold text-white leading-snug">{cert.title}</h3>
                <p className="text-xs text-cyan-400">{cert.issuer}</p>
                <span className="text-[11px] text-slate-400">{cert.date}</span>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4">
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400"
                >
                  <ExternalLink className="size-3.5" /> Verify
                </a>
              ) : (
                <span className="text-xs text-slate-600">No URL</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(cert)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:border-cyan-500 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cert.id, cert.title)}
                  className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {isCreating ? "Add Certification" : `Edit: ${editingCert.title}`}
              </h3>
              <button
                onClick={() => setEditingCert(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Certification Title
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services, DeepLearning.AI"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Issue Date / Year
                  </label>
                  <input
                    type="text"
                    value={editingCert.date}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingCert.order}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, order: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Credential / Verification Link
                </label>
                <input
                  type="url"
                  value={editingCert.credentialUrl}
                  onChange={(e) =>
                    setEditingCert({ ...editingCert, credentialUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="mb-1 text-xs font-bold text-white">Badge / Certificate Image</h4>
                <MediaUploader
                  value={editingCert.badgeImageUrl}
                  onUpload={(url) => setEditingCert({ ...editingCert, badgeImageUrl: url })}
                  accept="image/*"
                  label="Upload Badge Image"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  <span>Save Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
