# Cloud Deployment Options
This document lists some suggstions on how a similar application could be deployed to the cloud.

### Serverless Containers with Managed Database (Recommended approach)
Since this is a simple application, and each component is already containerised, a good option for cloud deployment could be a serverless approach. This is because the simple approach mirrors the simple nature of the application - no servers to manage and maintain and it scales automatically in response to demand. A managed database service would also be a good simple option, especially one that is compatible with your serverless container service. Here are some services to consider from each cloud provider:
* AWS Fargate with Amazon Aurora Serverless
* Azure Container Apps with Azure SQL Database
* Google Cloud Run with CloudSQL

Pros:
* Serverless - no server management
* Scalability - automatically scales
* Cost effective - only pay for consumed resources

Cons:
* Less control of underlying infrastructure
* Designed for stateless workloads so need to plan ahead

### Container Orchestration Services
Another approach for this kind of application would be to utilise Container Orchestration Servcies - usually based on Kubernetes. This is often considered a half-way house between serverless and hosting on self managed VMs. Therefore, there are more options in terms of fine tuning, flexibility and the option to add statefulness to certain applications. The trade-off here is that it is more complex to set up and maintain versus serverless. And, since this application is so simple, I would start off with a serverless approach, and migrate over to a container orchestration service if the business case arose. Another caveat to think about is that while it is possible to run databases in these services, unless absolutely needed, it is recommended to instead use other dedicated database services such as the managed options stated previously. Here are some options for each main cloud service provider:
* Amazon ECS (Elastic Container Service) or EKS (Elastic Kubernetes Service)
* Azure Container Instances (ACI) or Azure Kubernetes Service (AKS)
* Google Kubernetes Engine (GKE)

Pros:
* Scalability - can be configured to scale automatically
* Managed infrastructure - underlying infrastructure is managed by the cloud provider
* Rich ecosystem - Kubernetes in particular is widely used and benefits from this

Cons:
* Complexity - can be more complex to set up
* Cost - if not specified efficiently, costs can be higher than serverless

### Continuous Integration and Continuous Deployment (CI/CD)
Since both of these options involve containerising the frontend and backend code, the CI/CD pipelines would look fairly similar. Here is an example pipeline process for how these services might be deployed:
1. Unit test - make sure all unit tests are passing
2. Build image - build the image based on the Dockerfile
3. Service level tests - Start up and run tests involving other services. A docker compose file would be useful here
4. Push image - push the image to the relevant artifact/container registry
5. Deploy to Dev environments - manual tests can be run in the Dev environment
6. Promote to Test/Pre-prod environment - automatically run thorough tests involving other key areas of infrastructure to minimise breaking changes
7. Security scan - Scan the container for vulnerabilities. Depending on existing cloud set up, this could be done at an earlier stage. This would be automatically carried out before promotion to production.
8. Promote to production environment - go-live. Alerts and monitoring should be set up for each environment for maximum observability

The two main options I would recommend for this pipeline would be Github Actions and GitLab Runners. This is because they are widely used and very flexible.

### Self managed VMs
Arguably, the simplest option to deploy this particular application to the cloud would be to rent a cloud provided Virtual Machine (VM), set up Docker and Docker Compose on the machine, transfer the code and docker-compose.yaml file and deploy as you would on your local machine.

Pros:
* Familiarity - similar set up to local machine
* Control - full control of the VM Operating System and software

Cons:
* Management overhead - the user is fully responsible for patching, scaling and ensuring high availiability
* Less cloud native - doesn't leverage the main benefits of migrating to the cloud
* Security concerns - this approach will make it harder to maintain a secure service when opening up traffic to the internet. Other services come out of the box with better security solutions

There are myriad ways to deploy applications to the cloud but since the scope of this application is quite small, these are the main options I would consider.