import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import { LoginBody, CreateUserBody, AssignRoleToUserBody } from "./users.schemas";
import {getRoleByName} from "./../roles/roles.services"
import {SYSTEM_ROLES} from "./../../config/permissions"
import { assignRoleToUser, createUser, getUserByEmail, getUsersByApplication } from "./users.services";
import { users } from "../../db/schema";
import { logger } from "../../utils/logger";


export async function createUserHandler(
    request: FastifyRequest<{Body:CreateUserBody}>, reply: FastifyReply
){

    const {initialUser, ...data} = request.body
    
    const roleName = initialUser ? SYSTEM_ROLES.SUPER_ADMIN: SYSTEM_ROLES.APPLICATION_USER


    if (roleName === SYSTEM_ROLES.SUPER_ADMIN){
        const appUsers = await getUsersByApplication(data.applicationId) 
        if (appUsers.length > 0){
            return reply.code(400).send(
                {
                    message: "Application already has super admin user",
                    extensions: {
                        code: "APPLICATION_ALREADY_SUPER_USER",
                        applicationId: data.applicationId
                    }
                }   
            )
        }
        
    }    


    // Check if the application and role does exist 
    const role = await getRoleByName({
        name: roleName, 
        applicationId: data.applicationId,
    });


    if (!role){
        return reply.code(404).send({
            message: "Role not found" 
        })
    }


    try {
        const user = await createUser(data);

        // assign a role to the user 
        await assignRoleToUser({
            userId: user.id,
            roleId:  role.id,
            applicationId: data.applicationId
        })

        return user 
        
    }catch(e){
        throw Error(e as string)
    }
}

export async function loginHandler(request: FastifyRequest<{Body: LoginBody}>, reply: FastifyReply) {
  const {applicationId, email, password} = request.body

   const user = await getUserByEmail({
    applicationId, 
    email
   })

   if(!user){
     return reply.code(400).send({
        message: "Invalid email or password"
     })
   }

    const  token = jwt.sign({
        id: user.id,
        applicationId, 
        email, 
        scopes: user.permissions

    }, "secret") // change this secret  or signing method, or get 

    return {token};
}


export async function assignRoleToUserHandler(
    request: FastifyRequest<{Body: AssignRoleToUserBody}>, reply: FastifyReply   
){

  try{
    const {userId, roleId, applicationId} = request.body 

    const result = await assignRoleToUser({
        userId, 
        applicationId, 
        roleId
    })

    return result
  }catch(e){
    logger.error(e, "error assigning role to user")
    return reply.code(400).send({
        "message": "could not assign role to user"
    })
  }
}