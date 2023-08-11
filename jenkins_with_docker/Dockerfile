# Use the official Jenkins LTS (Long-Term Support) base image
FROM jenkins/jenkins:lts

# Switch to the root user to install packages
USER root

# Allow Jenkins user to write to /var/jenkins_home directory
RUN chown -R jenkins:jenkins /var/jenkins_home

# Install dependencies and the Docker CLI
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh

# Give the Jenkins user permission to access the Docker socket
RUN usermod -a -G docker jenkins

# Switch back to the Jenkins user
# USER jenkins
