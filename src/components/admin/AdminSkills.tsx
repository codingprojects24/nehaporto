import { useQueryClient } from "@tanstack/react-query";
import { Code2, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCollectionData } from "@/hooks/useContent";
import { createItem, deleteItem, saveItem } from "@/lib/content";
import { seedSkills } from "@/lib/seed-data";
import type { SkillGroup } from "@/lib/types";

export function AdminSkills() {
  const queryClient = useQueryClient();
  const { data: skills = seedSkills, isLoading } = useCollectionData<SkillGroup>("skills");
  const [editingGroup, setEditingGroup] = useState<SkillGroup | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setEditingGroup({
      id: `skill_${Date.now()}`,
      category: "New Category",
      items: ["Skill 1", "Skill 2"],
      order: skills.length + 1,
      colorAccent: "cyan",
    });
    setIsCreating(true);
  };

  const startEdit = (group: SkillGroup) => {
    setEditingGroup({ ...group, items: group.items || [] });
    setIsCreating(false);
  };

  const handleAddTag = () => {
    if (!tagInput.trim() || !editingGroup) return;
    if (!editingGroup.items.includes(tagInput.trim())) {
      setEditingGroup({
        ...editingGroup,
        items: [...editingGroup.items, tagInput.trim()],
      });
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    if (!editingGroup) return;
    setEditingGroup({
      ...editingGroup,
      items: editingGroup.items.filter((t) => t !== tag),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGroup) return;
    setSaving(true);
    try {
      if (isCreating) {
        await createItem("skills", editingGroup);
      } else {
        await saveItem("skills", editingGroup.id, editingGroup);
      }
      await queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success(isCreating ? "Skill group created!" : "Skill group updated!");
      setEditingGroup(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save skill group.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, category: string) => {
    if (!confirm(`Delete skill group "${category}"?`)) return;
    try {
      await deleteItem("skills", id);
      await queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill group deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete skill group.");
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
          <h2 className="text-xl font-bold text-white">Skills &amp; Tech Stack</h2>
          <p className="text-xs text-slate-400">
            Categorize your core programming skills, frameworks, tools, and libraries.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add Skill Category</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.id}
            className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Code2 className="size-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{group.category}</h3>
                  <span className="text-[10px] text-slate-400">Order: {group.order}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(group)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:border-cyan-500 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(group.id, group.category)}
                  className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {isCreating ? "New Skill Category" : `Edit: ${editingGroup.category}`}
              </h3>
              <button
                onClick={() => setEditingGroup(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={editingGroup.category}
                  onChange={(e) => setEditingGroup({ ...editingGroup, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingGroup.order}
                  onChange={(e) =>
                    setEditingGroup({ ...editingGroup, order: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Skills / Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="e.g. Python, Docker, PyTorch"
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {editingGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-md bg-cyan-500/15 px-2.5 py-1 text-xs font-medium text-cyan-300"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(skill)}
                        className="hover:text-rose-400"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingGroup(null)}
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
                  <span>Save Skills</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
