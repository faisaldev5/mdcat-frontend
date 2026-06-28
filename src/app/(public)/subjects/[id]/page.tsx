"use client";

import { use } from "react";
import { useSubject } from "@/features/content/hooks/useSubject";
import { useChapters } from "@/features/content/hooks/useChapters";
import { ChapterCard } from "@/features/content/components/ChapterCard";
import { PublicNav } from "@/components/layouts/public-nav";
import { PublicFooter } from "@/components/layouts/public-footer";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingState } from "@/components/shared/loading-state";
import { ErrorState } from "@/components/shared/error-state";
import { ContentBreadcrumb } from "@/features/content/components/ContentBreadcrumb";

interface SubjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SubjectDetailPage({ params }: SubjectDetailPageProps) {
  // Unwrap params (required for Next.js 15+ App Router dynamic segments)
  const resolvedParams = use(params);
  const subjectId = parseInt(resolvedParams.id, 10);

  const { data: subject, isLoading: loadingSubject, error: errorSubject, refetch: refetchSubject } = useSubject(subjectId);
  const { data: chapters, isLoading: loadingChapters, error: errorChapters, refetch: refetchChapters } = useChapters(subjectId);

  const isLoading = loadingSubject || loadingChapters;
  const error = errorSubject || errorChapters;
  const refetch = () => { refetchSubject(); refetchChapters(); };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        {subject && (
          <ContentBreadcrumb subject={subject} />
        )}
        
        {isLoading ? (
          <LoadingState message="Loading subject details..." />
        ) : error ? (
          <ErrorState 
            title="Unable to load chapters"
            message="There was a problem connecting to the server. Please try again."
            onRetry={refetch}
          />
        ) : (
          <>
            <PageHeader 
              title={subject?.name || "Subject"} 
              description="Select a chapter to view its available collections."
            />

            {!chapters || chapters.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No chapters found for this subject.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {chapters.map((chapter) => (
                  <ChapterCard key={chapter.id} chapter={chapter} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
