"use client";

import { useState } from "react";
import { JobCard } from "./JobCard";

type Job = {
  id: number;
  company: string;
  role: string;
  status: string;
  createdAt: string;
  userId: number;
};

export function JobList({ data }: { data: Job[] }) {
  const [jobData, setJobData] = useState<Job[]>(data);

  function handleDelete(id: number) {
    setJobData((prev) => prev.filter((job) => job.id !== id));
  }

  return (
    <section className="w-full">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Job Tracker</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Your applications
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Keep track of where you are in your job search.
          </p>
        </div>

        <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
          {jobData.length}{" "}
          {jobData.length === 1 ? "application" : "applications"}
        </div>
      </div>

      {jobData.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                d="M7 3.75h10A2.25 2.25 0 0 1 19.25 6v12A2.25 2.25 0 0 1 17 20.25H7A2.25 2.25 0 0 1 4.75 18V6A2.25 2.25 0 0 1 7 3.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8.5 8h7M8.5 11.5h7M8.5 15h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="mt-4 text-base font-semibold text-slate-900">
            No applications yet
          </h2>

          <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
            Add your first job application to start tracking your progress.
          </p>

          <a
            href="/addjob"
            className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            Add your first application
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {jobData.map((job) => (
            <JobCard key={job.id} x={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
