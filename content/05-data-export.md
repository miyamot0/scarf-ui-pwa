---
title: Exporting SCARF-UI Data
date: 11/01/2024
author: 'Shawn Gilroy'
index: 5
---

## Exporting and Archiving SCARF-UI Data

All data management in the SCARF-UI app is done locally in the browser and _no data ever leaves your machine_. Storing data in this manner balance flexibility/convience with data security. It also greatly simplifies compatibility with institutional guidelines related to the management of research data. However, this also means that users must take steps to ensure that data are properly archived and backed up. This section provides an overview of the options for exporting data from the SCARF-UI app and archiving the data for future reference.

### Exporting Data Files

All data in the SCARF-UI can be exported to a file at any time and for any purpose. It is recommended that users regularly export data files to occasionally back up their review data. This is particularly important when working with multiple raters and when the data file is being shared between raters. A final data file can be exported and permanently archived, and if desired, to enable others to re-loaded it into the software to view and interact with the data.

This is particularly useful for several reasons:

- Backing up data in case of data loss or corruption
- Archiving data consistent with data management plans
- Sharing data for the purposes of peer review
- Supporting checks again pre-registered protocols

### SCARF-UI Data File Format

The data exported from the SCARF-UI app is in a .json format. This format is a widely supported format that can be easily read by a variety of software applications. It is easily imported into any number of appropriate readers to inspect the data connection.

#### What is .json?

The .json format is human-readable and can be easily opened and read in a text editor. This is an _open standard_ and is widely supported across many software applications. This is important for ensuring that the data can be read and understood by others, even if they do not have access to the SCARF-UI app.

**All .json files are text files by default; however, it is generally not wise to edit these manually unless you are familiar with the structure of the data**.

#### Why .json?

The .json format is a flexible format that can be easily imported into other typesafe software to simplify research synthesis as well as analysis in other software (e.g., R Statistical Program). The use of a .json file is deliberate for several reasons.

First, the .json format is a widely supported format that can be easily read by a variety of software applications. It is easily imported into any number of appropriate readers to inspect the data conection. It can be easily imported into various statistical and programming languages, such as R, Python, and MATLAB. This makes it easy to analyze the data in a variety of ways and to integrate it with other data sources (e.g., combining results from _multiple_ reviews).

Second, the .json format is human-readable and can be easily opened and read in a text editor. This is very helpful when it comes to archiving changes over time. For example, any changes made to archived JSON files can be accomplished by back documented changes, which are timestamped, and can be tagged with relevant documentation (e.g., how and why a file was changed). This is particularly useful for tracking changes to the data over time and for ensuring that the data are consistent with the original data set (i.e., audit trails).
