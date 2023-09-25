## Install dependencies 
dependencies:
	yarn add argon2 drizzle-orm pg pino pino-pretty zenv  zod  jsonwebtoken  fastify-zod fastify-guard fastify


## Install dev dependencies 
dev-dependencies:
	yarn add zod-to-json-schema @types/jsonwebtoken typescript tsx drizzle-kit @types/pg -D



# Initialize Typescript 
tsc-init:
	yarn tsc --init 

# Run migrations 
run-migrate:
	yarn run migrate


# Run application
run:
	yarn run dev 