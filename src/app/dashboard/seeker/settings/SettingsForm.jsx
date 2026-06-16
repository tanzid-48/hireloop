"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const inputCls =
  "w-full border text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 focus:border-violet-500/50 transition-all outline-none";
const iBase = {
  backgroundColor: "rgba(255,255,255,0.03)",
  borderColor: "rgba(255,255,255,0.07)",
};

export default function SettingsForm({ user }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    headline: "",
    bio: "",
    skills: "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Profile updated!");
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Profile Information */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-5"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Profile Information
        </p>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-violet-400 overflow-hidden shrink-0"
            style={{
              backgroundColor: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            {user?.image ? (
              <Image
              width={64}
              height={64}
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              initials
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              JPG, GIF or PNG. Max 5MB.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              className={inputCls}
              style={iBase}
              placeholder="Your full name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              className={inputCls}
              style={{ ...iBase, opacity: 0.5, cursor: "not-allowed" }}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="submit"
            disabled={saving}
            className="px-5 h-9 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>
          <button
            type="button"
            className="px-5 h-9 rounded-xl text-sm hover:text-white/60 transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Reset Password
          </button>
        </div>
      </div>

      {/* Professional Details */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Professional Details
        </p>
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Professional Headline
          </label>
          <input
            type="text"
            value={form.headline}
            onChange={set("headline")}
            className={inputCls}
            style={iBase}
            placeholder="e.g. Senior Frontend Developer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={set("bio")}
            rows={4}
            className={inputCls + " resize-none"}
            style={iBase}
            placeholder="Brief description about yourself and your experience..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Skills
          </label>
          <input
            type="text"
            value={form.skills}
            onChange={set("skills")}
            className={inputCls}
            style={iBase}
            placeholder="e.g. React, Node.js, MongoDB"
          />
          <p
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Separate skills with commas
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-fit px-5 h-9 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}
        >
          {saving ? "Saving..." : "Save Details"}
        </button>
      </div>

      {/* Notification Preferences */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Notification Preferences
        </p>
        {[
          {
            label: "Job Alerts",
            desc: "Get notified when new jobs match your profile",
          },
          {
            label: "Application Updates",
            desc: "Status changes on your submitted applications",
          },
          {
            label: "Platform Newsletter",
            desc: "Tips, guides, and HireLoop updates",
          },
        ].map((item, i, arr) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5"
            style={{
              borderBottom:
                i < arr.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
            }}
          >
            <div>
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {item.desc}
              </p>
            </div>
            <div
              className="w-10 h-5 rounded-full relative cursor-pointer transition-all"
              style={{
                backgroundColor: "rgba(139,92,246,0.4)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(248,113,113,0.04)",
          border: "1px solid rgba(248,113,113,0.12)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "rgba(248,113,113,0.6)" }}
        >
          Danger Zone
        </p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-medium text-white">Delete Account</p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Permanently delete your account and all data.
            </p>
          </div>
          <button
            type="button"
            className="px-4 h-9 rounded-xl text-xs font-bold transition-all hover:opacity-80"
            style={{
              backgroundColor: "rgba(248,113,113,0.1)",
              color: "#f87171",
              border: "1px solid rgba(248,113,113,0.2)",
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </form>
  );
}
