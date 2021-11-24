import { Link } from '../Links';

export interface Page {
  href: string;
  title: string;
}

export interface BreadcrumbHeaderProps {
  pages: Page[];
}

export function BreadcrumbHeader(props: BreadcrumbHeaderProps) {
  const length = props.pages.length;

  return (
    <div>
      {props.pages.map((page, idx) => (
        <div key={page.href}>
          <Link href={page.href}>{page.title}</Link>
        </div>
      ))}
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    // Taken from https://chakra-ui.com/docs/media-and-icons/icon.
    <svg viewBox="0 0 24 24" focusable="false" className={className}>
      <path
        fill="currentColor"
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      ></path>
    </svg>
  );
}
