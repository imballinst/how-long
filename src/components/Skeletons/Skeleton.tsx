// Mostly inspired from https://chakra-ui.com/docs/feedback/skeleton.
import { ReactNode } from 'react';
import styles from './Skeleton.module.css';

interface CommonSkeletonProps {
  className?: string;
  isLoaded?: boolean;
}

export function Skeleton({
  children,
  className = '',
  isLoaded
}: CommonSkeletonProps & {
  children: ReactNode;
}) {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <div className={`${styles['child-hidden']} ${className}`}>{children}</div>
  );
}

export function SkeletonText({
  className = '',
  numOfLines = 3
}: CommonSkeletonProps & {
  numOfLines?: number;
}) {
  return (
    <>
      {Array.from(new Array(numOfLines), (_, idx) => (
        <div
          key={idx}
          className={`${styles['child-hidden']} ${widthClass} ${className} h-4`}
        />
      ))}
    </>
  );
}
