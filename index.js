const { pause } = require("../04-tareas-consola/helpers/mensajes");
const {
  leerInput,
  inquirerMenu,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("dotenv").config();

const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();
    if (opt !== "0");
    switch (opt) {
      case "1":
        // Mostrar mensaje
        const lugar = await leerInput("Ciudad: ");
        // Buscar los lugares
        const lugares = await busquedas.ciudad(lugar);
        const id = await listarLugares(lugares);
        if (id === "0") continue;

        // Seleccionar el lugar
        const lugarSele = lugares.find((lugar) => {
          return lugar.id === id;
        });

        // Guardar en DB
        busquedas.agregarHistorial(lugarSele.nombre);
        // Clima
        const clima = await busquedas.climaLugar(lugarSele.lat, lugarSele.lng);
        // Mostrar resultados
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad:", lugarSele.nombre);
        console.log("Lat:", lugarSele.lat);
        console.log("Lng:", lugarSele.lng);
        console.log("Tempertura:", clima.temp);
        console.log("Minima:", clima.temp_min);
        console.log("Maxima:", clima.temp_max);
        console.log("¿Como esta el dia?:", clima.description);

        await pause();
        break;
      case "2":
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        await pause();
        break;
      case "0":
        console.clear();
        console.log("Fin de la ejecucion del programa");
        break;
    }
  } while (opt !== "0");
};

main();
