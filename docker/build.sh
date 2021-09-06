docker build -t instanciasimg .
docker network create --subnet=119.18.0.0/16 mynet

docker run -d --name instancia2 -p 4002:4000 --net mynet --ip 119.18.0.2 instanciasimg
docker run -d --name instancia3 -p 4003:4000 --net mynet --ip 119.18.0.3 instanciasimg