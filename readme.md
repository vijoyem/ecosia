# Ecosia node-app deployment using the EKS, kubectl and nginx.
# Prerequisites
	Kubernetes cluster should be running in the AWS EKS. kubectl, helm, docker and git should be installed and running. Nginx ingresss should be configured in the Kubernetes for the path based routing.
# Create a Dockerfile
	docker build -t nodeappecosia .

# Login to the image repository, for eg, Dockerhub
    docker login "username"

# Push the docker image to the dockerhub
    docker tag nodeappecosia "username/tagname"
    docker push nodeappecosia "username/tagname"

# Create kubectl secret if you are using the docker private repository images.
    kubectl create secret docker-registry ecosiasecret --docker-server=docker.io --docker-username="username" --docker-password="Password/token" --docker-email="emailid"

# Add the image url and secret name in the yaml file "node-app.yaml"

# Create a namespace
	kubectl create namespace ecosia

# Create the front end ecosia app deployment
	kubectl apply -f node-app.yaml --namespace=ecosia

    # Output would be :
    deployment.apps/node-app created
    service/node-app-lb created
# Install the nginx ingress controller using the Helm if the ingress controller is not installed.
#1: Install Helm 3 on Kubernetes Cluster
Install helm3 on Kubernetes Cluster on Kubernetes Cluster using below command

curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
To check helm3 version

helm version
Output:

version.BuildInfo{Version:"v3.5.3", GitCommit:"041ce5a2c17a58be0fcd5f5e16fb3e7e95fea622", GitTreeState:"dirty", GoVersion:"go1.15.8"}
#2: Install Nginx Ingress Controller Kubernetes KOPS using Helm
Add the nginx ingress helm repo in Kubernetes kops cluster, follow this Nginx ingress official page to install latest nginx ingress helm chart

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
Update the helm repo

helm repo update
Install Nginx Ingress Controller Kubernetes KOPS using Helm 3

helm install ingress-nginx ingress-nginx/ingress-nginx
Output:

Output:

NAME: ingress-nginx
LAST DEPLOYED: Sun Apr 11 07:10:01 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
The ingress-nginx controller has been installed.
It may take a few minutes for the LoadBalancer IP to be available.
You can watch the status by running 'kubectl --namespace default get services -o wide -w ingress-nginx-controller'

An example Ingress that makes use of the controller:

  apiVersion: networking.k8s.io/v1beta1
  kind: Ingress
  metadata:
    annotations:
      kubernetes.io/ingress.class: nginx
    name: example
    namespace: foo
  spec:
    rules:
      - host: www.example.com
        http:
          paths:
            - backend:
                serviceName: exampleService
                servicePort: 80
              path: /
    # This section is only required if TLS is to be enabled for the Ingress
    tls:
        - hosts:
            - www.example.com
          secretName: example-tls

If TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:

  apiVersion: v1
  kind: Secret
  metadata:
    name: example-tls
    namespace: foo
  data:
    tls.crt: <base64 encoded cert>
    tls.key: <base64 encoded key>
  type: kubernetes.io/tls
To check nginx ingress controller

kubectl get services ingress-nginx-controller

# Create path based rouitng for the deployment.

kubectl -n ecosia apply -f  ecosia_ingress.yml

# Get the sevice and check it in the browser. Make sure that the port and ip address are whitelisted in the firewall/AWS SG.



