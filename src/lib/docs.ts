const all_md_files = import.meta.glob('/content/*.md', { query: '?raw', eager: true, import: 'default' });

export type DocumentObjectMatter = {
  index: number;
  title: string;
  description: string;
};

export const DocumentationObjects = Object.entries(all_md_files)
  .map(([, value]) => {
    const content = (value as string).split('---');

    const matter = {} as DocumentObjectMatter;
    const entries = content[1].split('\n').filter((str: string) => str.trim() !== '');

    entries.forEach((entry) => {
      const [key, value] = entry.split(':');

      const trimmedKey = key.trim();
      const keyCast = trimmedKey as keyof DocumentObjectMatter;

      // @ts-expect-error - We know the structure of the matter object
      matter[keyCast] = value.trim().replaceAll("'", '');
    });

    matter.index = parseInt(matter.index as unknown as string);

    return {
      matter,
      value: content[2],
    };
  })
  .sort((a, b) => a.matter.index - b.matter.index);
