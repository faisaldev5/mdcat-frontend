import Link from "next/link";
import { Book } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Subject } from "../types";

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link href={`/subjects/${subject.id}`} className="block h-full transition-transform hover:-translate-y-1">
      <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Book className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">{subject.name}</CardTitle>
            <CardDescription>Explore all chapters</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
