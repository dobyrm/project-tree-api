# Project Tree API

The project provides a web-based project management system that helps teams create, plan, coordinate, and track their projects.
It offers an intuitive interface, collaboration features, and performance analytics tools to improve project efficiency and team productivity.

## How to Run the Project

### Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Build the container

```bash
docker-compose build
```

### 2. Run the container

```bash
docker-compose up -d
```

### 3. Access bash inside the container

```bash
docker exec -it project-tree-api bash
```
(If already running via `docker-compose up`)

## Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── README.md
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── src
│   ├── main.ts
│   ├── app.module.ts
│   ├── users
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
        ├── users.service.spec.ts
│   │   └── users.service.ts
└── test
    └── app.e2e-spec.ts
```

## License

MIT License.
