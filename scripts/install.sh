#!/bin/bash
# Navigate to the root directory of your project
cd "$(dirname "$0")/.."
# Remove node_modules and package-lock.json
echo "Cleaning up old node modules and package lock..."
rm -rf node_modules package-lock.json
# Run npm install
echo "Running npm install..."
npm install
# Ensure Husky hooks are set up properly
echo "Setting up Husky hooks..."
npx husky install
npx husky add .husky/pre-commit "npm run precommit"
# npx husky add .husky/pre-push "sh ./scripts/release.sh"
echo "Installation complete!"
