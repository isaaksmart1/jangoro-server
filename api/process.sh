#!/bin/bash

APP_NAME="jangoro_ai"
SCRIPT_PATH="server.py"  # Change this to the entry point of your Flask app
PYTHON_CMD="python3"  # Change to 'python' if using Python 2 (not recommended)
LOG_DIR="logs"

# Ensure the logs directory exists
mkdir -p $LOG_DIR

# Start the Flask application with PM2
pm2 start $SCRIPT_PATH --name $APP_NAME --interpreter $PYTHON_CMD --log $LOG_DIR/pm2.log --error $LOG_DIR/pm2-error.log

# Save the PM2 process list
pm2 save

# Display PM2 status
pm2 status $APP_NAME
