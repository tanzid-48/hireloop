"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const inputCls =
  "w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 focus:border-violet-500/50 transition-all outline-none";
const iBase = { backgroundColor: "rgba(255,255,255,0.03)" };

export default function RecruiterSettingsForm({ user }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Settings saved!");
    setSaving(false);
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "R";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-violet-400 overflow-hidden shrink-0"
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
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              className={inputCls}
              style={iBase}
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
              Email
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
            className="px-5 h-9 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="px-5 h-9 rounded-xl text-sm text-white/40 transition-all hover:text-white/60"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Reset Password
          </button>
        </div>
      </div>

      {/* Notification Prefs */}
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
          Notifications
        </p>
        {[
          {
            label: "New Applications",
            desc: "When a candidate applies to your job",
          },
          {
            label: "Application Updates",
            desc: "Status changes on your postings",
          },
          {
            label: "Platform Alerts",
            desc: "System and security notifications",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2"
            style={{
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
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
              <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
