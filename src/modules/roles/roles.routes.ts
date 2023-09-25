import { FastifyInstance } from "fastify";
import { CreateRoleBody, createRoleJsonSchema } from "./roles.schemas";
import { createRoleHandler } from "./roles.controllers";
import { PERMISSIONS } from "../../config/permissions";


export async function roleRoutes(app:FastifyInstance) {
    
    app.post<{
        Body: CreateRoleBody
    }>("/", {
        schema: createRoleJsonSchema,
        preHandler: [app.guard.scope([PERMISSIONS["roles:write"]])]
    }, createRoleHandler)




}