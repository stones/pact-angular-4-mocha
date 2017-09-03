# Example Pact Mocha NG4 project

> This is intended to be help getting started, not a best practice example. If you have any suggestions as to how to make this better, please don't hesitate to improve it.

## Quickstart

```
npm i && npm run pact:test
```

## Why?

This was created to help some of the people in Pact gitter room. I am neither a pact expert nor an Angular 4 expert. This is only meant to be starting off point. 

When I was starting off with Pact, I also found some of the examples confusing, have the consumer/provider tests along side each other. With that in mind, there is a [sister repository](https://github.com/stones/pact-angular-4-mocha-provider) with the corresponding provider tests.

## How to 

There are a few different features to the repository.

You can review the app by running `npm start`.

To run the unit tests, `npm test`.

To run the pact tests: `npm run pact:test`

If you have a pact broker account or are running your own version, add your credentials to the `config/pact.publish.js` file, then run `npm run pact:publish`. In the sister project, there is an example of running the provider test directly from the pact broker.

