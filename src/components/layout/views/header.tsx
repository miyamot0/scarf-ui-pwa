import { Code2Icon, DatabaseIcon, GithubIcon, InfoIcon, ListChecksIcon, SheetIcon, UserSearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { simplified_licenses } from '@/assets/simplified_licenses';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const INFORMATION_LINK = '/information';
export const RELIABILITY_LINK = '/reliability';
export const ARCHIVES_LINK = '/archives';

export const Header = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
      <NavigationMenu className="w-full justify-between max-w-full">
        <NavigationMenuList className="gap-x-2 ">
          <NavigationMenuLink
            to="/"
            unstable_viewTransition
            className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow-md bg-white dark:bg-card')}
          >
            <SheetIcon size={20} />
            <span className="hidden md:flex">Data Entry</span>
          </NavigationMenuLink>

          <NavigationMenuLink
            to={INFORMATION_LINK}
            unstable_viewTransition
            className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow-md bg-white dark:bg-card')}
          >
            <ListChecksIcon size={20} />
            <span className="hidden md:flex">Instructions</span>
          </NavigationMenuLink>

          <NavigationMenuLink
            to={RELIABILITY_LINK}
            unstable_viewTransition
            className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow-md bg-white dark:bg-card')}
          >
            <UserSearchIcon size={20} />
            <span className="hidden md:flex">Reliability</span>
          </NavigationMenuLink>

          <NavigationMenuLink
            to={ARCHIVES_LINK}
            unstable_viewTransition
            className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow-md bg-white dark:bg-card')}
          >
            <DatabaseIcon size={20} />
            <span className="hidden md:flex">Archives</span>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex flex-row gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-md">
              <InfoIcon size={20} />
              <span className="sr-only">SCARF App Information</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>SCARF-UI Web-app Information</DialogTitle>
              <DialogDescription>Information regarding the SCARF and SCARF-UI tools</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-4">
              <span>
                The SCARF-UI web-app is an extension of the original SCARF tool used to appraise single-case
                experimental designs (SCEDs) for published and published works.
              </span>
              <span>
                Information on the original SCARF tool and its design and purpose is available at{' '}
                <Link
                  unstable_viewTransition
                  className="text-blue-400 underline"
                  to={'https://ebip.vkcsites.org/scarfv2/'}
                  target="_blank"
                >
                  https://ebip.vkcsites.org/scarfv2/
                </Link>
                , the personal website of Dr. Jennifer Ledford.
              </span>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-md">
              <Code2Icon size={20} />
              <span className="sr-only">Application Licenses</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Open Source Licenses</DialogTitle>
              <DialogDescription>The SCARF-UI web-app incorporates the following tools</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-4">
              {simplified_licenses
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((license) => {
                  return (
                    <div key={license.name} className="flex flex-row justify-between">
                      <span>{`${license.name} (${license.license}) - `}</span>

                      <Link className="text-blue-400 underline" to={license.link} target="_blank">
                        Repository
                      </Link>
                    </div>
                  );
                })}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-md">
              <GithubIcon size={20} />
              <span className="sr-only">SCARF Source Code</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Source Code</DialogTitle>
              <DialogDescription>Access the source code for the SCARF-UI tool</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-4">
              <span>
                The source code necessary to inspect, build, or otherwise extend the SCARF-UI web app is provided
                publicly at{' '}
                <Link
                  className="text-blue-400 underline"
                  to={'https://github.com/miyamot0/scarf-ui-pwa'}
                  target="_blank"
                >
                  https://github.com/miyamot0/scarf-ui-pwa
                </Link>{' '}
                under the permissive MIT license.
              </span>
            </div>
          </DialogContent>
        </Dialog>

        <ThemeToggle />
      </div>
    </div>
  );
};
