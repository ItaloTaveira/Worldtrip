# 🌍 Worldtrip

A travel agency website featuring both a customer-facing storefront and an admin dashboard. Full-stack project built with **React + Vite** on the front end and **Node.js + Express** on the back end.

## ✨ About the project

Worldtrip simulates a travel agency platform, letting visitors browse destinations and travel packages, while an admin area supports managing the content shown on the site.

## 🛠️ Tech stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Monorepo management:** npm workspaces (`client/` and `server/`) orchestrated with [`concurrently`](https://www.npmjs.com/package/concurrently)

## 📁 Project structure

```
Worldtrip/
├── client/          # Front-end application (React + Vite)
├── server/          # Back-end API (Node + Express)
├── package.json     # Root scripts to orchestrate client + server
└── .gitignore
```

## 🚀 Running locally

### Prerequisites

- [Node.js](https://nodejs.org/) installed (LTS recommended)
- npm

### Installation

Clone the repository and install root, client, and server dependencies in one go:

```bash
git clone https://github.com/ItaloTaveira/Worldtrip.git
cd Worldtrip
npm run install:all
```

### Seeding the database

If the backend uses sample data, run:

```bash
npm run seed
```

### Running in development

To start the front end and back end together:

```bash
npm run dev
```

Or separately:

```bash
npm run dev:client   # runs only the front end
npm run dev:server   # runs only the back end
```

By default:
- Frontend: `http://localhost:5174`
- Backend: `http://localhost:3001`

## 📜 Available scripts

| Script                | Description                                        |
|------------------------|-----------------------------------------------------|
| `npm run install:all`  | Installs root, client, and server dependencies      |
| `npm run dev`           | Runs client and server concurrently                 |
| `npm run dev:client`    | Runs only the front end                             |
| `npm run dev:server`    | Runs only the back end                              |
| `npm run seed`          | Seeds the database with initial data                |

## 👤 Author

Built by [Ítalo Taveira](https://github.com/ItaloTaveira).

## 📄 License

This project does not currently have a defined license.
