#!/bin/bash
# ------------------
# 线上静态部署脚本
#
# @history
#
# ------------------

WORKSPACE=`pwd`
DIRNAME=`dirname $0`

export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

NVM_HOME=~/.nvm
PORJECT_HOME=`pwd`

if [ ! -d $NVM_HOME ]; then
  git clone https://github.com/creationix/nvm.git $NVM_HOME && cd $NVM_HOME && git checkout `git describe --abbrev=0 --tags` && cd $PORJECT_HOME
fi

source ~/.nvm/nvm.sh
nvm install 5.0
nvm use 5.0

# 安装npm依赖
npm install --registry=http://r.npm.sankuai.com --save-dev

if [ $? -eq 0 ]; then
   echo -e "npm依赖包加载完成"
else
   echo -e "npm依赖包加载失败"
   exit 1;
fi