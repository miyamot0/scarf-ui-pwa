---
title: Managing SCARF-UI Data Files
date: 11/01/2024
author: 'Shawn Gilroy'
index: 3
---

## Managing SCARF-UI Data Files

The SCARF-UI webapp is designed to support the management of data files in a way that is simple, flexible, secure, and easy to backup/archive. The webapp is designed to _be used by multiple raters_ and to support the import and export of data files.

This section provides an overview of the data files used in the SCARF-UI app and how they can be managed.

### Data Files and Reviewer Roles

The SCARF-UI app is designed to support multiple raters and to allow for reliability checks to be performed. The SCARF-UI allows study data to be managed and classified based on whether the rater is a 'Primary' or 'Reliability' rater. The _role_ for the current rater is set in the "Settings" area of the webapp.

Note: The webapp only supports one rater mode at a time (i.e., 'Primary' or 'Reliability') and it is recommended that raters code the studies independently on separate machines. You cannot easily switch between 'Primary' and 'Reliability' modes without exporting and re-importing data files and only only data file can be loaded at a single time.

Each of these roles is outlined in the sections below.

#### Lead or 'Primary' Rater

The roles and responsibilities of the 'Primary' rater are as follows:

- Populating all fields in the SCARF-UI Planning Tab
- Importing all studies into the SCARF-UI
- Exporting a data file to be scored by the 'Reliability' rater
- Running checks for reliability once both raters have completed coding
- Follow protocol regarding achieving consensus on coding discrepancies

The 'Primary' rater is the study member who will import all studies to be reviewed (i.e., entering relevant titles, journals, years, etc.) and prepare a file to be used by the 'Reliability' rater. Once all studies are coded by each rater, the 'Primary' rater will run a reliability check to ensure that the coding is consistent between raters. The 'Primary' rater will be responsible for resolving any discrepancies between the two raters.

#### Secondary or 'Reliability' Rater

The roles and responsibilities of the 'Reliability' rater are as follows:

- Loading the data file exported by the 'Primary' rater
- Completing all coding _independent_ of the 'Primary' rater
- Sharing the independently completed data file with the 'Primary' rater

### Other Notes and Considerations

It is recommended to regularly save data files and to occasionally 'export' the data stored in the app to a backup file. This is particularly important when working with multiple raters and when the data file is being shared between raters. The SCARF-UI app is designed to be used in a way that is flexible and secure, but it is important to take steps to ensure that data are not lost or corrupted.

Several settings are included to help minimize the risk of data loss. For example, the SCARF-UI webapp provides functionality that can (optionally) automatically save data as edits are incorporated. However, this data is saved to local browser storage and will be lost if the browser cache is cleared. For this reason, regular saving is recommended to ensure that data committed to the dataset are not lost.