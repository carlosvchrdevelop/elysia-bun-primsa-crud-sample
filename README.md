# CRUD con Elysia + Bun + PrismaORM

## Preparación

El primer paso, si no lo hemos hecho con anterioridad, será instalar el runtime de Bun.

```bash
curl -fsSL https://bun.sh/install | bash
```

A continuación creamos un proyecto de Elysia.

```bash
bun create elysia ./elysia-example
```

Añadimos el plugin de swagger para autodocumentación

```bash
bun add @elysiajs/swagger
```

Y añadimos e iniciamos el ORM de Primsa.

```bash
bun add -d prisma
bun add @prisma/client
bunx prisma init
```

Por último, para la preparación, vamos a lanzar una instancia de Postgres en Docker.

```bash
docker volume create pg-vol
docker container run --name postgresdb -e POSTGRES_PASSWORD=postgres -dp 5432:5432 -v pg-vol:/var/lib/postgresql/data postgres:latest
```

Este comando creará una base de datos de Postgres con usuario: postgres, contraseña: postgres y la base de datos principal que tendrá el mismo nombre del usuario, es decir, postgres.

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

## Primera migración

Cuando inicializamos Prisma, se creó un archivo `prisma/schema.prisma` en el cual podemos definir la estructura de nuestra base de datos. Podemos agregar la siguiente definición al final del archivo:

```prisma
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String    @db.Text()
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

Y ejecutar la migración con el siguiente comando:

```bash
bunx prisma migrate dev --name create-post-model
```

## Development

Para desplegar el servidor de desarrollo y ver los resultados podemos ejecutar el siguiente comando.

```bash
bun run dev
```

Ahora navega a la ruta http://localhost:3000/ desde tu navegador.
