# MANAGER

## Installation

First, clone this repo and `cd` into the main directory. Then:

```shell
yarn
```

## Development

During development, the `/app` folder is being watched for changes.

All changes invoke the TypeScript compiler, which restarts the app upon completion.

```shell
yarn watch
```

## Build the Server

To compile the TypeScript code and place into the `/dist` folder:

```shell
yarn build
```

## Code Linter

A TypeScript linter has been added to keep code consistent among developers.

```shell
yarn lint
```

To autofix linting errors (not all errors are auto-fixable):

```shell
yarn fix
```

## Tests and Coverage

The test coverage percentage should be 90% or greater for any submitted PRs.

For TDD, invoke testing by:

```shell
yarn test
```

For an html and text coverage report (html located in the `/coverage` folder):

```shell
yarn coverage
```

## Docker

To build a container using the `dockerfile`:

```shell
npm run image:build -- --no-cache
```

---

## API

For a swagger version of this documention, see http://localhost:3000/swagger (requires this server to be running).

--- 

## Wiki

  * GET /resources to get multiple resources
  * POST /resources to create new resources
  * PATCH /resources to update multiple resources
  * PUT /resources to replace multiple resources
  * DELETE /resources to delete multiple resources
