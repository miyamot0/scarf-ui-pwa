---
title: Preparing SCARF Visuals
date: 11/01/2024
author: 'Shawn Gilroy'
index: 4
---

## Preparing Visuals with the SCARF

The SCARF-UI webapp provides severals means of visualizing the results of the review. The visual summary of the data in the loaded data set is visualized across _three_ different types of contrasts. Depending on the types of questions covered in the review, some of these may not be populated, as the relevant data would not be present in the data set.

Each of these types of outcomes are discussed in the sections below.

### Figure A: Functional Relations and Study Quality/Rigor

The first figure summarizes two dimensions relevant to SCED research: The size/direction of functional relationships and the quantity of indicators that reflect rigorous design (e.g., procedural rigor/fidelity). This figure is often useful to assess whether variability in the size/direction of intervention effects appears influenced by how strongly the studies have been designed. A high degree of variability in both outcomes and study rigor may suggest that the available literature is not yet mature enough to draw strong conclusions.

This is likely the most common and important figure for most SCED reviews, as it provides a visual summary of the core outcomes of interest (i.e., the size/direction of intervention effects) and the quality of the studies that have been reviewed. This figure is particularly useful for identifying patterns in the data and for assessing the overall strength of the evidence base.

### Figure B: Outcome Maintenance and Degree of Follow-up

This figure illustrates information related to the maintenance of primary study outcomes. It consists of plotting the size/direction of maintained outcomes against the size of the follow-up window. Generally, it is expected to have maintenance effects consistent with effects while in treatment when the latency between intervention and follow-up is brief (e.g., immediately following conclusion of the study). Variability in this figure may suggest that intervention effects are not particularly durable and/or the literature may not be established enough to draw clear inferences regarding long-term benefits.

This is a useful, but perhaps less common type of visual to include in a review. Should reviewers not wish to explore these figures, they can be disabled in the settings area of the SCARF-UI app.

### Figure C: Outcome Generalization and Generalization Measurement

The final figure depicts the degree of generalization observed in respective studies against the rigor/breadth of generalization explorted. This figure is useful for assessing the degree to which the literature has explored the generalization of effects and the rigor with which generalization has been explored. A high degree of variability in this figure may suggest that the certain approaches may not produce outcomes that have consistently good generality (i.e., that outcomes do not clearly extend beyond the teaching/intervention context).

This is a useful, but perhaps less common type of visual to include in a review. Should reviewers not wish to explore these figures, they can be disabled in the settings area of the SCARF-UI app.

### Options for Augmenting Figures

Various options exist for augmenting the figures provided in the app and supporting the visual analysis of data. For example, the user can change the size of the figures, jitter the data points to improve study visibility, and adjust the size of the data points.

The jittering of data points will likely be necessary when many studies are entered and the risk of overplotting becomes significant (i.e., drawing data over other data). This is often the case for reviews with many studies and/or studies with similar outcomes.

The size of the figures can also be adjusted to improve the visibility of the data points. This is particularly useful when the data points are small and/or the figure is being viewed on a small screen. This may help with taking advantage of the tooltips provided when reviewing results from individual studies.

### Options for Exporting Figures

Each figure in the SCARF-UI app is drawn as a vector image by default. This is a convenient format for supporting various devices as well as maintaining high quality (i.e., not 'grainy' when drawn). The figures can be easily exported from the software; however, users must right click and select the type of format desired in order to download the file. That is, it is somewhat different from traditional practices for saving rasterized images from the internet (e.g., like a .png or .jpg file). By default, figures are downloaded to you "Downloads" folder with naming consistent with the figure selected.

Options for figure export included .png, .jpeg, .webp, and .svg formats. As a general rule, SVG figures are lossless and provide the best balance of file size and image quality. The JPEG/PNG/WEBP options are lossy (rasterized) and vary in terms of compression and quality. There is wider support for rasterized images in peer review platforms and the WEBP option is the most modern among the options; however, SVG remains the ideal if the platform supports it.

A limited number of figure features can be edited in the browser, including marker color and size. The app does not support the editing of figure labels or other features at this time. If additional editing is required, figures using the SVG format can be saved and then edited in vector graphics editor, such as Adobe Illustrator (Commercial) or Inkscape (Free/Open Source). Alternatively, users may export data for the figures directly to draw figures in other software (e.g., R Statistical Program).

These files can be exported by right-clicking the respective figure and selecting the desired format. The file will be saved to the user's default download location and can be opened in a variety of software for further analysis or visualization.

### Options for Exporting Figure Data

Each figure in the SCARF-UI app can also be exported as a data file. Specifically, the information related to X/Y coordinates of data points can be exported and this gives users the freedom to visualize results from the review in a manner of their choosing. For example, users may wish to visualize the data in a different software or to conduct additional analyses on the data. This is particularly useful for users who wish to explore the data in more detail or to visualize the data in a way not natively supported by the SCARF-UI.

These files can be exported by right-clicking the respective figure and selecting the desired format. The file will be saved to the user's default download location and can be opened in a variety of software for further analysis or visualization.
