import Link from "next/link";
import { Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Chapter } from "../types";

interface ChapterCardProps {
  chapter: Chapter;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  return (
    <Link href={`/chapters/${chapter.id}`} className="block h-full transition-transform hover:-translate-y-1">
      <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg leading-tight">{chapter.name}</CardTitle>
            <CardDescription className="mt-1">{chapter.subject_name}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
