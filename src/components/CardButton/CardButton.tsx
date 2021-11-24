import { ReactNode } from 'react';
import { Link } from '../Links';

export interface CardButtonProps {
  icon: JSX.Element;
  children?: ReactNode;
  href: string;
}

export function CardButton({ children, icon, href }: CardButtonProps) {
  return (
    <Link href={href}>
      <div className="flex flex-col justify-center items-center cursor-pointer border rounded-lg border-gray-200 hover:border-teal-500 p-4 transition-colors">
        <div className="rounded-full border border-transparent w-8 h-8 flex flex-row justify-center items-center mb-2">
          {icon}
        </div>

        {children}
      </div>
    </Link>
  );
}
