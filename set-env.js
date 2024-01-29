const fs = require('fs');

// Recoger las variables de entorno para la configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Convertir la configuración de Firebase a un string en formato JSON
const firebaseConfigContent = JSON.stringify(firebaseConfig, null, 2);

// Escribir la configuración en el archivo firebase-config.json ubicado en el directorio src
fs.writeFileSync('./src/firebase-config.json', firebaseConfigContent);

// Mensaje de éxito
console.log('Archivo firebase-config.json generado con éxito');
