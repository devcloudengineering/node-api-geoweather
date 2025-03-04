const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: "2",
        name: `${"2.".green} Historial`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log(`=========================`.green);
  console.log(` Seleccione una opcion `.green);
  console.log(`=========================\n`.green);

  const { option } = await inquirer.prompt(preguntas);
  return option;
};

const pausa = async () => {
  const question = {
    type: "input",
    name: "enter",
    message: `Presione ${"enter".green} para continuar`,
  };

  console.log("\n");

  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Porfavor ingresa un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, index) => {
    const idx = `${String(index + 1)}`;
    return {
      value: lugar.id,
      name: `${String(idx + ".").green} ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${String(0 + ".").green} Cancelar`,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${String(index + 1)}`;
    return {
      value: tarea.id,
      name: `${String(idx + ".").green} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoCheckList,
};
