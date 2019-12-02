# Vista ciudadana para la Asamblea Legíslativa

¡Hey! ¿Qué tal? Qué bueno que te pasas por aquí. Déjame contarte de qué va esta aplicación.

## #Justificación

Un par de amigos y yo, constantemente estamos debatiendo y/o discutiendo sobre la realidad política, económica y social de nuestro país. Hace un par de meses, decidimos llevar la discusiones al [internet](http://bit.ly/33FknZA), cómo todo buen millennial.

En una de esas tantas discusiones, me dí cuenta que:

El derecho al acceso a la información pública del gobierno, aunque protegido en la leyes, su implementación tiene un amplio rango de mejora. ¿Alguna vez quisieron ver el resumen de las votaciones de los diputados en una jornada legíslativa? ¿O conocer qué leyes se debatieron en el último mes? ¿Las qué se debatirán? ¿Sí?

Si se han hecho esas preguntas, seguramente conocen esta [sitio web](https://www.asamblea.gob.sv). Sí, esa es la página oficial de la Asamblea Legíslativa de la República de El Salvador. La información que ahí se presenta es muy valiosa pero la manera en que se presenta es muy desalentadora.

Es por eso que decidí crear esta herramienta. Cómo una manera de facilitar el acceso a la información pública. Empezando por conocer de una manera más intuitiva el trabajo que los empleados públicos realizan en la Asamblea Legíslativa.

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

Ahora sí, ya que tienes la base de datos lista, puedes simplemente ejecutar:

    ~> npm run dev

![npm run dev](./assets/npm.run.dev.png)

Also, if you are a Visual Studio Code user, you can take a look at the pre-configured debugging launchers.

![npm run dev](./assets/debug.tools.png)
