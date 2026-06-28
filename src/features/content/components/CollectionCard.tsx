import Link from "next/link";
import { PlayCircle, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collection } from "../types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const typeLabel = collection.type.replace("_", " ");

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
      <CardHeader className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <Badge variant="secondary" className="capitalize">
            {typeLabel}
          </Badge>
        </div>
        <CardTitle className="text-xl mb-2">{collection.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {collection.description || "Test your knowledge with this quiz."}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-4 pb-4 bg-transparent border-t">
        <Button render={<Link href={`/collections/${collection.id}`} />} className="w-full gap-2 group">
          <PlayCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
