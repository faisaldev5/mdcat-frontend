import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  subject?: { id: number; name: string };
  chapter?: { id: number; name: string };
  collection?: { title: string };
}

export function ContentBreadcrumb({ subject, chapter, collection }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/subjects" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {subject && (
          <>
            <li><ChevronRight className="h-4 w-4" /></li>
            <li>
              <Link href={`/subjects/${subject.id}`} className="hover:text-foreground transition-colors">
                {subject.name}
              </Link>
            </li>
          </>
        )}
        
        {chapter && (
          <>
            <li><ChevronRight className="h-4 w-4" /></li>
            <li>
              <Link href={`/chapters/${chapter.id}`} className="hover:text-foreground transition-colors">
                {chapter.name}
              </Link>
            </li>
          </>
        )}
        
        {collection && (
          <>
            <li><ChevronRight className="h-4 w-4" /></li>
            <li>
              <span className="text-foreground font-medium" aria-current="page">
                {collection.title}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
