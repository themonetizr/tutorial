##
This project as prepared as an example application to demonstrate Monetizr's integration in game or mobile application

Application is built on top of [React tutorial](https://reactjs.org/tutorial/tutorial.html).
In the process

## Available Scripts For launching locally

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Deployment on Kubernetes
Tutorial runs on Kubernetes engine, to publish new version, author needs to acquire permissions to push container to repository:

> docker build -t gcr.io/gcp-monetizr-project/react_tutorial .

> docker push gcr.io/gcp-monetizr-project/react_tutorial

> kubectl set image deployment/react-tutorial react-tutorial-app=gcr.io/gcp-monetizr-project/react_tutorial
