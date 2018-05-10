# Team Dashboard

[![Build Status](https://travis-ci.org/FylmTM/team-dashboard.svg?branch=master)](https://travis-ci.org/FylmTM/team-dashboard)

## Prerequisites

### Jira Client

Link: https://github.com/rcarz/jira-client

Maintainer did not made any releases to Maven central for a long time.
So, clone it locally and build.

```bash
git clone git@github.com:rcarz/jira-client.git
cd jira-client
git checkout 868a5ca8977e0c13b792aeed7a793d55cea743ec
mvn clean install -DskipTests
```
