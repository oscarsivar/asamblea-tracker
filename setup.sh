#!/bin/bash

USR_ENV=$1

if [ -z $USR_ENV ]
then
    echo ">> Please specify either production or development as an environment"
else
    if [ $USR_ENV = "production" ]
    then
        export PORT=80
        export DOCKERFILE=Dockerfile
    elif [ $USR_ENV = "development" ]
    then
        export PORT=3000
        export DOCKERFILE=Dockerfile.dev
    fi

    if [ -f .env ]
    then
        echo "PORT: $PORT, DOCKERFILE: $DOCKERFILE"
        # docker-compose -f docker/docker-compose.yml config
        docker-compose -f ./docker/docker-compose.yml up --build --remove-orphans
    else
        echo ">> You need to create an .env file"
    fi
fi

# echo $MY_ENV