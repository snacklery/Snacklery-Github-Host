import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthorByName } from "@/lib/content/loader";

const AuthorCard = ({ authorName }: { authorName: string }) => {
  const author = getAuthorByName(authorName);
  if (!author) return null;

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4 flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-foreground">{author.name}</p>
        <p className="text-sm text-muted-foreground">{author.role}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
