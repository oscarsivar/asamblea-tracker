@ECHO OFF

SET USR_ENV=%1
SET /A COMPOSE=0

IF "%USR_ENV%" == "" (
    ECHO Please specify either production or development as an environment
) else (
    IF EXIST ".\.env" (
        ECHO Preparing docker-compose file...

        IF "%USR_ENV%" == "production" (
            SET PORT=80
            SET DOCKERFILE=Dockerfile

            docker-compose -f .\docker\docker-compose.yml up --build --remove-orphans
        )

        IF "%USR_ENV%" == "development" (
            SET PORT=3000
            SET DOCKERFILE=Dockerfile.dev

            docker-compose -f .\docker\docker-compose.yml up --build --remove-orphans
        )
    ) else (
        ECHO You need to create an .env file
    )
)