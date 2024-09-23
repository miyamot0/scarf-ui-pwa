![Static Badge](https://img.shields.io/badge/Version-{{VERSION_NUMBER}}-blue) ![Static Badge](https://img.shields.io/badge/License-Apache_2.0-purple) ![Static Badge](https://img.shields.io/badge/Coverage-{{PERCENTAGE}}-{{PERCENTAGE_COLOR}})

# SCARF-UI

SCARF-UI is a simple, web-based widget to support the critical appraisals of studies conducted using single-case experimental designs (SCEDs) and visual analysis. The design and functionality of the tool models that of the SCARF toolkit produced by Dr. Jennifer Ledford and colleages, which is available [here](https://ebip.vkcsites.org/scarfv2/).

## SCARF-UI Visual Outputs

A variety of different visuals are provided to inspect the durability, consistency, and overall correspondence of observed functional relations with other features of study design (e.g., period of maintenance, rigor of generalization).

![Visualize Functional Relations given Rigor](public/img/SCARF_Functional_Relation_Given_IV.svg)

The figure above illustrates how SCED outcomes can be viewed in conjunction with the overall level of study rigor. Specifically, it is anticipated that findings _should_ be less variability in the presence of more rigorous evaluation and more variable in the presence of less rigorous evaluation.

![Visualize Maintenance given Delay](public/img/SCARF_Maintenance_Given_Rigor.svg)

The visual provided above illustrates a hypothetical arrangement of maintained outcomes given the amount of time since the cessation of intervention. It is generally expected that outcomes _should_ be more substantial immediately following intervention and that less lasting gains will naturally decay as the time since intervention grows.

![Visualize Generalization given Rigor](public/img/SCARF_Generalization_Given_Duration.svg)

The final figure provided illustrates the degree to which outcomes generalize to other features (i.e., ecological conditions). It is generally expected that more rigorous and controlled evaluations of generalization are more tempered in terms of improvements and that less rigorous/ambitious evaluations will be associated with _larger_ improvements and and more rigorous/ambitious evaluations will be associated with more tempered changes in behavior.

## Using/Accessing the SCARF-UI Tool

The tool provided here is hosted freely at [https://scarfui.smallnstats.com/](https://scarfui.smallnstats.com) and is available for use. However, the tool is presently **under evaluation**.

The tool does not save any information remotely and all information stays on the local machine of the user. However, users have the option to import/export their data and disseminate those data as they wish (e.g., for reliability checks, archiving).

Interested users are free to download the necessary source code (i.e., clone repo) and build the software on their own if they wish to do so or extend current functionality.

## Differences between SCARF-UI and Original SCARF

The tool is essentially a shot-for-shot re-imagining of the original SCARF tool, originally designed as a spreadsheet template, in a web-based design that supports more robust interfaces and visuals.

Information about how to access the tool is provided in the tool itself and users are encouraged to interact with the app directly for guidance.

## Contributing to SCARF-UI

At present, users are free to submit issues and suggest changes.

Pull requests will be occasionally reviewed, but are rarely to be considered unless they significantly extend the original base functionality.

Interested parties are encouraged to reach out the Drs. Gilroy and Ledford for opportunities to support/contribute to the SCARF project.

## Changelog

### Version 0.3.5

- Expanded tooltips
- Added in early archiving features
- Bump to React 19

### Version 0.3.4

- Revert VDOM speedups
- Add in planning panel

### Version 0.3.x

- Tests (mostly)
- VDOM speedup
- Move to cookie storage for theming (hydration headaches)
- Heatmaps for individual areas of interest
- Tooltips for ease of coder reference
- Note taking
- Visual edits for clarity
- Fixes for table issues

### Version 0.3.0

- Add in tutorial/instructions page
- Add in reliability calculation tool
- Add in table for revealing disagreements

### Version 0.2.0

- Edits for clarity and continuity
- Option for generating file for the Reliability coder (Note: must have common ID's to ensure they match)
- Fixes for concurrency
- New Toast library

### Version 0.1.2

- Distinguish review (i.e., name for project) and coder status (i.e., Primary vs. Reli)
- Fix backgrounds for vector images to be white by default
- Light/dark mode
- Support for later 18n via question imports
  
## Referenced Works

{{LICENSES}}

## License

Apache 2.0 - Shawn Gilroy, Louisiana State University

## Version

{{VERSION}}
