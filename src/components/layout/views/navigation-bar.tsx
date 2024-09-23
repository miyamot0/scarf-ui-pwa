import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../../ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type BreadCrumbListing = {
  label: string;
  href: string;
};

type Props = {
  breadcrumbs?: BreadCrumbListing[];
  label?: string;
};

export default function NavigationBar({ breadcrumbs, label }: Props) {
  return (
    <div className={cn('flex flex-row justify-between w-full max-w-screen-2xl py-4 items-center select-none')}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link unstable_viewTransition to={'/'} className={cn('underline')}>
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs &&
            breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link unstable_viewTransition to={breadcrumb.href} className={cn('underline')}>
                      {breadcrumb.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}

          {label && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{label}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row gap-2 items-center">

        <Link
          unstable_viewTransition
          to={'/'}
          className="flex flex-row gap-2 items-center"
        >
          <Button
            name="Settings button"
            aria-label="Settings Button"
            className="shadow-xl text-primary h-10 w-10 p-0 m-0"
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
