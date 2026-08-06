interface TableOfContentsProps {
  toc: Array<{ id: string; text: string; level: number }>;
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  if (!toc.length) return null;

  return (
    <div className="space-y-4">
      <details className="lg:hidden rounded-3xl border border-border bg-card/95 p-4 shadow-sm">
        <summary className="cursor-pointer font-semibold text-foreground">Contents</summary>
        <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block rounded-xl px-2 py-2 hover:bg-primary/10 hover:text-primary transition-smooth ${
                item.level === 2 ? "pl-0 font-semibold" : "pl-4"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </details>

      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-3xl border border-border bg-card/95 p-6 shadow-sm">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">On this page</h3>
          <nav className="space-y-2 text-sm text-muted-foreground">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block rounded-xl px-2 py-2 hover:bg-primary/10 hover:text-primary transition-smooth ${
                  item.level === 2 ? "font-semibold" : "pl-4"
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default TableOfContents;
