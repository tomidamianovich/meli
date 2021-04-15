# Meli APP Readme File

# Sections of the application

The application has the following sections pages:
  - Search Page: From where you can search for products that matchs a product.
  - Product List Page: From where you could see the list of products that match a search value.
  - Product Detail Page: From where you can see the detail of a product, this could be rendered
  due to a click in the list of products or just adding the  /items/:productId in the browser.
  - AlertMesage Page: From where you could see a message with neccesary data in the screen.
# Stack of technologies used in this project

This project was developed with [React JS](https://es.reactjs.org/) and with [Express](https://expressjs.com/es/) making a server side rendering that also uses the following tools and methodologies:

  - [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react-native): To manage icons in the application.
  - [Axios](https://www.npmjs.com/package/axios): Manage http request
  - [Saas](https://sass-lang.com/): Preproccesor for styles
  - [BEM Methology](http://getbem.com/): Styles structure organization purposes.
  - [React Testing Library](https://testing-library.com/): Simple and complete testing utilities that encourage good testing practices
  - [testing-library jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom): Custom jest matchers to test the state of the DOM.
  - [React test rendender](https://es.reactjs.org/docs/test-renderer.html): Este paquete proporciona un procesador de React que se puede usar para procesar componentes de React a objetos JavaScript puros, sin depender del DOM o de un entorno móvil nativo.
  - [Jest] (https://jestjs.io/):JavaScript Testing Framework





# Explanation of the structure of the proyect

Although the structure of the project is not a single answer question and that the structure will probably depend on the project itself, the methodology we are currently using and the number of members that are part of the dev team among other important things that will determine the structure of the project we could say that there are some common guidelines so i used that one to this proyect structure.

- Components: Main features or big components that are will be the kickoff of the child components(generic/shared ones) that the proyect will have. Are the basic building block of the application, the idea of this one is that they could be used all over the application for a specific reason but with differents props. 

  - Note: Components will have the following structure:
    * Component: The React component itself.
    * Styles: where the styles are exported.
    * Tests: React Testing library/Jest tests. // To be implemented in the future

- Utils: Extra utils folder where you could find:
  - Constants: Constants used to avoid hardcoded strings that are shared among the components and also if in the future the string changes we will need just to uploaded in a single line MR.
  - Colours: Shared colours used by saas.
  - Font: Font family (Roboto) and font weights
  - Screen: Screen sizes used in media queries around the application css styles.

# Requirements to run the application

  - [Git](https://git-scm.com/)
  - [Node Js](https://nodejs.org/en/)
  - [Npm](https://www.npmjs.com/) || [Yarn](https://yarnpkg.com/)

# How to Run the application

1. Open a new terminal in your repositories folder

1. Clone the repository in your local machine:
  run "git clone https://github.com/tomasdreddy/meli.git"

2. run "cd meli"

3. run "git checkout master"

4. run "npm install"

5. run "npm run build"

6. run "npm run start"

# How to run all the test
  1. Open a new terminal in your repositories folder
  2. run "npm run test"

# How to run an specific test
  1. Open a new terminal in your repositories folder
  2. run "npm run test -- "<ComponentName>.test.jsx" (Add -u at last part to update the snapshot if you change a component).
  Example npm run test -- "ProductList.test.jsx"

# How to run a coverage test
  1. Open a new terminal in your repositories folder
  2. run "npm run test:coverage"
  3. You will see the coverage of all the files at the console, and in the root path 
    you could also see a new folder that has inside a folder called "lcov-report" that 
    has inside an "index.html" file that will show you extra information about the lines
    that where coverage in each file and so on.