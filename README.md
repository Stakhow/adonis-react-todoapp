# Simple Todo App

This is the full stack app based on the next technologies:

1. React/Redux-Toolkit
2. AdonisJs
3. Postgres
4. Nginx
5. Docker (Docker-compose)
6. Adminer

## Setup

Use this command to deploy in prod mode

```bash
docker-compose up --build
```

### Migrations

Migration command is included.

### Development mode
For dev mode use next:

```
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build
```
