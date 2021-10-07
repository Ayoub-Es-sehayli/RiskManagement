FROM centos:latest
LABEL Name=app
RUN dnf update -y
RUN dnf install -y dotnet-sdk-5.0 nodejs npm git
RUN npm install -g yarn
RUN useradd -m vscode;
USER vscode
RUN dotnet tool install --global dotnet-ef