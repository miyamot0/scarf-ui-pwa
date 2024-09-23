import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SavedGlobalStateType } from '@/questions/types/GlobalStateType';
import { Link, useLoaderData } from 'react-router-dom';

import archive_1 from '../../assets/archives/Bilingual Communication Training Review_Primary_2024-7-19 (4).json';
import archive_2 from '../../assets/archives/fbbcccbf-df50-40c2-b4eb-5ab171cdc69c.json';
import PageWrapper from '@/components/layout/page-wrapper';
import { ARCHIVES_LINK } from '@/components/layout/views/header';

export async function loader() {
  const archived_files = [archive_1, archive_2].sort(
    (a, b) => new Date(a.DateSaved).valueOf() - new Date(b.DateSaved).valueOf()
  );

  return archived_files;
}

export default function HomePageArchiveListing() {
  const archived_files = useLoaderData() as SavedGlobalStateType[];

  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-4 my-8">
        <h1 className="text-6xl font-semibold text-center">SCARF-UI Archives</h1>
        <p className="text-center">Public records and data sets available for viewing.</p>
      </div>

      <div className="flex flex-col gap-y-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Archived SCARF-UI Records</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archived_files?.map((data_record) => (
                  <TableRow key={data_record.ID}>
                    <TableCell>{data_record.Author}</TableCell>
                    <TableCell>{data_record.Title}</TableCell>
                    <TableCell>{data_record.DateSaved}</TableCell>
                    <TableCell>
                      <Link to={`${ARCHIVES_LINK}/${data_record.ID}`}>View</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
