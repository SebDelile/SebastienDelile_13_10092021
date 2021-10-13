# Argent Bank App

Argent Bank is a bank web application offering its users to login and check their accounts details.

![app preview - homepage](/specs/screenshot-ProfilePage.png)

[Follow this link to find more screenshots of the App.](/specs)

## How to begin with the project

You need to first install [node](https://nodejs.org/en/) (v14.15.4 or later) on your device in order to run `npm` commands and [git](https://git-scm.com/) to run the `git` commands. you will also need [MongoDG community server](https://www.mongodb.com/try/download/community) to run the API 

To install the project :

1. clone this repo with `git clone https://github.com/SebDelile/SebastienDelile_13_10092021.git`

2. in the same folder, clone the API repo with `git clone https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API`

3. then go to the API folder with `cd Project-10-Bank-API`

4. install all dependencies with `npm ci`

5. then go to the project folder with `cd ../SebastienDelile_13_10092021`

6. here again install all dependencies with `npm ci`

7. before first use of the API, you need to populate the database with sample users. run `npm run startAPI` to start the server and then `npm run populateAPI`

Then you can start working on front side of the project !

## Documentation

A dependency diagram of the app can be found at [/specs/dependencygraph.svg](/specs/dependencygraph.svg)

Sequence UML diagrams are provided for the login feature and the name update feature at [/specs/argentBank_sequence_userLogin.drawio.png](/specs/argentBank_sequence_userLogin.drawio.png) and [/specs/argentBank_sequence_userNameUpdate.drawio.png](/specs/argentBank_sequence_userNameUpdate.drawio.png), respectively.

The javascript documentation can be found at [/docs/index.html](/docs/index.html)

The API documentation can be found at [http://localhost:3001/api-docs](http://localhost:3001/api-docs) while the server is running (see Available scripts section)

A swagger documentation is provided in [/nextAPISpecs/swagger.yaml](/nextAPISpecs/swagger.yaml) in order to plan an evolution of the API. the corresponding code is not yet implemented

## Dependencies

The project is a single page application powered by React JS. it uses :

- **create-react-app** for the react providing (includes Webpack, Babel and Eslint)
- **react-router-dom** for the app routing
- **redux** for the global state management
- **react-redux** for the use of reduc with react hooks
- **reduc-toolkits** to simplify the use of redux
- **styled-components** to style the components performing CSS-in-JS
- **axios** to perfom the API alls
- **jest** to perform the unit and integration tests (provided with creat-react-app)
- **testing-library** to help writing the unit and integration tests (provided with creat-react-app)
- **msw** to intercept all API call during testing
- **prettier** to format the files (add any missing semi-column and 2 spaces tab-width)
- **jsdoc** to document the javascript
- **prop-types** to set the proptypes of the components
- **stylelint** to lint the style and avoid errors and inconsistencies
- **stylelint-config-standard** to configure stylelint
- **draw-io** to edit the class diagramm, a [vs-code extension](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)


## Available scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run startAPI`

Launch locally the API on port 3001 in server mode. Please note that even if the API config and node's modules are in the API folder, this script has to be launched from this location.
To use this script, you first need to install the dependency of the API, see How to begin with the project section.

### `npm run populateAPI`

Add sample users to the database. This script need to be run only once. Please note that it needs the server to be launched (with `npm run startAPI`) and MongoDB community server to be installed on your device, see How to begin with the project section for more details.

### `npm run jsdoc`

Update the javascript documentation

### `npm run dependencyGraph`

Update the dependency graph

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.