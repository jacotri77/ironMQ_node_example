FROM iron/node

WORKDIR /app
ADD . /app

ENTRYPOINT ["node", "node_example.js"]