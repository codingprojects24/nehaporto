import { useQueryClient } from "@tanstack/react-query";
import { Briefcase, Calendar, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { MediaUploader } from "@/components/admin/MediaUploader";
import { useCollectionData } from "@/hooks/useContent";
import { createItem, deleteItem, saveItem } from "@/lib/content";
import { seedExperience } from "@/lib/seed-data";
import type { Experience } from "@/lib/types";

const EMPTY_EXP: Omit<Experience, "id"> = {
  company: "",
  role: "",
  type: "Full-time",
  startDate: "2024",
  endDate: "Present",
  current: true,
  description: "",
  companyLogoUrl: "",
  order: 1,
};

export function AdminExperience() {
  const queryClient = useQueryClient();
  const { data: experience = seedExperience, isLoading } =
    useCollectionData<Experience>("experience");
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setEditingExp({
      id: `exp_${Date.now()}`,
      ...EMPTY_EXP,
      order: experience.length + 1,
    });
    setIsCreating(true);
  };

  const startEdit = (exp: Experience) => {
    setEditingExp({ ...exp });
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    setSaving(true);
    try {
      if (isCreating) {
        await createItem("experience", editingExp);
      } else {
        await saveItem("experience", editingExp.id, editingExp);
      }
      await queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success(isCreating ? "Experience created!" : "Experience updated!");
      setEditingExp(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save experience.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, role: string, company: string) => {
    if (!confirm(`Delete "${role} at ${company}"?`)) return;
    try {
      await deleteItem("experience", id);
      await queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete experience.");
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
          <h2 className="text-xl font-bold text-white">Experience Management</h2>
          <p className="text-xs text-slate-400">
            Work history, internships, roles, and project leadership.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3.5">
              {exp.companyLogoUrl ? (
                <img
                  src={exp.companyLogoUrl}
                  alt={exp.company}
                  className="size-10 rounded-xl object-contain bg-slate-800 p-1"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Briefcase className="size-5" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-white">{exp.role}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="font-medium text-cyan-400">{exp.company}</span>
                  <span>&bull;</span>
                  <span>{exp.type}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {exp.startDate} &ndash; {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-300">{exp.description}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => startEdit(exp)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-500 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id, exp.role, exp.company)}
                className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {isCreating ? "Add Work Experience" : `Edit: ${editingExp.role}`}
              </h3>
              <button
                onClick={() => setEditingExp(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Job Title / Role
                </label>
                <input
                  type="text"
                  required
                  value={editingExp.role}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  placeholder="e.g. Gen AI Full Stack Engineer"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={editingExp.company}
                  onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    value={editingExp.type}
                    onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value })}
                    placeholder="Full-time, Internship, Freelance"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingExp.order}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, order: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={editingExp.startDate}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    placeholder="e.g. Jan 2024"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">End Date</label>
                  <input
                    type="text"
                    disabled={editingExp.current}
                    value={editingExp.endDate}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    placeholder={editingExp.current ? "Present" : "e.g. Dec 2024"}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="current-exp"
                  checked={editingExp.current}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      current: e.target.checked,
                      endDate: e.target.checked ? "Present" : editingExp.endDate,
                    })
                  }
                  className="size-4 rounded accent-cyan-500"
                />
                <label htmlFor="current-exp" className="text-xs font-medium text-slate-300">
                  I currently work in this role
                </label>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Description &amp; Key Highlights
                </label>
                <textarea
                  rows={3}
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="mb-1 text-xs font-bold text-white">Company Logo / Badge Image</h4>
                <MediaUploader
                  value={editingExp.companyLogoUrl}
                  onUpload={(url) => setEditingExp({ ...editingExp, companyLogoUrl: url })}
                  accept="image/*"
                  label="Upload Company Logo"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
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
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
