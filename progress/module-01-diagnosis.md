# Module 01 Diagnosis Notes

## Bug 1
- Symptom:
  Docker compose failed because Redis port 6379 was already allocated.

- Hypothesis A:
  - Command:
    docker ps
  - Observation:
    Found existing container using port 6379:
    interviewcopilotai-redis-1

- Hypothesis B:
  - Command:
    docker stop interviewcopilotai-redis-1
    docker rm interviewcopilotai-redis-1
  - Observation:
    Redis port became available.

- Fix:
  Restarted docker compose after removing conflicting Redis container.

- Verification proof:
  docker compose -f infra/docker-compose.yml ps

  Verified:
  - linkops-redis healthy
  - port 6379 active


## Bug 2
- Symptom:
  FastAPI returned 500 Internal Server Error while creating short links.

- Hypothesis A:
  - Command:
    Checked uvicorn traceback logs.
  - Observation:
    Database "upsk_sdf" did not exist.

- Hypothesis B:
  - Command:
    Checked .env DATABASE_URL configuration.
  - Observation:
    Application was pointing to wrong PostgreSQL database.

- Fix:
  Updated DATABASE_URL from:
  upsk_sdf
  to:
  linkops

  Applied Alembic migrations:
  alembic upgrade head

- Verification proof:
  Successful API request:

  POST /links/

  Successful redirect:
  GET /r/{code}

  Redis cache verification:
  - CACHE MISS
  - CACHE HIT
