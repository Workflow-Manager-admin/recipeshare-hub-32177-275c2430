#!/bin/bash
cd /home/kavia/workspace/code-generation/recipeshare-hub-32177-275c2430/recipe_frontend_workspace/recipe_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

