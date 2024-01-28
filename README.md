# EventCanvas

## 📄 Descripción

Este repositorio contiene los recursos de una aplicación web para la interacción con diversas APIs, gestión de usuarios, integración de MapBox, FullCalendar y Chart.js. La aplicación implementa un sistema CRUD completo para usuarios, almacenando todos los datos generados por la API correspondiente. Además, se han creado múltiples categorías de marcadores con sus respectivos filtros, proporcionando una experiencia rica y personalizada para los usuarios. También se ha implementado un CRUD para la gestión de eventos, completando así la funcionalidad integral de la aplicación.


## ✨ Características 

- **API en Node.js:** La aplicación cuenta con una API desarrollada en Node.js.

- **Gestion de usuarios:** Implementación de un sistema CRUD (Crear, Leer, Actualizar, Eliminar usuarios).

- **Mapa Interactivo con MapBox:** Utilización de MapBox para crear un mapa interactivo donde los usuarios pueden explorar y almacenar ubicaciones con latitud y longitud.

- **Calendario Dinámico con FullCalendar:** Integración de FullCalendar para ofrecer un calendario dinámico, permitiendo a los usuarios agregar, modificar y eliminar eventos de manera intuitiva.

- **Gráficos Interactivos con Chart.js:** Utilización de Chart.js para representar datos de manera visual a través de gráficos interactivos, como gráficos de barras y gráficos lineales.


## ☁️ Interacción con la API "EventCanvas"

Este proyecto se integra con la API [EventCanvas](https://github.com/Yul1b3th/eventcanvas-backend) para gestionar la información de los usuarios. Esta API, construida con Node.js, Express y MySQL, proporciona una serie de endpoints que permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los usuarios.

La API sigue los principios de una arquitectura RESTful, lo que facilita su integración y uso. Puedes explorar la [documentación](https://github.com/Yul1b3th/eventcanvas-backend) para conocer más detalles sobre los endpoints disponibles, los métodos HTTP que soportan y la estructura de los datos que devuelven.


## 💻 Tecnologías Utilizadas

- HTML5
- SCSS
- TypeScript
- [Bootstrap](https://getbootstrap.com/) version 5.3.2.
- [Angular CLI](https://angular.dev/) version 17.0.10.
- [Angular Material](https://material.angular.io/) version 17.1.0.
- [Mapbox](https://www.mapbox.com/)
- [FullCalendar](https://fullcalendar.io/docs/angular)
- [Chart.js](https://www.chartjs.org/docs/latest/)

## 📋 Requisitos

- Node.js y npm instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
- Angular CLI instalado globalmente. Puedes instalarlo con el siguiente comando:

```bash
npm install -g @angular/cli
```

## 🛠️ Instalación
**✔️ Paso 1:** Levanta el servidor de base de datos, utilizando XAMPP u otra herramienta similar. Importa la base de datos utilizando el archivo **_eventcanvas.sql_**.


**✔️ Paso 2:** Levanta el servidor [EventCanvas](https://github.com/Yul1b3th/eventcanvas-backend)


**✔️ Paso 3:** Clona el repositorio:
```bash
git clone https://github.com/Yul1b3th/eventcanvas.git
```

**✔️ Paso 4:** Ingresa al directorio del proyecto:
```bash
cd eventcanvas
```

**✔️ Paso 5:** Copia el archivo **_.env.template_** y renómbralo como **_.env_**. Este archivo contendrá las variables de entorno necesarias para la configuración del proyecto.


**✔️ Paso 7:** Abre el archivo **_.env_** y completa las variables de entorno según las especificaciones proporcionadas en el archivo. Asegúrate de incluir la clave de acceso de MapBox u otras credenciales sensibles sin compartirlas en repositorios públicos.


**✔️ Paso 7:** Instala las dependencias:
```bash
npm install
```


## ▶️ Ejecución
Ejecuta la aplicación con el siguiente comando:
```bash
npm start
```

## 🌐 Despliegue

Para desplegar la aplicación en producción, sigue estos pasos:

**✔️ Paso 1:** Ejecuta el comando de construcción para compilar la aplicación Angular:
```bash
ng build --prod
```

**✔️ Paso 2:** Los archivos generados se almacenarán en el directorio `dist/`. Puedes desplegar estos archivos en un servidor web o en un servicio de alojamiento que admita aplicaciones web estáticas.


## 🤝 Contribuciones

Si deseas colaborar en este proyecto o informar sobre problemas, no dudes en crear un "issue" o enviar un "pull request."


