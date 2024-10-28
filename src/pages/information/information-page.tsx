import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from './views/hero';
import PageWrapper from '@/components/layout/page-wrapper';
import { DocumentationObjects } from '@/lib/docs';
import { MdViewer } from '@/components/helpers/md-viewer';
import { YouTubeElement } from '@/components/ui/youtube-element';

export function InformationPage() {
  const entry = DocumentationObjects[0];

  if (!entry) throw new Error('Entry not found');

  return (
    <PageWrapper>
      <Hero />
      <div className="flex flex-col gap-y-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Planning and using SCARF-UI</CardTitle>
            <CardDescription>Guidelines and suggestions regarding the use of SCARF-UI for research</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert !max-w-none">
            <MdViewer source={entry.value} />
            <YouTubeElement />
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
