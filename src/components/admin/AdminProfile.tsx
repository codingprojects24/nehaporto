import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, Plus, Save, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { MediaUploader } from "@/components/admin/MediaUploader";
import { useProfile } from "@/hooks/useContent";
import { saveProfile } from "@/lib/content";
import { seedProfile } from "@/lib/seed-data";
import type { Profile, Stat } from "@/lib/types";

export function AdminProfile() {
  const queryClient = useQueryClient();
  const { data: initialData, isLoading } = useProfile();
  const [profile, setProfile] = useState<Profile>(initialData ?? seedProfile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setProfile(initialData);
    }
  }, [initialData]);

  const handleStatChange = (index: number, field: keyof Stat, value: string) => {
    const nextStats = [...profile.stats];
    const current = nextStats[index] ?? { value: "", label: "" };
    nextStats[index] = { ...current, [field]: value };
    setProfile({ ...profile, stats: nextStats });
  };

  const addStat = () => {
    setProfile({
      ...profile,
      stats: [...profile.stats, { value: "10+", label: "New Metric" }],
    });
  };

  const removeStat = (index: number) => {
    setProfile({
      ...profile,
      stats: profile.stats.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProfile(profile);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile saved and live on website!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
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
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Profile &amp; Biography</h2>
          <p className="text-xs text-slate-400">
            Edit your core identity, hero headlines, photo, resume, and social contacts.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Media Uploads Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="mb-1 text-sm font-semibold text-white">Avatar / Profile Photo</h3>
          <p className="mb-4 text-xs text-slate-400">
            Upload your profile picture. Stored on Cloudinary and synced to Firestore.
          </p>
          <MediaUploader
            value={profile.profileImageUrl}
            onUpload={(url) => setProfile({ ...profile, profileImageUrl: url })}
            accept="image/*"
            label="Upload Avatar Photo"
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="mb-1 text-sm font-semibold text-white">Resume Document (PDF)</h3>
          <p className="mb-4 text-xs text-slate-400">
            Upload PDF resume or paste direct link for the &ldquo;Download CV&rdquo; button.
          </p>
          <MediaUploader
            value={profile.resumeUrl}
            onUpload={(url) => setProfile({ ...profile, resumeUrl: url })}
            accept="application/pdf,image/*"
            label="Upload PDF Resume"
          />
        </div>
      </div>

      {/* Main Info */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">General Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Hero Tagline / Role
            </label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Hero Subtext / Short Pitch
            </label>
            <textarea
              rows={2}
              value={profile.heroSubtext}
              onChange={(e) => setProfile({ ...profile, heroSubtext: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Full About / Bio
            </label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Key Stats &amp; Highlights</h3>
            <p className="text-xs text-slate-400">Counters displayed in the About section.</p>
          </div>
          <button
            type="button"
            onClick={addStat}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-cyan-500 hover:text-white"
          >
            <Plus className="size-3.5" />
            Add Stat
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {profile.stats?.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 p-3"
            >
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(i, "value", e.target.value)}
                  placeholder="e.g. 15+"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-sm font-bold text-cyan-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(i, "label", e.target.value)}
                  placeholder="e.g. Projects Shipped"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeStat(i)}
                className="text-slate-500 transition-colors hover:text-rose-400"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Social & Contact Links */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">Social &amp; Contact Links</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">LinkedIn URL</label>
            <input
              type="url"
              value={profile.linkedin}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">GitHub URL</label>
            <input
              type="url"
              value={profile.github}
              onChange={(e) => setProfile({ ...profile, github: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Instagram URL</label>
            <input
              type="url"
              value={profile.instagram}
              onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
