import { StudyObject } from '@/questions/types/QuestionTypes';
import { Badge } from '@/components/ui/badge';

export function StatusCell({ Study }: { Study: StudyObject }) {
  const values = [
    Study.Reporting.Status,
    Study.InternalValidity.Status,
    Study.ExternalValidity.Status,
    Study.Outcomes.Status,
  ];

  if (
    values.every((v) => v === 'Completed') &&
    Study.PublicationType !== 'Unclassified' &&
    Study.StudyTag.trim() !== '' &&
    Study.StudyAuthors.trim() !== '' &&
    Study.StudyTitle.trim() !== '' &&
    Study.StudyJournal.trim() !== '' &&
    Study.StudyYear !== -1
  ) {
    return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
  }

  if (
    values.includes('Completed') ||
    Study.StudyTag.trim() !== '' ||
    Study.StudyAuthors.trim() !== '' ||
    Study.StudyTitle.trim() !== '' ||
    Study.StudyJournal.trim() !== '' ||
    Study.StudyYear !== -1
  ) {
    // Note: at leat one of the values is completed
    return <Badge className="bg-orange-500 hover:bg-orange-600">In Progress</Badge>;
  }

  return <Badge className="bg-red-500 hover:bg-red-600">Not Started</Badge>;
}
