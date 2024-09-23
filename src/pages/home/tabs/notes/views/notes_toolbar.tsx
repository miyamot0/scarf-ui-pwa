import { cn } from '@/lib/utils';
import { LegacyRef, PropsWithChildren, forwardRef } from 'react';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
const NotesMenu = forwardRef(
  // @ts-ignore
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: LegacyRef<HTMLDivElement>) => (
    <div
      {...props}
      data-test-id="menu"
      // @ts-ignore
      ref={ref}
      className={cn(className, '[&>*]:display:inline-block [&>*+*]:margin-left:15px')}
    />
  )
);

NotesMenu.displayName = 'NotesMenu';

export const MenuToolbar = forwardRef(
  // @ts-ignore
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: LegacyRef<HTMLDivElement>) => (
    <NotesMenu
      {...props}
      ref={ref}
      className={cn(className, 'border-b-2 border-gray-200 py-2 relative mb-[20px] flex flex-row -mt-[20px] gap-x-2')}
    />
  )
);

MenuToolbar.displayName = 'MenuToolbar';
