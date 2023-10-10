const { resolve } = require("path");
const readline = require("readline");
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});

const tareas = [];

function agregarTarea() {
    console.clear();
    return new Promise ((resolve)=>{
        rl.question("Descripción de la tarea: ", (descripcion) => {
            const tarea = {
            indicador: tareas.length + 1,
            descripcion,
            completada: false,
            };
            tareas.push(tarea);
            console.log(`Tarea agregada: ${descripcion}`);
            /* mostrarMenu(); */
            resolve();
        });
    });
}

function eliminarTarea() {
    console.clear();
    return new Promise ((resolve)=>{
        rl.question("Indicador de la tarea a eliminar: ", (indicador) => {
        const tareaIndex = tareas.findIndex(
        (tarea) => tarea.indicador === parseInt(indicador)
        );
        if (tareaIndex !== -1) {
        tareas.splice(tareaIndex, 1);
        console.log(`Tarea ${indicador} eliminada.`);
        } else {
        console.log(`No se encontró una tarea con el indicador ${indicador}.`);
        }
        /* mostrarMenu(); */
        resolve();
    });
});
}

function completarTarea() {
    console.clear();
    return new Promise ((resolve)=>{
        rl.question("Indicador de la tarea completada: ", (indicador) => {
        const tarea = tareas.find((t) => t.indicador === parseInt(indicador));
        if (tarea) {
        tarea.completada = true;
        console.log(`Tarea ${indicador} marcada como completada.`);
        } else {
        console.log(`No se encontró una tarea con el indicador ${indicador}.`);
        }
        /* mostrarMenu(); */
        resolve();
    });
  });
}

function mostrarTareas() {
    console.clear();
console.log("Lista de tareas:");
tareas.forEach((tarea) => {
    console.log(
    `[${tarea.indicador}] ${tarea.descripcion} - ${
        tarea.completada ? "Completada" : "Pendiente"
    }`
    );
});
mostrarMenu();
}

function mostrarMenu() {

    console.log("=====================");
    console.log(" Seleccionar opcion ");
    console.log("=====================\n");

    console.log(`${ '1.' } Crear Tarea`);
    console.log(`${ '2.' } Eliminar Tarea`);
    console.log(`${ '3.' } Completar Tarea(s)`);
    console.log(`${ '4.' } Mostrar Tarea(s)`);
    console.log(`${ '5.' } Salir\n`);


rl.question("Seleccione una opción: ", async (opcion) => {
    switch (opcion) {
    case "1":
        await agregarTarea();
        mostrarMenu();
        break;
    case "2":
        await eliminarTarea();
        mostrarMenu();
        break;
    case "3":
        await completarTarea();
        mostrarMenu();
        break;
    case "4":
        mostrarTareas();
        break;
    case "5":
        rl.close();
        break;
    default:
        console.log("Opción no válida. Intente de nuevo.");
        mostrarMenu();
        break;
    }
});
}

console.log("Lista de tareas Node\n");

mostrarMenu();