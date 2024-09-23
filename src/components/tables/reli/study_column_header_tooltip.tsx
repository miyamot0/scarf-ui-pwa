import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DataTableColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export function DataTableColumnTooltip({ title, description, className }: DataTableColumnHeaderProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(className)}>{title}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[300px]">{description}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
