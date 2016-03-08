export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

NVM_HOME=~/.nvm
PORJECT_HOME=`pwd`

if [ ! -d $NVM_HOME ]; then
  git clone https://github.com/creationix/nvm.git $NVM_HOME && cd $NVM_HOME && git checkout `git describe --abbrev=0 --tags` && cd $PORJECT_HOME
fi

source ~/.nvm/nvm.sh
nvm install 5.0
nvm use 5.0

if [ ! -z $( npm list -g | grep pm2 ) ]; then
  npm i pm2 -g
fi

pm2 kill
pm2 start app.js