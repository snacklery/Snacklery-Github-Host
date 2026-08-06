import { Button } from "@/components/ui/button";

interface LearnPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const LearnPagination = ({ page, totalPages, onPageChange }: LearnPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
};

export default LearnPagination;
