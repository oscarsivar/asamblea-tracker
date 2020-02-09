#!/bin/bash

USR_ENV=$1
COMPOSE=1

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

    if [ ! -f .env ]
    then
        export MONGO_USER=root
        export MONGO_PASS=
        export MONGO_DB=asamblea-audit
        export MONGO_HOST=mongo
        export MONGO_PORT=27017

        COMPOSE=2
    fi
    echo $COMPOSE
    if [ $COMPOSE -eq 1 ]
    then
        docker-compose -f ./docker/docker-compose.yml up --build
    elif [ $COMPOSE -eq 2 ]
    then
        # docker-compose.exe -f docker/docker-compose.yml -f docker/docker-compose.mongo.yml config
        docker-compose -f ./docker/docker-compose.mongo.yml up --build
    fi
fi

# echo $MY_ENV