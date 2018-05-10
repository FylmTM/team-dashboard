#!/usr/bin/env bash

docker build -t fylmtm/team-dashboard-backend:${TRAVIS_TAG} backend/
docker build -t fylmtm/team-dashboard-frontend:${TRAVIS_TAG} frontend/

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker push fylmtm/team-dashboard-backend:${TRAVIS_TAG}
docker push fylmtm/team-dashboard-frontend:${TRAVIS_TAG}
