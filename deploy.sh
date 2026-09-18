#!/bin/bash

set -e

APP_DIR="/home/ubuntu/transdoo"
REPO_URL="https://github.com/codebydeep/transdoo.git"
BRANCH="dev"
APP_USER="ubuntu"

echo "=========================================="
echo "TransDoo Deployment Started"
echo "=========================================="

sudo apt-get update -y

if command -v docker >/dev/null 2>&1; then
    echo "Docker is already installed"
else
    echo "Installing Docker"

    sudo apt-get install -y \
        ca-certificates \
        curl \
        gnupg

    sudo install -m 0755 -d /etc/apt/keyrings

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
        | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
      | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update -y

    sudo apt-get install -y \
        docker-ce \
        docker-ce-cli \
        containerd.io \
        docker-buildx-plugin \
        docker-compose-plugin

    echo "Docker installed"
fi

if docker compose version >/dev/null 2>&1; then
    echo "Docker Compose is available"
else
    echo "Installing Docker Compose"

    sudo apt-get update -y
    sudo apt-get install -y docker-compose-plugin

    echo "Docker Compose installed"
fi

if command -v git >/dev/null 2>&1; then
    echo "Git is already installed"
else
    echo "Installing Git"

    sudo apt-get install -y git

    echo "Git installed"
fi

sudo systemctl enable docker
sudo systemctl start docker

if [ -d "$APP_DIR/.git" ]; then
    echo "Application already exists"

    cd "$APP_DIR"

    sudo -u "$APP_USER" git fetch origin
    sudo -u "$APP_USER" git checkout "$BRANCH"
    sudo -u "$APP_USER" git reset --hard "origin/$BRANCH"
else
    echo "Cloning application"

    sudo -u "$APP_USER" git clone \
        --branch "$BRANCH" \
        "$REPO_URL" \
        "$APP_DIR"

    cd "$APP_DIR"
fi

echo "Docker version:"
sudo docker --version

echo "Docker Compose version:"
sudo docker compose version

cd "$APP_DIR"

echo "Building and starting containers"

sudo docker compose up --build -d

echo ""
echo "Container Status:"
echo "------------------------------------------"

sudo docker compose ps

echo ""
echo "=========================================="
echo "TransDoo Deployment Completed"
echo "=========================================="