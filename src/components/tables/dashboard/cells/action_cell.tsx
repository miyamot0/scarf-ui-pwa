import { StudyObject } from '@/questions/types/QuestionTypes';
import { Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AppStateContext } from '@/components/context/data-provider';

const StatusHighlight = ({ status, text }: { status: 'complete' | 'incomplete'; text: string }) => {
  if (status === 'complete') {
    return (
      <>
        <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
        {text}
      </>
    );
  }

  return (
    <>
      <span className="w-2 h-2 mr-2 bg-gray-500 rounded-full"></span>
      {text}
    </>
  );
};

export function ActionCell({ Study }: { Study: StudyObject }) {
  const { dispatch } = useContext(AppStateContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex flex-row shadow-none gap-x-2">
          <span className="sr-only">Open menu</span>
          <Edit size={18} />
          Edit
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Edit Record</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            dispatch({
              type: 'update_dialog_state',
              payload: {
                dialog_state: {
                  dialog_type: 'study_details',
                  study: Study,
                },
              },
            });
          }}
        >
          <StatusHighlight status="complete" text="Study Information" />
        </DropdownMenuItem>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <StatusHighlight
                status={Study.PublicationType === 'Unclassified' ? 'incomplete' : 'complete'}
                text="Peer Review Status"
              />
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={Study.PublicationType === 'Unclassified'}
                  onCheckedChange={() => {
                    dispatch({
                      type: 'update_study_category',
                      payload: {
                        study_id: Study.StudyID,
                        category: 'Unclassified',
                      },
                    });

                    toast('Study Data Updated.', {
                      description: 'Inspect the main table to review current progress.',
                      duration: 2000,
                      dismissible: true,
                    });
                  }}
                >
                  Unclassified
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={Study.PublicationType === 'Journal'}
                  onCheckedChange={() => {
                    dispatch({
                      type: 'update_study_category',
                      payload: {
                        study_id: Study.StudyID,
                        category: 'Journal',
                      },
                    });

                    toast('Study Data Updated.', {
                      description: 'Inspect the main table to review current progress.',
                      duration: 2000,
                      dismissible: true,
                    });
                  }}
                >
                  Published Article
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={Study.PublicationType === 'Unpublished'}
                  onCheckedChange={() => {
                    dispatch({
                      type: 'update_study_category',
                      payload: {
                        study_id: Study.StudyID,
                        category: 'Unpublished',
                      },
                    });

                    toast('Study Data Updated.', {
                      description: 'Inspect the main table to review current progress.',
                      duration: 2000,
                      dismissible: true,
                    });
                  }}
                >
                  Unpublished
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuItem
          onClick={() => {
            dispatch({
              type: 'update_dialog_state',
              payload: {
                dialog_state: {
                  dialog_type: 'study_internal_validity',
                  study: Study,
                },
              },
            });
          }}
        >
          <StatusHighlight
            status={Study.InternalValidity.Status === 'Completed' ? 'complete' : 'incomplete'}
            text="Internal Validity Details"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            dispatch({
              type: 'update_dialog_state',
              payload: {
                dialog_state: {
                  dialog_type: 'study_external_validity',
                  study: Study,
                },
              },
            });
          }}
        >
          <StatusHighlight
            status={Study.ExternalValidity.Status === 'Completed' ? 'complete' : 'incomplete'}
            text="External Validity Details"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            dispatch({
              type: 'update_dialog_state',
              payload: {
                dialog_state: {
                  dialog_type: 'study_reporting',
                  study: Study,
                },
              },
            });
          }}
        >
          <StatusHighlight
            status={Study.Reporting.Status === 'Completed' ? 'complete' : 'incomplete'}
            text="Reporting Details"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            dispatch({
              type: 'update_dialog_state',
              payload: {
                dialog_state: {
                  dialog_type: 'study_outcomes',
                  study: Study,
                },
              },
            });
          }}
        >
          <StatusHighlight
            status={Study.Outcomes.Status === 'Completed' ? 'complete' : 'incomplete'}
            text="Outcomes Details"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch({
              type: 'add_copy',
              payload: { study_id: Study.StudyID },
            });

            toast('Study Copy Appended to Dataset', {
              description: 'See the main table to begin coding.',
              duration: 2000,
              dismissible: true,
            });
          }}
        >
          Duplicate Record
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
