import { TutorialSection } from '@/types/TutorialSection';
import { NestedLayout } from './nested_layout';

const content: TutorialSection[] = [
  {
    heading: '2a. Import studies into Primary data set (Multiple Options Exist)',
    subcontent: [
      'Option 1: Line-by-line (Simple, But innefficient for larger studies). The SCARF-UI app can be used to add code studies individual using the "Add" button on the data-entry page. This is a simple way to add studies, but is not recommended for larger studies because it requires substantial effort on the front end.',
      'Option 2: Bulk study import (Requires preparation, but more efficient). The SCARF-UI app can be used to import studies in bulk using the "Import" button on the data-entry page. A dialog will present a sheet-like widget that will allow you to paste general study information from other spreadsheet software. This is generally much more efficient and can be used to insert hundreds of studies instantly.',
    ],
  },
  {
    heading: '2b. Generating Data File for Reliability Coder',
    subcontent: [
      'By default, the SCARF-UI assumes that the current user is the primary coder. It is generally most efficient to have the primary coder import all studies and then export a data file for the reliability coder. In this manner, both the primary and reliability coder can work independently and then compare results at the end of the coding process.',
      'It is required for a primary data file to be built and then have a file exported for the reliability coder for multiple reasons. First and foremost, each row in the dataset has a unique ID generated when created and working in the fashion described ensures that reliability checks are performed accurately once all studies are coded.',
    ],
  },
  {
    heading: '2c. Independent coding of studies by primary and reliability coder',
    subcontent: [
      'Study coders will code various features of each study, depending on the studies included and the questions posed.',
      'The peer review status for each study is included to distinguish published literature from unpublished "gray" literature. This is particularly important when assessing for risks of bias in the literature.',
      'Checks for reliability should be performed once each coder has completed their coding. This is done by exporting the data file and then comparing the results in the page specific to Reliability. Note: you will need to upload both the primary and reliability data files to perform this check. The reliability check will compare the results of the primary and reliability coder and provide a summary of the results. The reliability check will provide measures of agreement as well as reveal specific  discrepancies so that they can be resolved.',
    ],
  },
];

export function ExecutionSection() {
  return (
    <div className="flex flex-col gap-y-4">
      <NestedLayout content={content} />
    </div>
  );
}
