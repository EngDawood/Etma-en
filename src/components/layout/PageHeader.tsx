import { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  rightElement?: ReactNode;
  subtitle?: ReactNode;
}

export function PageHeader({ title, rightElement, subtitle }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/80 backdrop-blur-md pt-safe pb-4 px-4 md:px-8 border-b border-gray-200/50">
      <div className="w-full max-w-7xl mx-auto pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">{title}</h1>
          {rightElement && <div>{rightElement}</div>}
        </div>
        {subtitle && <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</div>}
      </div>
    </header>
  );
}
