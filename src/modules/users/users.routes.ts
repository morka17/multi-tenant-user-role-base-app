import { FastifyInstance } from "fastify";
import { assignRoleToUserHandler, createUserHandler, loginHandler } from "./users.controllers";
import { AssignRoleToUserBody, LoginJsonSchema, assignRoleToUserJsonSchema, createUserJsonSchema } from "./users.schemas";
import { PERMISSIONS } from "../../config/permissions";


export async function usersRoutes(app: FastifyInstance) {
    app.post("/", { schema: createUserJsonSchema, }, createUserHandler )

    app.post(
        "/login", 
        { 
            schema: LoginJsonSchema, 
        },
        loginHandler
    )

    app.post<{
        Body: AssignRoleToUserBody
    }>(
        "/roles", 
        { 
            schema: assignRoleToUserJsonSchema, 
            preHandler: [app.guard.scope(PERMISSIONS["users:roles:write"])]
        },
        assignRoleToUserHandler
    )

    
}