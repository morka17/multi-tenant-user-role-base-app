import fastify from "fastify"
import guard from "fastify-guard"
import jwt from "jsonwebtoken"
import { logger } from "./logger"
import { applicationRoutes } from "../modules/applications/applications.routes"
import { usersRoutes } from "../modules/users/users.routes"
import {  roleRoutes } from "../modules/roles/roles.routes"



type User = {
    id: string
    scopes: Array<string>
}

declare module "fastify" {
    interface FastifyRequest{
        user: User
    }
}


export async function buildServer(){
    const app = fastify({
        logger: logger,
    })

    app.decorateRequest("user", null)

    app.addHook("onRequest", async function(request, reply) {
        const authHeader = request.headers.authorization
        if (!authHeader){
            return;
        }

        try {
            const token = authHeader.replace('Bearer ', '')
            const decoded = jwt.verify(token, "secret");
            request.user = decoded as User;
        } catch(e){}
        
    })

    // Register plugins 
    app.register(guard, {
        requestProperty: "user",
        scopeProperty: "scopes",
        errorHandler: (result, request, reply) => {
            return reply.send("You cannot do that")
        }
    })

    // Register router 
    app.register(applicationRoutes, {prefix: "/api/applications"})
    app.register(usersRoutes, {prefix: "/api/users"})
    app.register(roleRoutes, {prefix: "/api/roles"})


    return app
}