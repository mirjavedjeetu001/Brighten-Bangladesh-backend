#!/bin/bash

# Brighten Bangladesh Backend Startup Script for cPanel
# This script ensures the backend stays running

echo "Starting Brighten Bangladesh Backend..."

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Activate Node.js virtual environment (cPanel specific)
# Replace brighte1 with your actual cPanel username
if [ -d "$HOME/nodevenv/public_html/api/20/bin" ]; then
    source $HOME/nodevenv/public_html/api/20/bin/activate
fi

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Kill any existing Node.js processes for this app
pkill -f "node dist/main.js"
sleep 2

# Start the application
echo "Starting Node.js application..."

# Find node executable
NODE_BIN=$(which node 2>/dev/null || echo "$HOME/nodevenv/public_html/api/20/bin/node")

# Check if PM2 is available
if command -v pm2 &> /dev/null; then
    echo "Using PM2 to start application..."
    pm2 delete brighten-bangladesh-backend 2>/dev/null
    pm2 start ecosystem.config.js --env production
    pm2 save
    echo "Application started with PM2"
else
    echo "PM2 not found, starting with nohup..."
    nohup $NODE_BIN dist/main.js > logs/out.log 2> logs/err.log &
    echo $! > .pid
    echo "Application started with PID: $(cat .pid)"
fi

echo "Backend startup complete!"
echo "Check logs in: $DIR/logs/"
