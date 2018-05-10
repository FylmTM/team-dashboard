#!/usr/bin/env bash

kubectl create -f k8s/0-namespace.yml
kubectl create -f k8s/1-config.yaml
kubectl create -f k8s/2-backend.deployment.yaml
kubectl create -f k8s/3-frontend.deployment.yaml
kubectl create -f k8s/4-backend.service.yml
kubectl create -f k8s/5-frontend.service.yml
kubectl create -f k8s/6-ingress.yaml
