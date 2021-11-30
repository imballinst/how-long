import { Fragment } from 'react';
import { Link } from '../Links';
import { Page } from '../../helpers/paths';

export interface BreadcrumbHeaderProps {
  pages: Page[];
}

export function BreadcrumbHeader(props: BreadcrumbHeaderProps) {
  const length = props.pages.length;

  return (
    <nav aria-label="Breadcrumb">
      <ul className="list-style-none flex flex-row items-center">
        {props.pages.map((page, idx) => (
          <Fragment key={page.href}>
            <Link href={page.href}>{page.title}</Link>

            {idx + 1 < length && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-500" />
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
}

// Taken from https://chakra-ui.com/docs/media-and-icons/icon.
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      className={className}
      aria-hidden={true}
    >
      <path
        fill="currentColor"
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      ></path>
    </svg>
  );
}
