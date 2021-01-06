# Simple Todo App

This is the full stack app (demo only) based on the next technologies:

1. React/Redux-Toolkit
2. AdonisJs
3. Postgres
4. Nginx
5. Docker (Docker-compose)
6. Adminer

## Setup
Migration command is included.
Use this command to deploy in prod mode.
Rename .env.example -> .env in root and "server" folder. 

```bash
docker-compose up --build
```

For dev mode use next:

```
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build
```
