# Multi Tenant Role Based Access Control (RBAC) Authentication API

## Multi-Tenant User-Role-Based Application

This is a multi-tenant user-role-based application written in Node.js, TypeScript, Fastify, PostgreSQL, and JWT. It allows you to create and manage multiple tenants, users, and roles. Each tenant is isolated from the others, and users can only access the resources of the tenant to which they belong.

## Data structure 
!["data structure"](imgs/role_base_api_ds.png)

## App structure 
!["app structure"](imgs/router.png)



## Features 
- __Multi-tenancy__: Each tenant has its own database schema and data.
- __User roles__: Users can be assigned to different roles, each with its own permissions.
- __JWT authentication__: Users are authenticated using JWT tokens.
- __Fastify__: Fastify is a high-performance web framework for Node.js.
- __TypeScript__: TypeScript is a superset of JavaScript that adds type safety and other features.
- __PostgreSQL__: PostgreSQL is a powerful and reliable relational database management system.

## Technology used
- Dizzle ORM 
- Fastify 
- PostgresSQL
- TypeScript 


### How to use

1. Clone the repository.
2. Install the dependencies:
```sh
    npm install
```
3. Create a ``.env`` file with the following contents:
```
    DATABASE_CONNECTION=postgres://********:*********8*@ep-fragrant-dream-75256343-pooler.us-east-1.aws.neon.tech/neondb
    JWT_SECRET=secret
``````

4. Start the server:
```sh
    npm run dev
```
The server will be running on port 3000.


# Conclusion

This multi-tenant user-role-based application is a powerful and flexible tool for managing multiple tenants, users, and roles. It is built using modern technologies and is easy to use.