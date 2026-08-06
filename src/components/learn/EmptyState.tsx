const EmptyState = ({ message = "Nothing here yet." }: { message?: string }) => {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
};

export default EmptyState;
