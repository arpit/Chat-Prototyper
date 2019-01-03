# Chat app prototyper

A simple app to prototype chat experiences


This app uses the following projects which are also released under MIT licenses
* https://github.com/brandonmowat/react-chat-ui
* https://github.com/esausilva/example-create-react-app-express


# Usage

Install nodemon globally
```
npm i nodemon -g
```

Install server and client dependencies
```
yarn
cd client
yarn
```
To start the server and client at the same time (from the root of the project)

```
yarn dev
```

Running the production build on localhost. This will create a production build, then Node will serve the app on http://localhost:5000

```
NODE_ENV=production yarn dev:server
```
