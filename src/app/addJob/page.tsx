"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

async function sendData(x: {
  company: string;
  role: string;
  status: string;
}) {
  await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(x),
  });
}

export default function AddJob() {
  const [comp, setComp] = useState<string>("");
  const [inpRole, setRole] = useState<string>("");
  const [inpStatus, setStatus] = useState<string>("applied");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comp.trim() === "" || inpRole.trim() === "") {
      alert("Please enter complete information");
      return;
    }

    setIsLoading(true);

    try {
      await sendData({
        company: comp,
        role: inpRole,
        status: inpStatus,
      });

      setComp("");
      setRole("");
      setStatus("applied");

      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">Job Tracker</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Add a job application
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Keep your job search organized by adding a new application.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="inpComp"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Company
              </label>

              <input
                id="inpComp"
                type="text"
                value={comp}
                onChange={(e) => setComp(e.target.value)}
                placeholder="e.g. Google"
                autoComplete="organization"
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            <div>
              <label
                htmlFor="inpRole"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Role
              </label>

              <input
                id="inpRole"
                type="text"
                value={inpRole}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer"
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            <div>
              <label
                htmlFor="inpStatus"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Application status
              </label>

              <select
                id="inpStatus"
                value={inpStatus}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/")}
                disabled={isLoading}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Adding..." : "Add application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
