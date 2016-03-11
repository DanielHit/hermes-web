export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

NVM_HOME=~/.nvm
PORJECT_HOME=`pwd`

if [ ! -d $NVM_HOME ]; then
  git clone https://github.com/creationix/nvm.git $NVM_HOME && cd $NVM_HOME && git checkout `git describe --abbrev=0 --tags` && cd $PORJECT_HOME
fi

source ~/.nvm/nvm.sh
nvm install 5.0
nvm use 5.0

npm install

npm start app