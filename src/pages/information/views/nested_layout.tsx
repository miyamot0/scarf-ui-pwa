import { TutorialSection } from '@/types/TutorialSection';

export const NestedLayout = ({ content }: { content: TutorialSection[] }) => {
  return content.map((section, index) => (
    <div key={index} className="flex flex-col gap-y-2">
      <h1 className="heading_level_1">{section.heading}</h1>
      {section.subcontent.map((sub, index) => (
        <p key={index}>{sub}</p>
      ))}
    </div>
  ));
};
