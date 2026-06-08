"use client";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";

export default function ApplyButton({ jobId }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleApply = () => {
    if (!session) {
      router.push(`/signin?redirect=/jobs/${jobId}/apply`);
    } else {
      router.push(`/jobs/${jobId}/apply`);
    }
  };

  return (
    <button
      onClick={handleApply}
      className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
      style={{
        background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
        boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
      }}
    >
      Apply Now
      <ArrowUpRightFromSquare className="w-3.5 h-3.5" />
    </button>
  );
}