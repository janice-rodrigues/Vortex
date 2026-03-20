#!/bin/bash
cd "$(dirname "$0")"
echo "Adding files..."
git add .
echo "Committing..."
git commit -m "Contentstack integration, dynamic pages, Launch deployment"
echo "Pushing to GitHub..."
git push -u origin main
echo "Done!"
