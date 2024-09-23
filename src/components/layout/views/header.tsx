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
    <NavigationMenu className="w-full justify-between max-w-full">
      <NavigationMenuList className="gap-x-4 ">
        <NavigationMenuLink
          to="/"
          unstable_viewTransition
          className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow')}
        >
          <SheetIcon size={20} />
          Data Entry
        </NavigationMenuLink>

        <NavigationMenuLink
          to={INFORMATION_LINK}
          unstable_viewTransition
          className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow')}
        >
          <ListChecksIcon size={20} />
          Instructions
        </NavigationMenuLink>

        <NavigationMenuLink
          to={RELIABILITY_LINK}
          unstable_viewTransition
          className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow')}
        >
          <UserSearchIcon size={20} />
          Reliability
        </NavigationMenuLink>

        <NavigationMenuLink
          to={ARCHIVES_LINK}
          unstable_viewTransition
          className={cn(navigationMenuTriggerStyle(), 'flex flex-row gap-x-2 border shadow')}
        >
          <DatabaseIcon size={20} />
          Archives
        </NavigationMenuLink>
      </NavigationMenuList>

      <div className="flex flex-row gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <InfoIcon size={20} />
              <span className="sr-only">Toggle theme</span>
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
                  className="text-blue-600"
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
            <Button variant="outline" size="icon">
              <Code2Icon size={20} />
              <span className="sr-only">Toggle theme</span>
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
                    <span key={license.name}>
                      {`${license.name} (${license.license})`} -
                      <Link className="text-blue-600" to={license.link} target="_blank">
                        {' '}
                        Link
                      </Link>
                    </span>
                  );
                })}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <GithubIcon size={20} />
              <span className="sr-only">Toggle theme</span>
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
                <Link className="text-blue-600" to={'https://github.com/miyamot0/scarf-ui'}>
                  https://github.com/miyamot0/scarf-ui
                </Link>{' '}
                under the permissive MIT license.
              </span>
            </div>
          </DialogContent>
        </Dialog>

        <ThemeToggle />
      </div>
    </NavigationMenu>
  );
};
