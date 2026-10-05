"use client";

import { useState } from "react";

async function update(x: {
  id: number;
  company: string;
  role: string;
  status: string;
  userId: number;
}): Promise<{ success: boolean; error: string | null }> {
  try {
    const response = await fetch(`/api/jobs/${x.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(x),
    });

    if (!response.ok) {
      const body = await response.json();
      return {
        success: false,
        error: body.error ?? "Unable to update",
      };
    }

    return { success: true, error: null };
  } catch {
    return {
      success: false,
      error: "Internal server error",
    };
  }
}

async function deleteCard(x: {
  id: number;
  company: string;
  role: string;
  status: string;
  userId: number;
}): Promise<{ success: boolean; error: string | null }> {
  try {
    const response = await fetch(`/api/jobs/${x.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const body = await response.json();

      return {
        success: false,
        error: body.error ?? "Unable to delete",
      };
    }

    return { success: true, error: null };
  } catch {
    return {
      success: false,
      error: "Internal error",
    };
  }
}

const statusStyles: Record<string, string> = {
  applied:
    "border-blue-200 bg-blue-50 text-blue-700 focus:border-blue-500 focus:ring-blue-500/10",
  interview:
    "border-violet-200 bg-violet-50 text-violet-700 focus:border-violet-500 focus:ring-violet-500/10",
  rejected:
    "border-red-200 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-500/10",
  offer:
    "border-emerald-200 bg-emerald-50 text-emerald-700 focus:border-emerald-500 focus:ring-emerald-500/10",
};

export function JobCard({
  x,
  onDelete,
}: {
  x: {
    id: number;
    company: string;
    role: string;
    status: string;
    userId: number;
  };
  onDelete: (id: number) => void;
}) {
  const [status, setStatus] = useState<string>(x.status);
  const [error, setError] = useState<null | string>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const currentStatusStyle =
    statusStyles[status] ??
    "border-slate-200 bg-slate-50 text-slate-700 focus:border-blue-500 focus:ring-blue-500/10";

  return (
    <article
      className="group relative flex w-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:w-[280px]"
    >
      <button
        type="button"
        aria-label={`Delete ${x.company} application`}
        title="Delete application"
        disabled={isUpdating}
        onClick={async () => {
          setError(null);
          setIsUpdating(true);

          const parsed = await deleteCard({
            id: Number(x.id),
            company: x.company,
            role: x.role,
            status: x.status,
            userId: x.userId,
          });

          if (!parsed.success) {
            setError(parsed.error);
          } else {
            onDelete(x.id);
          }

          setIsUpdating(false);
        }}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            d="M5 5L15 15M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="pr-8">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Company
        </p>

        <h2 className="mt-1 truncate text-lg font-semibold text-slate-900">
          {x.company}
        </h2>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Role
        </p>

        <p className="mt-1 text-sm font-medium leading-5 text-slate-700">
          {x.role}
        </p>
      </div>

      <div className="mt-5">
        <label
          htmlFor={`inpStatus-${x.id}`}
          className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400"
        >
          Status
        </label>

        <select
          id={`inpStatus-${x.id}`}
          className={`w-full rounded-lg border px-3 py-2 text-sm font-medium outline-none transition focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${currentStatusStyle}`}
          value={status}
          disabled={isUpdating}
          onChange={async (event) => {
            setError(null);

            const oldStatus = status;
            const newStatus = event.target.value;

            setIsUpdating(true);
            setStatus(newStatus);

            const parsed = await update({
              id: Number(x.id),
              company: x.company,
              role: x.role,
              status: newStatus,
              userId: x.userId,
            });

            if (!parsed.success) {
              setStatus(oldStatus);
              setError(parsed.error);
            }

            setIsUpdating(false);
          }}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>
      </div>

      {isUpdating && (
        <p className="mt-2 text-xs text-slate-400">Saving changes...</p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-4 text-red-700"
        >
          {error}
        </p>
      )}
    </article>
  );
}
