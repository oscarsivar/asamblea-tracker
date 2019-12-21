## #Technical_Stuff

At this time, you can access an early version of this website by clicking in this [link](http://149.28.67.188:3000/).

If you are a developer and want to help with this project, first of all, thank you very much. Any suggestion is very welcome. I'll have an eye on the Pull Requests sections.

### #Run_Forrest_Run

This project is built on top of the popular Javascript framework [Next.js](https://nextjs.org/). NextJS is a server-side implementation of the well-known library, [ReactJS](https://reactjs.org/). For deployment in Production, I use [Docker](https://www.docker.com/).

There's still one requirement. When I started the platform, it was very easy for me of creating an online data base provider, [mlab.com](https://mlab.com/login/). At this moment, I recommend working this way. Although, you are free of installing mongodb locally (or through Docker).

When you've created the database (no collection is necessary, the system will do it on its own). You need to create a .env file with the following variables, in the root of the project:

    //.env
    MONGO_USER=nombre_de_usuario_a_db
    MONGO_PASS=password_de_usuario_a_db
    MONGO_DB=nombre_de_db
    MONGO_HOST=host_name_o_dirección_ip
    MONGO_PORT=puerto_de_mongo

You are ready! you can simply execute (windows users may need to install [win-node-env](https://www.npmjs.com/package/win-node-env)):

    ~> npm run dev

![npm run dev](./assets/npm.run.dev.png)

Also, if you are a Visual Studio Code user, you can take a look at the pre-configured debugging launchers.

![npm run dev](./assets/debug.tools.png)
