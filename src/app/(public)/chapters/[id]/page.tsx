"use client";

import { use } from "react";
import { useChapter } from "@/features/content/hooks/useChapter";
import { useCollections } from "@/features/content/hooks/useCollections";
import { CollectionCard } from "@/features/content/components/CollectionCard";
import { PublicNav } from "@/components/layouts/public-nav";
import { PublicFooter } from "@/components/layouts/public-footer";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingState } from "@/components/shared/loading-state";
import { ErrorState } from "@/components/shared/error-state";
import { ContentBreadcrumb } from "@/features/content/components/ContentBreadcrumb";

interface ChapterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ChapterDetailPage({ params }: ChapterDetailPageProps) {
  // Unwrap params
  const resolvedParams = use(params);
  const chapterId = parseInt(resolvedParams.id, 10);

  const { data: chapter, isLoading: loadingChapter, error: errorChapter, refetch: refetchChapter } = useChapter(chapterId);
  const { data: collections, isLoading: loadingCollections, error: errorCollections, refetch: refetchCollections } = useCollections(chapterId);

  const isLoading = loadingChapter || loadingCollections;
  const error = errorChapter || errorCollections;
  const refetch = () => { refetchChapter(); refetchCollections(); };

  // Construct subject object for breadcrumb if chapter is loaded
  const subjectForBreadcrumb = chapter ? { id: chapter.subject_id, name: chapter.subject_name } : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        {chapter && (
          <ContentBreadcrumb subject={subjectForBreadcrumb} chapter={chapter} />
        )}
        
        {isLoading ? (
          <LoadingState message="Loading chapter details..." />
        ) : error ? (
          <ErrorState 
            title="Unable to load collections"
            message="There was a problem connecting to the server. Please try again."
            onRetry={refetch}
          />
        ) : (
          <>
            <PageHeader 
              title={chapter?.name || "Chapter"} 
              description="Select a collection to start a quiz."
            />

            {!collections || collections.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No collections found for this chapter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
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
