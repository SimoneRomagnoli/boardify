#!/bin/bash
docker build -t nodejsboardify .
docker run -itd --name nodejsboardify -p 3000:3000 nodejsboardify
