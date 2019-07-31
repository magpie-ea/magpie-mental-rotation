# Departure Point

This repository contains a minimal example of a _magpie experiment. It can be used as a quick-start departure point when programming a new _magpie experiment from scratch.

## Online demo

You can have a look at the minimal example experiment [here](https://departure-point.netlify.com/).

## How to set up an experiment with _magpie (quick start guide)

### Obtaining the `departure point`

1. install npm by following these [instructions](https://www.npmjs.com/get-npm)
2. download or clone this github repository: https://github.com/magpie-ea/magpie-departure-point
   - e.g. type `git clone https://github.com/magpie-ea/magpie-departure-point.git`
3. change the folder name `departure-point` to whatever you like
   - let's say you call it `my-exp`, e.g. by typing `mv departure-point my-exp`
4. go to your folder `my-exp`, e.g., by typing `cd my-exp`
5. now type `npm install`; this will download the Javascript packages with the most current version of _magpie
6. you can have a look at the example experiment by opening the file `index.html` in your browser
7. you can now start editing to create your own experiment

### Changing the `departure point` to your own experiment

- Usually, you might just want to manipulate the following files:
    - `01_custom_styles.css` :: (optional) contains custom styles
	- `02_custom_functions.js` :: (optional) contains custom functions, variables and hooks (e.g. a global coin flip)
	- `03_custom_views_templates.js` :: (optional) contains user-defined special-purpose view templates (only needed, if the provided view templates are not enough for your experiment)
	- `04_trials.js` :: (optional) contains the data of different trials of a task (e.g. names of pictures, test sentences, questions, etc.)
	- `05_views.js` :: defines the different kinds of tasks, or, more generally, anything users will engage with on the screen
	- `06_main.js` :: contains the experiment structure and general information about deployment
- The numbering of the files is important, you can use the functions defined in earlier files in later ones, but not the other way around; that means you can use functions defined in `01` in `04`, but you can't use some variable from `05` in `02`.
