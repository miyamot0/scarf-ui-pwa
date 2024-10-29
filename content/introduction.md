---
title: Planning for the SCARF-UI
date: 09/26/2024
author: 'Shawn Gilroy'
index: 1
---

## Planning to Use the SCARF-UI

The SCARF-UI is a web-based wrapper around the core methods and procedures emphasized in the original [SCARF](https://ebip.vkcsites.org/scarfv2/). Like the original SCARF, there are recommended practices and procedures to follow prior to importing and codifying studies. A brief, general outline of the steps reflected in the web-app are described below.

### Step 1: Establishing Core Review Protocol

The SCARF-UI is both a webapp as well as a _framework_ for reviewing and summarizing outcomes from single-case experimental design studies. As such, many aspects of the webapp feature elements commonly represented in review frameworks (e.g., PRISMA).

#### Defining Central Research Questions and Scope of Review

_Not all aspects of SCARF are required_ to be completed and certain aspects of SCARF may be more relevant for certain research questions. For example, some reviews may not require coding for outcomes such as generalization. Most SCARF projects will involve coding for the presence and clarity of functional relationships, but may explore _more than one_ type of response. In a relevant example, a primary outcome may be the reduction of undesired behavior (e.g., severe and challenging behavior) and a secondary outcome could include a desired alternative response (e.g., compliance).

Both the types and definitions of responses being explored using SCARF whould be written out and operationally defined before beginning the review/coding process. _At the present, the software will prompt the user to complete this step before studies can be imported/coded_.

#### Articulating Study Roles and Defining Review Team

It is generally assumed that the review team will incorporate checks to reduce risks of drift and recorder bias. This will often take the form of assigning a core/primary rater as well as another reli/secondary rater. These roles should be established _prior to_ beginning the review and should include discussions related to risks of bias (e.g., power differences between raters). This should also include discussions of how disagreements will be resolved (e.g., discussions toward consensus, procedures for tie-breaking during discussions).

#### Preregistration of Protocol (Optional)

Details included in the protocol are generally consistent with those featured in registered review protocols. Given this similarity, it is reasonable to consider pre-registering the review in a registry before the onset of the review. Pre-registration is increasingly encouraged as an element of publication in certain journals.

### Step 2. Undertaking the Review and Operating SCARF-UI Software

There are multiple approaches to importing study records in the SCARF-UI app. The app is designed to be flexible and can be used in a variety of ways to import studies. The following steps are generally recommended for using the SCARF-UI app:

<ins>Option 1: Item-by-Item Import</ins>: The SCARF-UI app can be used to add records one-by-one using the "Add" button on the data-entry page. This is a simple way to add studies, but is not recommended for larger studies because it requires substantial effort on the front end. For smaller reviews, this may be the most efficient way to import studies.

<ins>Option 2: Bulk study import</ins>: The webapp allows researchers conducting larger review to import many studies as once using a specialized import widget. This is generally the most efficient way to import studies and is recommended for reviews with more than 10 studies. The import widget is accessed by clicking the "Import" button on the data-entry page. Additionally, this approach is the most feasible when the review contains many studies as well as studies with multiple outcomes being coded (e.g., a severe behavior outcome plus a communication response outcome). The import widget is designed to be flexible and can be used to import studies from a variety of sources, but is primarily designed to allow copy/pasting from spreadsheet software.

Additionally, the SCARF-UI will prompt raters to distinguish published literature from unpublished "gray" literature. This is important when assessing for risks of publication bias in the literature.

#### Preparing Study File for Secondary/Reliability Rater

The SCARF-UI app is designed to support multiple raters and to allow for reliability checks to be performed. The _role_ for the current rater is set in the "Settings" area of the webapp. The primary rater is the person who will import all studies, and once all relevant studies are listed and contained in the webapp, the primary rater will _output_ a data file that can be imported and populated by the reliability rater. Note: the app only supports one rating mode at a time (i.e., Primary or Reliability) and it is recommended that the reliability rater import the data file and code the studies independently on separate machines. Once both raters have completed their coding, a reliability check can be performed in the "Reliability" tab of the webapp.

#### Independent Study Ratings Completed by Primary/Reliability Raters

Using separate machines, the primary and reliability raters will code the studies independently. As a general recommendation, it is wise to 'export' and archive the blank/original data file (i.e., the file that was shared by the Primary rater) and to save frequently during the coding process. The SCARF-UI webapp can automated the saving of data as edits are incorporated; however, this is saved to local browser storage. Regular saving is recommended to ensure that data committed to the dataset are not lost.

Checks for reliability can be performed once each rater has completed their coding. These checks can be done by exporting data files from each of the raters and comparing the results in the page specific to "Reliability". On this page, the app requires the user to upload both the Primary and Reliability data files. The reliability check will compare the results of the Primary and Reliability rater and provide a summary of the results. The reliability check will provide measures of agreement as well as reveal specific discrepancies so that they can be resolved.

### Step 3. Summarizing and Interpreting Findings

The SCARF-UI webapp provides a means of visualizing the results of the review. The visual summary of the data in the loaded data set is visualized across three different types of contrasts. Each of these types of outcomes are discussed in the sections below. Depending on the types of questions covered in the review, some of these may not be populated, as the relevant data would not be present in the data set.

#### Figure Type #1: Interpreting Functional Relations as a Function of Study Rigor

The first figure summarizes two dimensions relevant to SCED research: The size/direction of functional relationships and the quantity of indicators that reflect rigorous design (e.g., procedural rigor/fidelity). This figure is often useful to assess whether variability in the size/direction of intervention effects appears influenced by how strongly the studies have been designed. A high degree of variability in both outcomes and study rigor may suggest that the available literature is not yet mature enough to draw strong conclusions.

#### Figure Type #2: Interpreting Maintained Outcomes as a Function of Follow-up Windows

This figure illustrates information related to the maintenance of primary study outcomes. It consists of plotting the size/direction of maintained outcomes against the size of the follow-up window. Generally, it is expected to have maintenance effects consistent with effects while in treatment when the latency between intervention and follow-up is brief (e.g., immediately following conclusion of the study). Variability in this figure may suggest that intervention effects are not particularly durable and/or the literature may not be established enough to draw clear inferences regarding long-term benefits.

#### Figure Type #3: Generalization of Outcomes as a Function of Contexts Explored

The final figure depicts the degree of generalization observed in respective studies against the rigor/breadth of generalization explorted. This figure is useful for assessing the degree to which the literature has explored the generalization of effects and the rigor with which generalization has been explored. A high degree of variability in this figure may suggest that the certain approaches may not produce outcomes that have consistently good generality (i.e., that outcomes do not clearly extend beyond the teaching/intervention context).

#### Supplementary Options for Figures

Various options exist for augmenting the figures provided in the app and supporting the visual analysis of data. For example, the user can change the color scheme, jitter the data points, and adjust the size of the data points. The jittering of data points will likely be necessary when many studies are entered and the risk of overplotting becomes significant (i.e., drawing data over other data).

### Step 4. Exporting Figures and Final Review Data

#### Exporting Individual-level Review Results

All data management in the SCARF-UI app is done locally in the browser (i.e., no data ever leaves your machine). Storing data in this manner balance flexibility/convience with data security. Once the authors have completed the review, the data can be exported to a file for archiving and sharing with others. The final data file (i.e., Primary rater file) can be exported to a file (i.e., a .json file) that can easily be archived, and if desired, re-loaded into the software to view and interact with the data. This is particularly useful for sharing data with other researchers, for supporting transparency in the peer-review process, and archiving the data for future reference (e.g., replicating/extending review).

The use of a .json file is deliberate for several reasons. First, the .json format is a widely supported format that can be easily read by a variety of software applications. It is easily imported into any number of appropriate readers to inspect the data conection. Second, the .json format is human-readable and can be easily opened and read in a text editor. This is important for ensuring that the data can be read and understood by others, even if they do not have access to the SCARF-UI app. Last, the .json format is a flexible format that can be easily imported into other typesafe software to simplify research synthesis as well as analysis in other software (e.g., R Statistical Program).

#### Exporting Figures for Publication and/or Presentation

Each figure in the SCARF-UI app is drawn as a vector image. This is a convenient format for supporting various devices. The figures can be easily exported from the software; however, users must right click and select the type of format desired in order to download the file. That is, it is somewhat different from traditional practices for saving rasterized images from the internet (e.g., like a .png or .jpg file). By default, figures are downloaded to you "Downloads" folder with naming consistent with the figure selected.

Options for figure export included .png, .jpeg, .webp, and .svg formats. As a general rule, SVG figures are lossless and provide the best balance of file size and image quality. The JPEG/PNG/WEBP options are lossy (rasterized) and vary in terms of compression and quality. There is wider support for rasterized images in peer review platforms and the WEBP option is the most modern among the options; however, SVG remains the ideal if the platform supports it.

A limited number of figure features can be edited in the browser, including marker color and size. The app does not support the editing of figure labels or other features at this time. If additional editing is required, figures using the SVG format can be saved and then edited in vector graphics editor, such as Adobe Illustrator (Commercial) or Inkscape (Free/Open Source).
