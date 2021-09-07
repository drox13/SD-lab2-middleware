
# crea una variable que representa el archivo
COUNTER_FILE="counter.txt"

#leo el archivo
count=`cat $COUNTER_FILE`

#creo el contenedor
docker run -d --name instancia$count -p 400$count:4000 --net mynet --ip 119.18.0.$count instanciasimg

#incremento el contador
((count++))

#escribo en el archivo
echo $count > $COUNTER_FILE