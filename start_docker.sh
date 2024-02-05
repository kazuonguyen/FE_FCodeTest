#!/bin/bash

name="logistics_deligent_fe"
image="khiemledev/logistics_deligent_fe"

docker stop ${name}
docker rm ${name}

docker run -d \
    --restart always \
    -p 30001:3001 \
    --env-file ./.env.local \
    --name ${name} \
    ${image}
