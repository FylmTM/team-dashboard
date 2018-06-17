#!/usr/bin/env bash

docker build -t fylmtm/team-dashboard-backend:${TRAVIS_TAG} backend/
docker build -t fylmtm/team-dashboard-frontend:${TRAVIS_TAG} frontend/
docker build -t fylmtm/team-dashboard-shelly:${TRAVIS_TAG} slack-bot-shelly/

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker push fylmtm/team-dashboard-backend:${TRAVIS_TAG}
docker push fylmtm/team-dashboard-frontend:${TRAVIS_TAG}
docker push fylmtm/team-dashboard-shelly:${TRAVIS_TAG}
