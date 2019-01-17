# Departure Point

This repository contains an example that showcases some of the basic functionality of _babe experiments. It can be used as a quick-start departure point when programming a new _babe experiment from scratch.

## How to set up an experiment with _babe (quick start quide)

### Obtaining the `departure point`

1. install npm by following these [instructions](https://www.npmjs.com/get-npm)
2. download or clone this github repository: https://github.com/babe-project/departure-point
   - e.g. type `git clone https://github.com/babe-project/departure-point.git`
3. change the folder name `departure-point` to whatever you like
   - let's say you call is `my-exp`, e.g. by typing `mv departure-point my-exp`
4. go to your folder `my-exp`, e.g., by typing `cd my-exp`
5. now type `npm install`; this will download the Javascript packages with the most current version of _babe
6. you can have a look at the example experiment by opening the file `index.html` now
7. you can now start editing to create your own experiment

### Changing the `departure point` to your own experiment

- you can find more general explanations of the elements relevant for setting up a _babe experiment [here](https://github.com/babe-project/babe-project#Usage)

- usually, you might just want to manipulate the following files:
	- `main.js` :: contains the experiment structure and general information about deployment
	- `views.js` :: defines the different kinds of tasks, or, more generally, anything users will engage with on the screen
	- `trials.js` :: (optional) contains information to realize different trials of a task (e.g., names of pictures, test sentences, questionaire questions etc.)
