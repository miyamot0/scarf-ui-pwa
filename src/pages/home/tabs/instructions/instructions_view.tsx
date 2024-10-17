import { HeadingComponent } from './views/heading_component';
import { SpecificActionsSection } from './sections/specific_actions';
import { ProgressReviewSection } from './sections/progress_review';
import { PeerReviewDataSection } from './sections/peer_inspection_review';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function InstructionsView() {
  const [loaded, isLoaded] = useState(false);

  useEffect(() => {
    isLoaded(true);
  }, []);

  return (
    <div
      className={cn('flex flex-col gap-y-4 transition-opacity', {
        'opacity-100': loaded,
        'opacity-0': !loaded,
      })}
    >
      <HeadingComponent Text="General Instructions" />

      <p>
        The purpose of this tab is for researchers to identify the purpose of their review, and to establish criteria
        for their review that allows them to take their specific contexts into consideration. For example, a researcher
        assessing interventions for severe challenging behavior might find fewer data points per condition adequate, due
        to ethical or safety reasons, while a researcher assessing interventions fo academic skills might require at
        least five data points per condition.
      </p>

      <hr />

      <SpecificActionsSection />

      <hr />

      <ProgressReviewSection />

      <hr />

      <PeerReviewDataSection />
    </div>
  );
}
