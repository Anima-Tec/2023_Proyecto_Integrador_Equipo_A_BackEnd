import "dotenv/config";

function validatePort() {
  const port = process.env.PORT;

  if (!port || port.trim() === "") {
    console.error("Error: The PORT is undefined or null.");
    process.exit(1);
    }
    return port;
}

function validateDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || databaseUrl.trim() === "") {
    console.error("Error: The DATABASE_URL is undefined or null.");
    process.exit(1);
    }
    return databaseUrl;
}

function validateSecretKey() {
  const secret = process.env.SECRET_KEY;

  if (!secret || secret.trim() === "") {
    console.error("Error: The SECRET_KEY is undefined or null.");
    process.exit(1);
    }
    return secret;
}




export default { validatePort, validateDatabaseUrl, validateSecretKey };