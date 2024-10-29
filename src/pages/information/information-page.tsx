import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from './views/hero';
import PageWrapper from '@/components/layout/page-wrapper';
import { DocumentationObjects } from '@/lib/docs';
import { MdViewer } from '@/components/helpers/md-viewer';
import { YouTubeElement } from '@/components/ui/youtube-element';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ExpandedDocumentationObjects = [
  ...DocumentationObjects,
  {
    matter: {
      index: DocumentationObjects.length,
      title: 'Brief Video Guide',
      description: 'Links and resources for further learning',
    },
    value: '',
  },
];

export function InformationPage() {
  const [currentEntry, setCurrentEntry] = useState(ExpandedDocumentationObjects[0]);

  return (
    <PageWrapper>
      <Hero />
      <div className="flex flex-col gap-y-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>SCARF-UI Documentation</CardTitle>
            <CardDescription>Information and Guidelines regarding use of the SCARF-UI</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col min-w-[300px] gap-4">
              {ExpandedDocumentationObjects.map((doc) => (
                <Button
                  variant={'outline'}
                  className={cn('shadow transition-shadow', {
                    'shadow-lg underline': currentEntry.matter.index === doc.matter.index,
                  })}
                  key={doc.matter.index}
                  onClick={() => setCurrentEntry(doc)}
                >
                  {doc.matter.title}
                </Button>
              ))}
            </div>
            <div className="prose dark:prose-invert !max-w-none grow">
              {currentEntry.matter.index === DocumentationObjects.length ? (
                <YouTubeElement />
              ) : (
                <MdViewer source={currentEntry.value} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
