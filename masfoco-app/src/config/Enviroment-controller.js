const port = process.env.PORT;
function checkPortEnv() {
    if (!port || port.trim() === "") {
      console.error(
        "La variable de entorno PORT no está definida en el archivo .env o está vacía."
      );
      process.exit(1);
    }
  }
 
  export {checkPortEnv}
  
  
  
  