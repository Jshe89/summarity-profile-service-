
## Description

Summarity Profile Microservice Repository

## Installation

Make sure that you have Docker installed. Also don't forget to get Node 18+ version

```bash
$ npm install
```

## Docker Compose
Run docker compose to run local postgres

```bash
# run docker-compose with postgres image
$ npm run docker-compose:up
```

## Environment
Create `.env.development` in the root directory and copy `.env.example` file there

## Migrations

```bash
# run migrations dev
$ npm run migration:ts:run

# generate migrations dev (initial file 'path' example)
$ npm run migration:ts:generate ./src/migrations/initial

```

## Running the app

```bash
# local dev
$ npm run start:dev

# local dev with watch option(used for local development)
$ npm run start:watch
```

## Linter
``` bash
# before commit check linter
$ npm run lint 
```

## Playground in local browser
Open link to check graphql api http://localhost:3010/api/graphql

## Query Example
All outputs should usually have an union output with two nested entities: exact entity output and error output.
Here is `profileById` query
```
query {
  profileById(id:"226ec6d5-522c-4ec4-8dd8-df01b9d54ada") {
    ...on ProfileOutput {
      id
      firstName
      lastName
      title
    }
  	...on ErrorListOutput {
      errors {
        id
        type
        message
        
      }
    }
  }
}
```