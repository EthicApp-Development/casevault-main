# CaseVault
Main branch of the repository containing CaseVault: a content repository for case-based learning. For more information, please review the [Organization README document](https://github.com/EthicApp-Development/ethicapp-main/blob/ethicapp-v2/README.md), for more context and details concerning the EthicApp project.
- [CaseVault](#casevault)
  - [1. Contributing](#1-contributing)
  - [2. Required skills](#2-Required-skills)
  - [3. Installation](#usage)
    - [3.1 With Docker installed](#31-with-docker-installed)
    - [3.2 Run locally without Docker](#32-run-locally-without-docker)

## 1. Contributing

Please head to the [CONTRIBUTING document](https://github.com/EthicApp-Development/organization/blob/master/CONTRIBUTING.md) and review our [communication channels](https://github.com/EthicApp-Development/organization/blob/master/CONTRIBUTING.md#1-communication-channels) for the project. We strongly recommend to have [Docker](https://www.docker.com/) installed in your machine, as it will be used to run the project.

## 2. Required skills

In order to work in the project you should be familiar with the following:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://material-ui.com/)
- [Ruby on Rails](https://rubyonrails.org/)

Knowledge of [Docker](https://www.docker.com/) could be helpful, but not required.

## 3. Installation

### 3.1 With Docker installed

If you have Docker installed, you can run the project on the root folder the following commands:

```bash
docker-compose build
docker-compose up
```

### 3.2 Run locally without Docker

Go to the `frontend` folder and run the following commands:

```bash
npm install
npm run dev
```

Then, go to the `backend` folder and run the following commands:

```bash
bundle install
rails db:create
rails db:migrate
rails s
```
