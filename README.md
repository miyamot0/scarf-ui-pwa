![Static Badge](https://img.shields.io/badge/Version-0.3.5-blue) ![Static Badge](https://img.shields.io/badge/License-Apache_2.0-purple) ![Static Badge](https://img.shields.io/badge/Coverage-0_Percent-orange)

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

- Version 0.3.5: Add early archiving features, Bump to React 19
- Version 0.3.4: Introduce planning panel
- Version 0.3.x: Heatmaps for individual areas of interest, Tooltips, Note taking, Fixes for table issues
- Version 0.3.0: Add in tutorial/instructions page, reliability calculation tool, and table for revealing disagreements
- Version 0.2.0: Edits for clarity and continuity, Option for generating file for the Reliability coder (Note: must have common ID's to ensure they match), Fixes for concurrency, New Toast library
- Version 0.1.2: Distinguish review (i.e., name for project) and coder status (i.e., Primary vs. Reli), Light/dark mode, support 18n
  
## Referenced Works

@hookform/resolvers (3.9.0). Copyright bluebill1049 <bluebill1049@hotmail.com> -- MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-accordion (1.2.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-alert-dialog (1.1.1). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-checkbox (1.1.1). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-context-menu (2.2.1). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-dialog (1.1.1). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-dropdown-menu (2.1.1). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-icons (1.3.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-label (2.1.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-menubar (1.1.1). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-navigation-menu (1.2.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-scroll-area (1.1.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-select (2.1.1). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-slot (1.1.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-switch (1.1.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-tabs (1.1.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-toggle (1.1.0). MIT Licensed: [Repo](n/a) 
 
@radix-ui/react-tooltip (1.1.2). MIT Licensed: [Repo](n/a) 
 
@tanstack/react-table (8.20.5). Copyright Tanner Linsley -- MIT Licensed: [Repo](n/a) 
 
class-variance-authority (0.7.0). Copyright Joe Bell (https://joebell.co.uk) -- Apache-2.0 Licensed: [Repo](n/a) 
 
clsx (2.1.1). Copyright Luke Edwards luke.edwards05@gmail.com https://lukeed.com -- MIT Licensed: [Repo](n/a) 
 
embla-carousel-react (8.3.0). Copyright David Jerleke -- MIT Licensed: [Repo](n/a) 
 
is-hotkey (0.2.0). MIT Licensed: [Repo](n/a) 
 
lucide-react (0.445.0). Copyright Eric Fennis -- ISC Licensed: [Repo](n/a) 
 
next-themes (0.3.0). MIT Licensed: [Repo](n/a) 
 
react (18.3.1). MIT Licensed: [Repo](n/a) 
 
react-dom (18.3.1). MIT Licensed: [Repo](n/a) 
 
react-hook-form (7.53.0). Copyright <bluebill1049@hotmail.com> -- MIT Licensed: [Repo](n/a) 
 
react-router-dom (6.26.2). Copyright Remix Software <hello@remix.run> -- MIT Licensed: [Repo](n/a) 
 
react-spreadsheet (0.9.5). Copyright Iddan Aaronsohn <mail@aniddan.com> (https://aniddan.com) -- MIT Licensed: [Repo](n/a) 
 
react-use-pwa-install (1.0.1). Copyright Filip Chalupa chalupa.filip@gmail.com https://www.npmjs.com/~onset -- ISC Licensed: [Repo](n/a) 
 
recharts (2.12.7). Copyright recharts group -- MIT Licensed: [Repo](n/a) 
 
scheduler (0.23.2). MIT Licensed: [Repo](n/a) 
 
slate (0.103.0). MIT Licensed: [Repo](n/a) 
 
slate-history (0.109.0). MIT Licensed: [Repo](n/a) 
 
slate-react (0.110.1). MIT Licensed: [Repo](n/a) 
 
sonner (1.5.0). Copyright Emil Kowalski <e@emilkowal.ski> -- MIT Licensed: [Repo](n/a) 
 
tailwind-merge (2.5.2). Copyright Dany Castillo -- MIT Licensed: [Repo](n/a) 
 
tailwindcss-animate (1.0.7). Copyright Jamie Kyle <me@thejameskyle.com> -- MIT Licensed: [Repo](n/a) 
 
uuid (10.0.0). MIT Licensed: [Repo](n/a) 
 
vite-plugin-mdx (3.6.0). MIT Licensed: [Repo](n/a) 
 
vite-plugin-mdx-plus (1.1.1). Copyright Codpoe <codpoe.me@gmail.com> -- MIT Licensed: [Repo](n/a) 
 
zod (3.23.8). Copyright Colin McDonnell <colin@colinhacks.com> -- MIT Licensed: [Repo](n/a) 

## License

Apache 2.0 - Shawn Gilroy, Louisiana State University

## Version

Version 0.3.5

