import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface BreadcrumbHeaderProps {
  pages: Array<{
    href: string;
    title: string;
  }>;
}

export function BreadcrumbHeader(props: BreadcrumbHeaderProps) {
  const length = props.pages.length;

  return (
    <Breadcrumb spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
      {props.pages.map((page, idx) => (
        <BreadcrumbItem isCurrentPage={idx + 1 === length}>
          <BreadcrumbLink href={page.href}>{page.title}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
