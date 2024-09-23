import { TutorialSection } from '@/types/TutorialSection';
import { NestedLayout } from './nested_layout';

const content: TutorialSection[] = [
  {
    heading: '3a. Results are visulized in the "Results" tab of the SCARF-UI app',
    subcontent: [
      'The SCARF-UI app provides an interactive means of visualizing the results of the review. The visual summary of the data in the loaded data set is visualized across three different types of contrasts. Depending on the types of questions relevant to the review, some of these figures may not be populated because the relevant data is not present in the data set.',
      'Various options exist for augmenting the figures provided in the app. For example, the user can change the color scheme, jitter the data points, and adjust the size of the data points. The jittering of data points will likely be necessary when many studies are entered and the risk of overplotting (i.e., drawing data over other data) becomes significant.',
    ],
  },
  {
    heading: '3b. Figure 1: Demonstrations of Functional Relations and Study Rigor',
    subcontent: [
      'The first figure summarizes two dimensions relevant to SCED research: The size/direction of study effects and the quantity of indicators reflective of rigorous design. ',
      'This figure is often useful to assess whether variability in the size/direction of intervention effects appears influenced by how strongly the studies have been designed. A high degree of variability in both outcomes and study rigor may suggest that the available literature is not yet mature enough to draw strong conclusions.',
    ],
  },
  {
    heading: '3c. Figure 2: Maintenance/Durability of Outcomes and Size of Programmed Follow-up Window',
    subcontent: [
      'This figure illustrates information related to the maintenance of primary study outcomes and plots the size/direction of maintained outcomes against the size of the follow-up window. Generally, it is expected to have maintenance effects consistent with effects while in treatment when the latency between intervention and follow-up is brief. Variability in this figure may suggest that intervention effects are not particularly durable and/or the literature may not be established enough to make such determinations.',
    ],
  },
  {
    heading: '3d. Figure 3: Generalization/Generality of Outcomes and Rigor/Depth of Generalization Explored',
    subcontent: [
      'The final figure depicts the degree of generalization observed in respective studies against the rigor/breadth of generalization explorted. This figure is useful for assessing the degree to which the literature has explored the generalization of effects and the rigor with which generalization has been explored. A high degree of variability in this figure may suggest that the certain approaches may not produce outcomes that have consistently good generality. Alternatively, this figure may also reveal whether the available literature is sufficient to make strong claims regarding generalization.',
    ],
  },
];

export function EvaluationSection() {
  return (
    <div className="flex flex-col gap-y-4">
      <NestedLayout content={content} />
    </div>
  );
}
