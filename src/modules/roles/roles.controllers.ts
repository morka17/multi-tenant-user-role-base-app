import { FastifyReply, FastifyRequest } from "fastify";
import { CreateRoleBody } from "./roles.schemas";
import {createRole} from "./roles.services"

export async function createRoleHandler(
    request: FastifyRequest<{Body: CreateRoleBody}>,
    reply: FastifyReply
) {
    
    const {name, permissions, applicationId} = request.body

    const role = await createRole({
        name, permissions, applicationId,
    })

    return role
}