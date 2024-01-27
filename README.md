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

Antes de levantar el proyecto, es necesario configurar tus credenciales de Firebase en `/src/environments/environment.ts`. Para ello, sigue estos pasos:

1. Ve a la [Firebase Console](https://console.firebase.google.com/) y selecciona tu proyecto.
2. Haz clic en el icono de engranaje y selecciona "Configuración del proyecto".
3. Desplázate hacia abajo hasta "Tus aplicaciones" y selecciona tu aplicación web (o regístrala si aún no lo has hecho).
4. Copia la configuración de Firebase que aparece y reemplaza los valores correspondientes en tu archivo `environment.ts`:

```
export const environment = {
production: false,
firebaseConfig: {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
databaseURL: "YOUR_DATABASE_URL",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_STORAGE_BUCKET",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID"
}
};
```

### Levantar el proyecto:

Para iniciar el servidor de desarrollo y ver tu proyecto, ejecuta:

```
ionic serve
```

## Despliegue en Netlify

### Configuración de Variables de Entorno:

Para desplegar tu proyecto en Netlify, necesitas configurar las variables de entorno relacionadas con Firebase. Sigue estos pasos:

1. Ve a la configuración de tu proyecto en Netlify.
2. Navega a "Settings" > "Build & deploy" > "Environment".
3. Configura las siguientes variables de entorno:

- `FIREBASE_API_KEY`: Tu apiKey de Firebase.
- `FIREBASE_AUTH_DOMAIN`: Tu authDomain de Firebase.
- ... (y así sucesivamente para las otras claves de configuración de Firebase).

**Nota**: Encontrarás todas las variables a definir en el fichero set-env.js
