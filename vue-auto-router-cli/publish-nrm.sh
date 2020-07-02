#!/usr/bin/env bash
nrm use npm
echo '请进行登录相关操作：'
npm login # 登陆
echo "-------publishing-------"
npm publish # 发布
nrm use taobao # 设置为淘宝镜像
echo "发布完成"
exit