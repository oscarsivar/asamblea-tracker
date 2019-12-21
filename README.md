English version [here](./README.en.md).

## #Aspecto_Técnico

Por el momento, puedes acceder a la versión temprana de la plataforma haciendo click en este [enlace](http://149.28.67.188:3000/).

Si eres desarrollador y quieres aportar al proyecto, antes que nada, muchísimas gracias. Cualquier sugerencia es bienvenida. Estaré muy pendiente de las Pull Requests.

### #Run_Forrest_Run

El proyecto está construído haciendo uso del framework de desarrollo [Next.js](https://nextjs.org/). Es una implementación server-side muy bien realizada de la famosísima librería front-end de Facebook, [ReactJS](https://reactjs.org/). Para producción utilizo [Docker](https://www.docker.com/).

Sin embargo, hay un requerimiento más. Cuando empecé la plataforma, se me hizo muy fácil crear una base de datos de desarrollo en el sitio web [mlab.com](https://mlab.com/login/). Por el momento, es la manera que recomiendo. Sos libre de instalar una instancia de MongoDB en tu computadora o incluso extender la configuración de Docker.

Cuando ya tengas seteado la base de datos (no es necesario que crees ninguna collección. El sistema se encargará de ello automáticamente). Debes crear un archivo .env, en el root del proyecto, con las siguientes variables:

    //.env
    MONGO_USER=nombre_de_usuario_a_db
    MONGO_PASS=password_de_usuario_a_db
    MONGO_DB=nombre_de_db
    MONGO_HOST=host_name_o_dirección_ip
    MONGO_PORT=puerto_de_mongo

Ahora sí, ya que tienes la base de datos lista, puedes simplemente ejecutar
(Usuarios de Windows puede que necesiten instalar [win-node-env](https://www.npmjs.com/package/win-node-env)):

    ~> npm run dev

![npm run dev](./assets/npm.run.dev.png)

Also, if you are a Visual Studio Code user, you can take a look at the pre-configured debugging launchers.

![npm run dev](./assets/debug.tools.png)
