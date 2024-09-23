import { StudyObject } from '@/questions/types/QuestionTypes';
import { Badge } from '@/components/ui/badge';

export function ArchivedCell({ Study }: { Study: StudyObject }) {
  if (Study.PublicationType === 'Journal')
    return <Badge className="bg-green-500 hover:bg-green-600">Peer-reviewed</Badge>;

  if (Study.PublicationType === 'Unpublished') {
    // Note: at leat one of the values is completed
    return <Badge className="bg-gray-500 hover:bg-gray-600">Unpublished</Badge>;
  }

  return (
    <Badge variant={'outline'} className="whitespace-nowrap">
      Unclassified
    </Badge>
  );
}
