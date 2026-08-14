import { useQueryClient } from "@tanstack/react-query";
import { GraduationCap, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCollectionData } from "@/hooks/useContent";
import { createItem, deleteItem, saveItem } from "@/lib/content";
import { seedEducation } from "@/lib/seed-data";
import type { Education } from "@/lib/types";

const EMPTY_EDU: Omit<Education, "id"> = {
  degree: "",
  institution: "",
  period: "2020 — 2024",
  description: "",
  order: 1,
};

export function AdminEducation() {
  const queryClient = useQueryClient();
  const { data: education = seedEducation, isLoading } = useCollectionData<Education>("education");
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setEditingEdu({
      id: `edu_${Date.now()}`,
      ...EMPTY_EDU,
      order: education.length + 1,
    });
    setIsCreating(true);
  };

  const startEdit = (edu: Education) => {
    setEditingEdu({ ...edu });
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;
    setSaving(true);
    try {
      if (isCreating) {
        await createItem("education", editingEdu);
      } else {
        await saveItem("education", editingEdu.id, editingEdu);
      }
      await queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success(isCreating ? "Education entry added!" : "Education updated!");
      setEditingEdu(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save education.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, degree: string) => {
    if (!confirm(`Delete "${degree}"?`)) return;
    try {
      await deleteItem("education", id);
      await queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education entry deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete education.");
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
          <h2 className="text-xl font-bold text-white">Education &amp; Academics</h2>
          <p className="text-xs text-slate-400">
            Degrees, college/university, academic projects, and specializations.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">{edu.degree}</h3>
                <p className="text-xs text-cyan-400">{edu.institution}</p>
                <span className="text-[11px] text-slate-400">{edu.period}</span>
                {edu.description && (
                  <p className="mt-2 text-xs text-slate-300">{edu.description}</p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => startEdit(edu)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-500 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(edu.id, edu.degree)}
                className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {isCreating ? "Add Education" : `Edit: ${editingEdu.degree}`}
              </h3>
              <button
                onClick={() => setEditingEdu(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Degree / Field of Study
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Technology in Computer Science"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Institution / University
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  placeholder="e.g. JNTU University"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Period / Years
                  </label>
                  <input
                    type="text"
                    value={editingEdu.period}
                    onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                    placeholder="e.g. 2021 — 2025"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingEdu.order}
                    onChange={(e) =>
                      setEditingEdu({ ...editingEdu, order: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Description / GPA / Honors
                </label>
                <textarea
                  rows={3}
                  value={editingEdu.description}
                  onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  placeholder="Key coursework, achievements, CGPA..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingEdu(null)}
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
                  <span>Save Education</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
