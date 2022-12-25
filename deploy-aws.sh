echo "Killing UI Server"
pm2 stop 1

echo "Using NVM 12.18.3"
nvm use 12.18.3

echo "Changing Directory to UI"
cd areen-ui

echo "Pulling from git"
git pull

echo "Installing dependencies"
npm install

echo "Starting server"
npm run start:prod

echo "Script Done"
