import { Suspense } from "react";
import NewsDetail from "@/components/NewsDetail";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <Link
        href="/news"
        className="inline-flex items-center text-[#00FFAB] hover:text-[#00FFAB]/80 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to News
      </Link>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-[#00FFAB]" />
          </div>
        }
      >
        <NewsDetail id={params.id} />
      </Suspense>
    </div>
  );
}
