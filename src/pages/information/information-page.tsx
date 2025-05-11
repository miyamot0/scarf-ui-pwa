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
      title: 'Video Tutorial for SCARF-UI',
      description: 'Links and resources for further learning',
    },
    value: '',
  },
];

export function InformationPage() {
  const [currentEntry, setCurrentEntry] = useState(ExpandedDocumentationObjects[0]);
  const [showButton, setShowButton] = useState(false);

  const prevEntry = ExpandedDocumentationObjects.find((doc) => doc.matter.index === currentEntry.matter.index - 1);
  const nextEntry = ExpandedDocumentationObjects.find((doc) => doc.matter.index === currentEntry.matter.index + 1);

  const updateButtonUI = (display: boolean) => {
    window.scrollTo(0, 0);
    setShowButton(display);
  };

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
              {ExpandedDocumentationObjects.map((doc, index) => (
                <Button
                  variant={'ghost'}
                  className={cn('text-left items-start justify-start', {
                    'underline bg-accent border': currentEntry.matter.index === doc.matter.index,
                  })}
                  key={doc.matter.index}
                  onClick={() => {
                    updateButtonUI(false);
                    setCurrentEntry(doc);
                  }}
                >
                  {`${index + 1}. `}
                  {doc.matter.title}
                </Button>
              ))}
            </div>
            <div className="prose dark:prose-invert !max-w-none grow">
              {currentEntry.matter.index === DocumentationObjects.length ? (
                <YouTubeElement callback={updateButtonUI} />
              ) : (
                <MdViewer source={currentEntry.value} callback={updateButtonUI} />
              )}

              {showButton && (
                <div className="flex flex-row justify-between pt-4">
                  <Button
                    onClick={() => {
                      updateButtonUI(false);
                      setCurrentEntry(prevEntry ?? currentEntry);
                    }}
                  >
                    Read Previous
                  </Button>
                  <Button
                    onClick={() => {
                      updateButtonUI(false);
                      setCurrentEntry(nextEntry ?? currentEntry);
                    }}
                  >
                    Read Next
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
