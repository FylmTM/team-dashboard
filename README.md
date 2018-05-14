# Team Dashboard

[![Build Status](https://travis-ci.org/FylmTM/team-dashboard.svg?branch=master)](https://travis-ci.org/FylmTM/team-dashboard)

Dashboard for teams, for unified view of:

- JIRA Sprint Progress
- Jenkins jobs
- Gerrit reviews

## Features

- Jira board
  - In Progress issues
  - Age color coding 
- Jenkins job list with their statuses
- Open gerrit reviews
  - Age color coding

## Deployment

### Docker

Container available here:

- https://hub.docker.com/r/fylmtm/team-dashboard-backend/
- https://hub.docker.com/r/fylmtm/team-dashboard-frontend/

### Kubernetes

For deployment to Kubernetes, manifests and script are provided:

Manifests are located in `k8s/` folder.

Scripts:

- `bin/kube-up.sh` - deploy to K8s cluster
- `bin/kube-down.sh` - undeploy from K8s cluster

## Build Prerequisites

* Java 8
* Node 10.1.0

### [Jira Client](https://github.com/rcarz/jira-client)

Maintainer did not made any releases to Maven central for a long time.
So, clone it locally and build.

```bash
git clone git@github.com:rcarz/jira-client.git
cd jira-client
git checkout 868a5ca8977e0c13b792aeed7a793d55cea743ec
mvn clean install -DskipTests
```

## Development

### Backend

Just start application from IDE.

### Frontend

Install dependencies: `npm install`

Start development server: `npm run start`

## License

This project is [MIT licensed](LICENSE).
