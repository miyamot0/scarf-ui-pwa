import { StudyObject } from '@/questions/types/QuestionTypes';
import { CopyIcon, Edit, FileWarning } from 'lucide-react';
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
        <span className="w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
        {text}
      </>
    );
  }

  return (
    <>
      <span className="w-4 h-4 mr-2 bg-gray-500 rounded-full"></span>
      {text}
    </>
  );
};

export function ActionCell({ Study }: { Study: StudyObject }) {
  const { dispatch, context } = useContext(AppStateContext);

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
        <DropdownMenuLabel className="flex flex-row gap-2 items-center">
          <Edit className="w-4 h-4" /> Edit Record
        </DropdownMenuLabel>
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
          <CopyIcon className="w-4 h-4 mr-2" />
          Duplicate Record
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            const confirm = window.confirm(
              'Do you understand the consequences of overriding the ID and wish to continue?'
            );

            if (!confirm) return;

            const prompt = window.prompt('Please enter the new Study ID:', Study.StudyID);

            if (!prompt || prompt.length < 4) {
              toast.warning('Error: Cannot update ID', {
                description: 'The ID provided must be a unique string of at least 4 characters.',
                duration: 5000,
                dismissible: true,
              });

              return;
            }

            const is_already_present = context.Studies.find((item) => item.StudyID === prompt);

            if (is_already_present) {
              toast.warning('Error: Cannot update ID', {
                description: 'The ID provided is already in use and must be unique.',
                duration: 5000,
                dismissible: true,
              });

              return;
            }

            const new_study = { ...Study, StudyID: prompt } satisfies StudyObject;

            dispatch({
              type: 'overwrite_study_id',
              payload: { study_id: Study.StudyID, updatedData: new_study },
            });

            toast('Study ID has been renamed', {
              description: 'See the main table to confirm changes.',
              duration: 2000,
              dismissible: true,
            });
          }}
        >
          <FileWarning className="w-4 h-4 mr-2" />
          Override ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
