export interface Page {
  href: string;
  title: string;
}

// Static paths.
const HOME_BREADCRUMB: Page = { title: 'How Long', href: '/' };
const CATEGORIES_BREADCRUMB: Page = {
  title: 'Categories',
  href: '/categories'
};
const SINCE_BREADCRUMB: Page = {
  title: 'Since',
  href: '/since'
};
const UNTIL_BREADCRUMB: Page = {
  title: 'Until',
  href: '/until'
};

export const HOME_BREADCRUMBS: Page[] = [HOME_BREADCRUMB];
export const HOME_SINCE_BREADCRUMBS: Page[] = [
  HOME_BREADCRUMB,
  SINCE_BREADCRUMB
];
export const HOME_UNTIL_BREADCRUMBS: Page[] = [
  HOME_BREADCRUMB,
  UNTIL_BREADCRUMB
];
export const HOME_CATEGORIES_BREADCRUMBS: Page[] = [CATEGORIES_BREADCRUMB];

export function appendBreadcrumbs(pages: Page[], added: Page | Page[]) {
  const newPages = [...pages];
  const maxIdx = newPages.length - 1;

  if (Array.isArray(added)) {
    for (let i = 0; i < added.length; i++) {
      const reference = newPages[maxIdx + i];

      newPages.push({
        title: added[i].title,
        href: `${reference.href}${added[i].href}`
      });
    }
  } else {
    newPages.push({
      title: added.title,
      href: `${newPages[maxIdx].href}${added.href}`
    });
  }

  return newPages;
}
