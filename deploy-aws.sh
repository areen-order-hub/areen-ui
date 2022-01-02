echo "Killing UI Server"
pm2 stop 1

echo "Changing Directory to API"
cd hikers-ui

echo "Pulling from git"
git pull

echo "Starting server"
npm run start:prod

echo "Script Done"
