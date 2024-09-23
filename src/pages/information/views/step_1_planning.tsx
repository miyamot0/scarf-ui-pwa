import { TutorialSection } from '@/types/TutorialSection';
import { NestedLayout } from './nested_layout';

const content: TutorialSection[] = [
  {
    heading: '1a. Identify core questions',
    subcontent: [
      'Not all aspects of SCARF are required and certain aspects of SCARF may be more relevant for certain research questions.',
      'Most SCARF projects will involve coding for the presence or absence of a set of features, e.g., size/presence of functional relation, and track one or more types of outcomes.',
      'Examples of primary/secondary outcomes include (but are not limited to) primary treatment effects, the maintenance of treatment effects over time and following intervention, and the generalization of treatment effects.',
      'Core questions should be established prior to beginning the review/coding process.',
    ],
  },
  {
    heading: '1b. Establish review team and assign study roles.',
    subcontent: [
      'The SCARF coding process includes checks for consistency by comparing findings from a primary coder with those from a reliability coder.',
      'Roles for the project should be assigned and agreed upon by the team prior to beginning the study coding process.',
      'Procedures should also be established for handling disagreements between coders (e.g., process for resolving disagreements).',
    ],
  },
  {
    heading: '1c. (Optional) Register study questions, methods, roles, etc. ',
    subcontent: [
      'If the project is a systematic review, the project may be registered with PROSPERO or other relevant databases.',
      'Registration of the project may be required or encouraged for publication in certain journals.',
    ],
  },
];

export function PlanningSection() {
  return (
    <div className="flex flex-col gap-y-4">
      <NestedLayout content={content} />
    </div>
  );
}
