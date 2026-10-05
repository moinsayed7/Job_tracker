import { prisma } from "@/lib/prisma";
import { JobList } from "./JobList";
import { auth } from "@/lib/auth";

type data = {
  id: number;
  company: string;
  role: string;
  status: string;
  createdAt: string;
  userId: number;
};

export async function getData(): Promise<data[]> {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const userId = Number(session.user.id);

  if (Number.isNaN(userId)) {
    return [];
  }

  const jobs = await prisma.job.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  });

  return jobs.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));
}

async function RenderCard() {
  const data = await getData();

  return <JobList data={data} />;
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <RenderCard />
      </div>
    </main>
  );
}
