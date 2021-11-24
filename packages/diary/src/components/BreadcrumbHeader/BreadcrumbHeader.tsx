import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

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
    <Breadcrumb spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
      {props.pages.map((page, idx) => (
        <BreadcrumbItem key={page.href} isCurrentPage={idx + 1 === length}>
          <BreadcrumbLink href={page.href}>{page.title}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
