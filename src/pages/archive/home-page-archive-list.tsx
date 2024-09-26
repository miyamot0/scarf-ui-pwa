import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';

import PageWrapper from '@/components/layout/page-wrapper';
import { ARCHIVES_LINK } from '@/components/layout/views/header';

import archive_list from '@/assets/archives.json';

export default function HomePageArchiveListing() {
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
                {archive_list.map((data_record) => (
                  <TableRow key={data_record.ID}>
                    <TableCell>{data_record.Author}</TableCell>
                    <TableCell>{data_record.Title}</TableCell>
                    <TableCell>{data_record.DateSaved}</TableCell>
                    <TableCell>
                      <Link unstable_viewTransition to={`${ARCHIVES_LINK}/${data_record.ID}`}>
                        View
                      </Link>
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
