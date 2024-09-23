import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  CalculateOutcomeScore,
  GenerateGeneralizationRating,
  GenerateMaintenanceWindow,
  GenerateStrengthRating,
  applyConditionalJittering,
} from './helpers/scarf_scoring';
import { VisualFunctionalRelationGivenIV } from './figures/fx_rel_given_iv_strength';
import { MaintenanceGivenWindow } from './figures/maintenance_given_window';
import { GeneralizationGivenWindow } from './figures/generalization_given_window';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SymbolType } from 'recharts/types/util/types';
import { FigureHeights, MarkerSizes } from './aesthetics/figure_aesthetics';
import { CommonVisualOutput } from '@/types/CommonVisualOutput';
import { HeatmapIV } from './views/heatmap_iv';
import { HeatmapDV } from './views/heatmap_dv';
import { HeatmapReporting } from './views/heatmap_reporting';
import { GlobalStateType } from '@/questions/types/GlobalStateType';

// TODO: complete hack to suppress error
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export function VisualsView({ context }: { context: GlobalStateType }) {
  const [jitter, setJitter] = React.useState(true);
  const [shape, setShape] = React.useState<SymbolType>('circle');
  const [size, setSize] = React.useState<number>(MarkerSizes[0].value);
  const [height, setHeight] = React.useState<number>(FigureHeights[0].value);

  const memoizedData = React.useMemo(() => context.Studies ?? [], [context.Studies]);

  const recordsToVisualize = memoizedData.map((study) => {
    const score_internal_validity = CalculateOutcomeScore('Internal Validity', study);

    const score_external_validity = CalculateOutcomeScore('External Validity', study);

    const score_reporting = CalculateOutcomeScore('Reporting', study);

    const score_outcomes_value = GenerateStrengthRating('Functional Relations', study);
    const score_maintained_value = GenerateStrengthRating('Maintenance', study);
    const score_generalized_value = GenerateStrengthRating('Generalization', study);

    return {
      Tag: study.StudyTag,
      ID: study.StudyID,
      IV: applyConditionalJittering(jitter, score_internal_validity),
      EV: applyConditionalJittering(jitter, score_external_validity),
      Reporting: applyConditionalJittering(jitter, score_reporting),
      Outcome: applyConditionalJittering(jitter, score_outcomes_value),
      Maintained: applyConditionalJittering(jitter, score_maintained_value),
      MaintenanceWindow: applyConditionalJittering(jitter, GenerateMaintenanceWindow(study)),
      Generalized: applyConditionalJittering(jitter, score_generalized_value),
      GeneralizationRigor: applyConditionalJittering(jitter, GenerateGeneralizationRating(study)),
      RatingOutcome: study.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_4')?.Response ?? '',
      RatingMaintenance: study.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_5')?.Response ?? '',
      DegreeMaintenance: study.ExternalValidity.Questions.find((q) => q.QuestionID === 'Maintenance_3')?.Response ?? '',
      RatingGeneralization: study.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_6')?.Response ?? '',
      DegreeGeneralization:
        study.ExternalValidity.Questions.find((q) => q.QuestionID === 'Generality_Boundedness_7')?.Response ?? '',
      Type: study.PublicationType,
      Authors: study.StudyAuthors,
    } satisfies CommonVisualOutput;
  });

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0 my-auto">
            <Label className="md:ml-4">Marker Type: </Label>
            <Select value={shape} onValueChange={(value) => setShape(value as SymbolType)}>
              <SelectTrigger className="w-[125px]">
                <SelectValue placeholder="Select marker type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Shapes</SelectLabel>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                  <SelectItem value="cross">Cross</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                  <SelectItem value="star">Star</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label className="md:ml-4">Marker Size: </Label>
            <Select value={size.toString()} onValueChange={(value) => setSize(parseInt(value))}>
              <SelectTrigger className="w-[125px]">
                <SelectValue placeholder="Select marker size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  {MarkerSizes.map((size) => {
                    return (
                      <SelectItem key={size.value.toString()} value={size.value.toString()}>
                        {size.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label className="md:ml-4">Figure Height: </Label>
            <Select value={height.toString()} onValueChange={(value) => setHeight(parseInt(value))}>
              <SelectTrigger className="w-[125px]">
                <SelectValue placeholder="Select height size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Heights</SelectLabel>
                  {FigureHeights.map((size) => {
                    return (
                      <SelectItem key={size.value.toString()} value={size.value.toString()}>
                        {size.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex md:items-center space-x-2">
            <Label htmlFor="jitter-mode">Jitter Data</Label>
            <Switch id="jitter-mode" checked={jitter} onCheckedChange={() => setJitter(!jitter)} />
          </div>
        </div>

        <VisualFunctionalRelationGivenIV Data={recordsToVisualize} shape={shape} size={size} height={height} />

        <MaintenanceGivenWindow Data={recordsToVisualize} shape={shape} size={size} height={height} />

        <GeneralizationGivenWindow Data={recordsToVisualize} shape={shape} size={size} height={height} />
      </div>

      <HeatmapIV {...context} />

      <HeatmapDV {...context} />

      <HeatmapReporting {...context} />
    </div>
  );
}
