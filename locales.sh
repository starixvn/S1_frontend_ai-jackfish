#!/bin/sh
# 目前既有品牌
SITE_LIST=(common)

# READ
echo "選擇品牌(單選、複選)"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done

read -p ": " site
siteList=($(echo "$site" | tr ' ' '\n'))

node sheet/SheetSort.js $site
node sheet/SheetToJson.js $site

echo "update locales done."
