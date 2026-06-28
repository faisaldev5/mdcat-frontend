"use client";

import { useSubjects } from "@/features/content/hooks/useSubjects";
import { SubjectCard } from "@/features/content/components/SubjectCard";
import { PublicNav } from "@/components/layouts/public-nav";
import { PublicFooter } from "@/components/layouts/public-footer";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingState } from "@/components/shared/loading-state";
import { ErrorState } from "@/components/shared/error-state";
import { ContentBreadcrumb } from "@/features/content/components/ContentBreadcrumb";

export default function SubjectsPage() {
  const { data: subjects, isLoading, error, refetch } = useSubjects();

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        <ContentBreadcrumb />
        
        <PageHeader 
          title="Browse Subjects" 
          description="Explore our comprehensive curriculum and start preparing for your MDCAT."
        />

        {isLoading ? (
          <LoadingState message="Loading subjects..." />
        ) : error ? (
          <ErrorState 
            title="Unable to load subjects"
            message="There was a problem connecting to the server. Please try again."
            onRetry={refetch}
          />
        ) : !subjects || subjects.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No subjects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
