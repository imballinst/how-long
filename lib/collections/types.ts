export interface Collection {
  format?: string;
  path: string;
  title: string;
  events: Array<{
    description: string;
    // This is ISO8601 string.
    datetime: string;
  }>;
}
