# lil bugga front-end

## Links
Hosted: https://lil-bugga.netlify.app/dashboard

Front-End Trello: https://trello.com/b/XMPa9Hot/lil-bugga-front-end

Project: https://github.com/lil-bugga/project-documentation 

## Description
*For project features, go to the project readme linked above.*

This is the lil bugga front-end React application. It's the hosted user interface to the lil bugga application, and allows the user interact with the project back-end and realize all of it's useful features.

## Testing Command
*How to run test suite.*
```shell
yarn test 
```
or
```shell
npm run test
```

## Stack
- React
- JSX
- Netlify
- Bootstrap
- Jest / React Testing Library
- JavaScript
- HTML
- CSS

## Libraries
- Axios
  - It's a "Promise based HTTP client for the browser and node.js", which essentially allows you to make requests to external APIs easily, as an alternative to using the Javascript fetch method. Axios was used extensively through the front-end where requests to the back-end needed to be made, and it was an effective and clean way to make the responses.
- React
  - A Javascript library for building fast loading user interfaces in web applications. The front-end of lil bugga is built entirely in React, making use of components that render and update to the DOM conditionally, rather than all at once like in a regular application. It was used in many different ways through the application, following the newer functional components way of doing things, making use of Hooks to hold state, set asynchronous events and more.
- react-chartjs-2
  - It's a charting library made for one purpose, to chart information, particularly from React applications. It's imported into a project through node modules, and used component-wise. It was used numerous times for the Bar components, which was used to give give users a visual read on where most of their tickets were allocated.
- Bootstrap (just the CSS)
  - A framework that allows you to quickly customize the user interface. It acts as a convenience when manipulating CSS, using HTML classes to change visual features over CSS driven by selectors. It helped to cut down on code in this project, and gets used extensively to make divs behave as desired, and to center text.
- react-bootstrap
  - A framework that replaces the need for Bootstrap in React applications, giving you the power to create template components like modals and nav-bars without the old dependencies on jQuery etc. It got used alongside Bootstrap for NavBar and Modals, which required javascript configuration. This meant we didn't need the jQuery or the Javascript part of Bootstrap.