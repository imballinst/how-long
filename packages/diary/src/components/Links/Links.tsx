import { AnchorHTMLAttributes, ReactNode } from 'react';

export interface LinkProps {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
}

const ADDITIONAL_EXTERNAL_PROPS = { target: '_blank', rel: 'noopener' };

export function Link({ href, children, isExternal }: LinkProps) {
  const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    href,
    className: 'text-teal-500 hover:text-teal-200 underline'
  };
  let additionalChildren: ReactNode | undefined;

  if (isExternal) {
    anchorProps.target = ADDITIONAL_EXTERNAL_PROPS.target;
    anchorProps.rel = ADDITIONAL_EXTERNAL_PROPS.rel;

    additionalChildren = (
      <svg viewBox="0 0 24 24" className="ml-4" focusable="false">
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <path d="M15 3h6v6"></path>
          <path d="M10 14L21 3"></path>
        </g>
      </svg>
    );
  }

  return (
    <a {...anchorProps}>
      {children} {additionalChildren}
    </a>
  );
}
