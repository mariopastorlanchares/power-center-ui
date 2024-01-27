const fs = require('fs');

// En Netlify inserta todas estas variables de entorno
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

const environmentContent = `
export const environment = {
  production: false,
  firebaseConfig: ${JSON.stringify(firebaseConfig, null, 2)}
};
`;
console.log('Escribiendo en environment.ts:', environmentContent);

fs.writeFileSync('./src/environments/environment.ts', environmentContent);
console.log('Archivo environment.ts generado con éxito');