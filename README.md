![Static Badge](https://img.shields.io/badge/Version-0.3.8-blue) ![Static Badge](https://img.shields.io/badge/License-Apache_2.0-purple) ![Static Badge](https://img.shields.io/badge/Coverage-0_Percent-orange)

# SCARF-UI (PWA)

SCARF-UI is an installable, offline-first PWA designed to assist in critical appraisals of studies featuring single-case experimental designs (SCEDs). The design and functionality of the tool models that of the SCARF toolkit produced by Dr. Jennifer Ledford and colleages, which is available [here](https://ebip.vkcsites.org/scarfv2/). In short, the PWA provided provides a means of summarizing SCED outcomes without the need for unnecessarily complex spreadsheet and macros.

## SCARF-UI Visual Outputs

A variety of different visuals are provided to inspect the durability, consistency, and overall correspondence of observed functional relations with other features of study design (e.g., period of maintenance, rigor of generalization). The three types of figures are kept consistent with prior revisions and features illustrated in the original SCARF.

![Visualize Functional Relations given Rigor](public/img/SCARF_Functional_Relation_Given_IV.svg)

The figure above illustrates how SCED outcomes can be viewed in conjunction with the overall level of study rigor. Specifically, it is anticipated that findings _should_ be less variability in the presence of more rigorous evaluation and more variable in the presence of less rigorous evaluation.

![Visualize Maintenance given Delay](public/img/SCARF_Maintenance_Given_Rigor.svg)

The visual provided above illustrates a hypothetical arrangement of maintained outcomes given the amount of time since the cessation of intervention. It is generally expected that outcomes _should_ be more substantial immediately following intervention and that less lasting gains will naturally decay as the time since intervention grows.

![Visualize Generalization given Rigor](public/img/SCARF_Generalization_Given_Duration.svg)

The final figure provided illustrates the degree to which outcomes generalize to other features (i.e., ecological conditions). It is generally expected that more rigorous and controlled evaluations of generalization are more tempered in terms of improvements and that less rigorous/ambitious evaluations will be associated with _larger_ improvements and and more rigorous/ambitious evaluations will be associated with more tempered changes in behavior.

## Using/Accessing the SCARF-UI Tool

The tool provided here is hosted freely at [https://scarfui.smallnstats.com/](https://scarfui.smallnstats.com) and is available for public use in research. However, we note that the tool is presently **under evaluation** at this time and is subject to minor changes as the instrument is refined.

The tool **does not save any information remotely** and all information stays on the local machine of the user. However, users have the option to import/export their data and disseminate those data as they wish (e.g., for reliability checks, archiving).

Interested users are free to download the necessary source code (i.e., clone repo) and build the software on their own if they wish to do so or extend current functionality.

## Differences between SCARF-UI and Original SCARF

The tool is essentially a shot-for-shot re-imagining of the original SCARF tool, originally designed as a spreadsheet template, in a web-based design that supports more robust interfaces and visuals.

Information about how to access the tool is provided in the tool itself and users are encouraged to interact with the app directly for guidance.

## Contributing to SCARF-UI

At present, users are free to submit issues and suggest changes.

Pull requests will be occasionally reviewed, but are rarely to be considered unless they significantly extend the original base functionality.

Interested parties are encouraged to reach out the Drs. Gilroy and Ledford for opportunities to support/contribute to the SCARF project.

## Changelog

- Version 0.3.7: Add in screenshots, edits based on reviews
- Version 0.3.6: PWA Vite port, add initial icon set
- Version 0.3.5: Add early archiving features, Bump to React 19
- Version 0.3.4: Introduce planning panel
- Version 0.3.x: Heatmaps for individual areas of interest, Tooltips, Note taking, Fixes for table issues
- Version 0.3.0: Add in tutorial/instructions page, reliability calculation tool, and table for revealing disagreements
- Version 0.2.0: Edits for clarity and continuity, Option for generating file for the Reliability coder (Note: must have common ID's to ensure they match), Fixes for concurrency, New Toast library
- Version 0.1.2: Distinguish review (i.e., name for project) and coder status (i.e., Primary vs. Reli), Light/dark mode, support 18n

## Referenced Works

@hookform/resolvers (3.9.0). Copyright bluebill1049 <bluebill1049@hotmail.com> -- MIT Licensed: [Repo](https://github.com/react-hook-form/resolvers.git) 
 
@mdx-js/mdx (3.0.1). Copyright John Otander <johnotander@gmail.com> (https://johno.com) -- MIT Licensed: [Repo](https://github.com/mdx-js/mdx.git) 
 
@radix-ui/react-alert-dialog (1.1.1). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-checkbox (1.1.1). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-context-menu (2.2.1). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-dialog (1.1.1). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-dropdown-menu (2.1.1). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-icons (1.3.0). MIT Licensed: [Repo](https://registry.npmjs.org/@radix-ui/react-icons/-/react-icons-1.3.0.tgz) 
 
@radix-ui/react-label (2.1.0). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-navigation-menu (1.2.0). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-scroll-area (1.1.0). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-select (2.1.1). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-slot (1.1.0). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-switch (1.1.0). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-tabs (1.1.0). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-toggle (1.1.0). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@radix-ui/react-tooltip (1.1.2). MIT Licensed: [Repo](https://github.com/radix-ui/primitives.git) 
 
@tanstack/react-table (8.20.5). Copyright Tanner Linsley -- MIT Licensed: [Repo](https://github.com/TanStack/table.git) 
 
class-variance-authority (0.7.0). Copyright Joe Bell (https://joebell.co.uk) -- Apache-2.0 Licensed: [Repo](https://github.com/joe-bell/cva.git) 
 
clsx (2.1.1). Copyright Luke Edwards luke.edwards05@gmail.com https://lukeed.com -- MIT Licensed: [Repo](https://github.com/lukeed/clsx.git) 
 
is-hotkey (0.2.0). MIT Licensed: [Repo](git://github.com/ianstormtaylor/is-hotkey.git) 
 
lucide-react (0.445.0). Copyright Eric Fennis -- ISC Licensed: [Repo](https://github.com/lucide-icons/lucide.git) 
 
react (18.3.1). MIT Licensed: [Repo](https://github.com/facebook/react.git) 
 
react-dom (18.3.1). MIT Licensed: [Repo](https://github.com/facebook/react.git) 
 
react-hook-form (7.53.0). Copyright <bluebill1049@hotmail.com> -- MIT Licensed: [Repo](https://github.com/react-hook-form/react-hook-form.git) 
 
react-router-dom (6.26.2). Copyright Remix Software <hello@remix.run> -- MIT Licensed: [Repo](https://github.com/remix-run/react-router.git) 
 
react-spreadsheet (0.9.5). Copyright Iddan Aaronsohn <mail@aniddan.com> (https://aniddan.com) -- MIT Licensed: [Repo](https://github.com/iddan/react-spreadsheet.git) 
 
react-use-pwa-install (1.0.1). Copyright Filip Chalupa chalupa.filip@gmail.com https://www.npmjs.com/~onset -- ISC Licensed: [Repo](https://github.com/FilipChalupa/react-use-pwa-install.git) 
 
recharts (2.12.7). Copyright recharts group -- MIT Licensed: [Repo](https://github.com/recharts/recharts.git) 
 
scheduler (0.23.2). MIT Licensed: [Repo](https://github.com/facebook/react.git) 
 
slate (0.103.0). MIT Licensed: [Repo](git://github.com/ianstormtaylor/slate.git) 
 
slate-history (0.109.0). MIT Licensed: [Repo](git://github.com/ianstormtaylor/slate.git) 
 
slate-react (0.110.1). MIT Licensed: [Repo](git://github.com/ianstormtaylor/slate.git) 
 
sonner (1.5.0). Copyright Emil Kowalski <e@emilkowal.ski> -- MIT Licensed: [Repo](https://github.com/emilkowalski/sonner.git) 
 
tailwind-merge (2.5.2). Copyright Dany Castillo -- MIT Licensed: [Repo](https://github.com/dcastil/tailwind-merge.git) 
 
uuid (10.0.0). MIT Licensed: [Repo](https://github.com/uuidjs/uuid.git) 
 
vite-plugin-mdx (3.6.0). MIT Licensed: [Repo](https://github.com/brillout/vite-plugin-mdx.git) 
 
vite-plugin-mdx-plus (1.1.1). Copyright Codpoe <codpoe.me@gmail.com> -- MIT Licensed: [Repo](https://github.com/Codpoe/vite-plugin-mdx-plus.git) 
 
zod (3.23.8). Copyright Colin McDonnell <colin@colinhacks.com> -- MIT Licensed: [Repo](https://github.com/colinhacks/zod.git) 

## License

Apache 2.0 - Shawn Gilroy, Louisiana State University

## Version

Version 0.3.8

