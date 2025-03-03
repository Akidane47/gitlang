# Contributing to GitLang

## Local development

### Clone repository

#### HTTPS

```sh
git clone https://github.com/chiefmikey/gitlang.git
```

#### SSH

```sh
git clone git@github.com:chiefmikey/gitlang.git
```

### API Authentication

Create a GitHub Personal Access Token (PAT) with the `public_repo` scope.

Create a `.env` file in the root of the project with the following contents:

```dotenv
GITHUB_PAT=<your PAT>
```

Make sure the `.env` file is not tracked in Git.

### Install Dependencies

```sh
npm install
```

### Build

#### Development

```sh
npm run dev
```

#### Production

```sh
npm run prod
```

### Start Server

```sh
npm run start:server
```

### Start Client

```sh
npm run start:client
```

Client will be available in the browser on local port `8080`.

## Beta

If your PR is labeled with `beta`, it will be live for testing at
[beta.gitlang.net](https://beta.gitlang.net).
