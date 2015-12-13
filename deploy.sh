#!/bin/bash

set -e

sed -i "s/%TAG%/%{CIRCLE_TAG}/g" kube/helloworld-rc.yaml

kubectl --username=${KUBE_USER} --password=${KUBE_PASS} \
  --insecure-skip-tls-verify --server=${KUBE_SERVER} \
  --namespace=${KUBE_NAMESPACE} delete rc/helloworld

kubectl --username=${KUBE_USER} --password=${KUBE_PASS} \
  --insecure-skip-tls-verify --server=${KUBE_SERVER} \
  --namespace=${KUBE_NAMESPACE} create -f kube/helloworld-rc.yaml
