import format from 'date-fns/format';

export function formatLastDirectoryUpdate(isoString: string) {
  return format(new Date(isoString), 'MMMM dd, yyyy (HH:mm)');
}
