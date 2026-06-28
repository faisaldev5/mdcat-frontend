"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useCollection } from "@/features/content/hooks/useCollection";
import { useChapter } from "@/features/content/hooks/useChapter";
import { useAuthStore } from "@/stores/auth.store";
import { PublicNav } from "@/components/layouts/public-nav";
import { PublicFooter } from "@/components/layouts/public-footer";
import { ContentBreadcrumb } from "@/features/content/components/ContentBreadcrumb";
import { LoadingState } from "@/components/shared/loading-state";
import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CollectionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  // Unwrap params
  const resolvedParams = use(params);
  const collectionId = parseInt(resolvedParams.id, 10);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const { data: collection, isLoading: loadingCollection, error: errorCollection, refetch: refetchCollection } = useCollection(collectionId);
  
  // Conditionally fetch chapter to get the subject_id for a fully clickable breadcrumb
  const { data: chapter, isLoading: loadingChapter, error: errorChapter } = useChapter(collection?.chapter_id || 0);

  const [isStarting, setIsStarting] = useState(false);

  const handleStartQuiz = () => {
    setIsStarting(true);
    
    if (!isAuthenticated) {
      // Redirect to login with friendly message
      router.push(`/login?redirect=/quiz/start/${collectionId}&message=login_required`);
      return;
    }

    // If authenticated, go directly to the quiz engine (to be built in Phase 3E)
    // For now, just simulate redirecting to the quiz engine
    router.push(`/quiz/start/${collectionId}`);
  };

  const isLoading = loadingCollection || (collection && !chapter && loadingChapter);
  const error = errorCollection || errorChapter;

  // Build breadcrumb objects
  const subjectForBreadcrumb = chapter ? { id: chapter.subject_id, name: chapter.subject_name } : undefined;
  const chapterForBreadcrumb = chapter ? { id: chapter.id, name: chapter.name } : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        {collection && (
          <ContentBreadcrumb 
            subject={subjectForBreadcrumb} 
            chapter={chapterForBreadcrumb} 
            collection={collection} 
          />
        )}
        
        {isLoading ? (
          <LoadingState message="Loading quiz details..." />
        ) : error ? (
          <ErrorState 
            title="Unable to load quiz details"
            message="There was a problem connecting to the server. Please try again."
            onRetry={refetchCollection}
          />
        ) : collection ? (
          <div className="max-w-4xl mx-auto mt-8">
            <Card className="overflow-hidden border-2 border-primary/10">
              <div className="bg-primary/5 p-8 md:p-12 text-center border-b border-primary/10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                  {collection.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {collection.description || "Test your knowledge with this comprehensive quiz."}
                </p>
              </div>
              
              <CardContent className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <p className="font-semibold capitalize">{collection.type.replace("_", " ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <p className="font-semibold capitalize text-green-600">{collection.status}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8 pt-6 border-t">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto px-12 py-6 text-lg gap-3"
                    onClick={handleStartQuiz}
                    disabled={isStarting}
                  >
                    <PlayCircle className="h-6 w-6" />
                    {isStarting ? "Preparing Quiz..." : "Start Quiz"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </main>

      <PublicFooter />
    </div>
  );
}
