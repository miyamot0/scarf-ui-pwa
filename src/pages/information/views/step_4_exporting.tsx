import { TutorialSection } from '@/types/TutorialSection';
import { NestedLayout } from './nested_layout';

const content: TutorialSection[] = [
  {
    heading: '4a. Exporting results for archiving and sharing with others',
    subcontent: [
      'The SCARF-UI app largely functions by using local browser storage to balance convience with data security. No data is ever shared or saved without the direct intervention from the user.',
      'The final data files can be exported to an external file (.json file) for archiving and sharing with others. If archived publicly or shared as a part of the peer-review process, the file can be reloaded into the SCARF-UI app at a later time to view and interact with the data.',
      'Generally, in the interest of transparency, it is recommended to share the data file with the publication of the review both for the primary and reliability data coder.',
    ],
  },
  {
    heading: '4b. Exporting study figures for publication and presentation',
    subcontent: [
      'Each figure in the SCARF-UI app is drawn as a vector figure to support computers/devices with various resolutions. The figures can be easily exported from the software; however, users must right click and select the type of format desired in order to download the file. By default, figures are downloaded to you "Downloads" folder with naming consistent with the figure selected.',
      'Options for figure export included .png, .jpeg, .webp, and .svg formats. As a general rule, SVG figures are lossless and provide the best balance of file size and image quality. The JPEG/PNG/WEBP options are lossy (rasterized) and vary in terms of compression and quality. There is wider support for rasterized images in peer review platforms and the WEBP option is the most modern among the options; however, SVG remains the ideal if the platform supports it.',
      'A limited number of figure features can be edited in the browser, including marker color and size. The app does not support the editing of figure labels or other features at this time. If additional editing is required, figures using the SVG format can be saved and then edited in vector graphics editor, such as Adobe Illustrator (Commercial) or Inkscape (Free/Open Source).',
    ],
  },
];

export function ExportingSection() {
  return (
    <div className="flex flex-col gap-y-4">
      <NestedLayout content={content} />
    </div>
  );
}
