import { useQueryClient } from "@tanstack/react-query";
import {
  ExternalLink,
  Eye,
  Github,
  Loader2,
  Plus,
  Save,
  Star,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { MediaUploader } from "@/components/admin/MediaUploader";
import { useCollectionData } from "@/hooks/useContent";
import { createItem, deleteItem, saveItem } from "@/lib/content";
import { seedProjects } from "@/lib/seed-data";
import type { Project } from "@/lib/types";

const EMPTY_PROJECT: Omit<Project, "id"> = {
  title: "",
  description: "",
  longDescription: "",
  category: "Gen AI",
  techStack: ["React", "TypeScript", "Tailwind CSS"],
  liveUrl: "",
  githubUrl: "",
  thumbnailUrl: "",
  images: [],
  videoUrl: "",
  featured: true,
  order: 1,
};

export function AdminProjects() {
  const queryClient = useQueryClient();
  const { data: projects = seedProjects, isLoading } = useCollectionData<Project>("projects");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setEditingProject({
      id: `proj_${Date.now()}`,
      ...EMPTY_PROJECT,
      order: projects.length + 1,
    });
    setIsCreating(true);
  };

  const startEdit = (proj: Project) => {
    setEditingProject({ ...proj, images: proj.images || [] });
    setIsCreating(false);
  };

  const handleAddTag = () => {
    if (!tagInput.trim() || !editingProject) return;
    if (!editingProject.techStack.includes(tagInput.trim())) {
      setEditingProject({
        ...editingProject,
        techStack: [...editingProject.techStack, tagInput.trim()],
      });
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      techStack: editingProject.techStack.filter((t) => t !== tag),
    });
  };

  const handleAddGalleryImage = (url: string) => {
    if (!url || !editingProject) return;
    setEditingProject({
      ...editingProject,
      images: [...(editingProject.images || []), url],
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      images: editingProject.images.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);
    try {
      if (isCreating) {
        await createItem("projects", editingProject);
      } else {
        await saveItem("projects", editingProject.id, editingProject);
      }
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(isCreating ? "Project created!" : "Project updated!");
      setEditingProject(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteItem("projects", id);
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project.");
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
      {/* Top action bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Projects Management</h2>
          <p className="text-xs text-slate-400">
            Showcase your best builds, upload screenshots and demo videos, and manage live links.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:border-slate-700"
          >
            {/* Thumbnail Preview */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-xs text-slate-600">
                  No Thumbnail
                </div>
              )}
              {project.featured ? (
                <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-cyan-500/90 px-2 py-0.5 text-[10px] font-bold text-slate-950 backdrop-blur-sm">
                  <Star className="size-3 fill-current" /> Featured
                </span>
              ) : null}
              {project.videoUrl ? (
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-cyan-300 backdrop-blur-sm">
                  <Video className="size-3" /> Video Demo
                </span>
              ) : null}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                {project.category}
              </span>
              <h3 className="mt-1 font-bold text-white">{project.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-slate-400">{project.description}</p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {project.techStack?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
                {(project.techStack?.length || 0) > 3 && (
                  <span className="rounded-md bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-800/80 pt-4">
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 transition-colors hover:text-cyan-400"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 transition-colors hover:text-white"
                    >
                      <Github className="size-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200 transition-colors hover:border-cyan-500 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-1 text-rose-400 transition-colors hover:bg-rose-500/20"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {isCreating ? "Add New Project" : `Edit Project: ${editingProject.title}`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    placeholder="e.g. Gen AI, Full Stack, Mobile"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Short Description (card summary)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Detailed Description (modal case-study)
                  </label>
                  <textarea
                    rows={4}
                    value={editingProject.longDescription}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, longDescription: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">Live URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingProject.order}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, order: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingProject.featured}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, featured: e.target.checked })
                    }
                    className="size-4 rounded accent-cyan-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-slate-300">
                    Feature on Home Hero / Highlight
                  </label>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <label className="mb-2 block text-xs font-medium text-slate-300">
                  Tech Stack &amp; Tools
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
                    placeholder="e.g. React, Next.js, Python"
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
                  {editingProject.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-rose-400"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Thumbnail Uploader */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="mb-1 text-xs font-bold text-white">Cover / Thumbnail Image</h4>
                <p className="mb-3 text-[11px] text-slate-400">
                  Main card image on the portfolio grid (Cloudinary uploaded)
                </p>
                <MediaUploader
                  value={editingProject.thumbnailUrl}
                  onUpload={(url) => setEditingProject({ ...editingProject, thumbnailUrl: url })}
                  accept="image/*"
                  label="Upload Thumbnail Cover"
                />
              </div>

              {/* Demo Video Uploader */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="mb-1 text-xs font-bold text-white">
                  Demo Video (MP4 / WebM / Cloud URL)
                </h4>
                <p className="mb-3 text-[11px] text-slate-400">
                  Plays in the modal walkthrough preview
                </p>
                <MediaUploader
                  value={editingProject.videoUrl}
                  onUpload={(url) => setEditingProject({ ...editingProject, videoUrl: url })}
                  accept="video/*"
                  label="Upload Demo Video"
                />
              </div>

              {/* Gallery Images */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="mb-1 text-xs font-bold text-white">Screenshot Carousel Gallery</h4>
                <p className="mb-3 text-[11px] text-slate-400">
                  Add additional photos/screenshots to the project carousel
                </p>
                <MediaUploader
                  onUpload={handleAddGalleryImage}
                  accept="image/*"
                  label="Upload New Screenshot Image"
                />

                {editingProject.images?.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {editingProject.images.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="group relative aspect-video overflow-hidden rounded-lg border border-slate-800 bg-slate-900"
                      >
                        <img
                          src={imgUrl}
                          alt={`Gallery preview ${i}`}
                          className="size-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute right-1 top-1 rounded-full bg-slate-950/80 p-1 text-rose-400 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
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
                  <span>{isCreating ? "Create Project" : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
