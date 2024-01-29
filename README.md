# Power Center UI

Proyecto para mostrar información de carga de inversores de placas solares con gráficas molonas.

## Versiones

- Ionic 7.0.0
- Angular 17
- Node 20^

**Nota**: si manejas varias versiones de npm usa

```
nvm use v20.3.0
```

## Preparación de la instalación de desarrollo

### Instalación de NodeJS:

Para instalar NodeJS, visita [Node.js Official Website](https://nodejs.org/en) y descarga la versión recomendada.

### Instalación de Ionic:

Para instalar Ionic, ejecuta el siguiente comando en tu terminal:

```
npm install -g @ionic/cli
```

### Configuración de Firebase:

Antes de levantar el proyecto, es necesario configurar tus credenciales de Firebase. Estas credenciales ahora se manejan
mediante un archivo JSON separado para una mejor gestión y seguridad. Sigue estos pasos para configurarlo:

1. Crea un archivo llamado `firebase-config.json` en el directorio `/src`.

2. Ve a la [Firebase Console](https://console.firebase.google.com/) y selecciona tu proyecto.

3. Haz clic en el icono de engranaje y selecciona "Configuración del proyecto".

4. Desplázate hacia abajo hasta "Tus aplicaciones" y selecciona tu aplicación web (o regístrala si aún no lo has hecho).

5. Copia la configuración de Firebase que aparece y reemplaza los valores correspondientes en tu
   archivo `firebase-config.json`. El archivo debería tener una estructura similar a esta:

   ```json
   {
     "apiKey": "YOUR_API_KEY",
     "authDomain": "YOUR_AUTH_DOMAIN",
     "databaseURL": "YOUR_DATABASE_URL",
     "projectId": "YOUR_PROJECT_ID",
     "storageBucket": "YOUR_STORAGE_BUCKET",
     "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
     "appId": "YOUR_APP_ID",
     "measurementId": "YOUR_MEASUREMENT_ID"
   }

### Levantar el proyecto:

Para iniciar el servidor de desarrollo y ver tu proyecto, ejecuta:

```
ionic serve
```

## Despliegue en Netlify

### Configuración de Variables de Entorno:

Para desplegar tu proyecto en Netlify, necesitas configurar las variables de entorno relacionadas con Firebase. Sigue
estos pasos:

1. Ve a la configuración de tu proyecto en Netlify.
2. Navega a "Settings" > "Build & deploy" > "Environment".
3. Configura las siguientes variables de entorno:

- `FIREBASE_API_KEY`: Tu apiKey de Firebase.
- `FIREBASE_AUTH_DOMAIN`: Tu authDomain de Firebase.
- ... (y así sucesivamente para las otras claves de configuración de Firebase).

**Nota**: Para desplegar tu proyecto en Netlify se utiliza un script para crear las variables de
Firebase en el archivo firebase-config.json durante el proceso de construcción. Asegúrate de que el archivo set-env.js
esté configurado correctamente y de que todas las variables de entorno necesarias estén definidas en la configuración de
tu proyecto en Netlify.
