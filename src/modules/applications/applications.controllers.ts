import { FastifyReply, FastifyRequest } from "fastify";
import { CreateApplicationBody } from "./applications.schemas";
import { createApplication, getApplications } from "./applications.services";
import { createRole } from "../roles/roles.services";
import { All_PERMISSIONS, SYSTEM_ROLES, USER_ROLE_PERMISSIONS } from "../../config/permissions";

/**
 * Handler for creating a new application.
 * @param request - FastifyRequest containing request data.
 * @param reply - FastifyReply for sending the response.
 * @returns An object containing the created application.
 */
export async function createApplicationHandler(
    request: FastifyRequest<{
        Body: CreateApplicationBody
    }>, reply: FastifyReply
){

    // Extract the 'name' field from the request body.
    const { name } = request.body

    // Call the 'createApplication' service function to create the application.
    const application = await createApplication({ name })


    const superAdminRolePromise =  createRole({
        applicationId: application.id, 
        name: SYSTEM_ROLES.SUPER_ADMIN,
        permissions: All_PERMISSIONS as unknown as Array<string>, 

    })

    const applicationUserRolePromise  =  createRole({
        applicationId: application.id, 
        name: SYSTEM_ROLES.APPLICATION_USER,
        permissions: USER_ROLE_PERMISSIONS,
    })


    const [superAdminRole, applicationUserRole ] = await Promise.allSettled(
        [
            superAdminRolePromise,
            applicationUserRolePromise,
        ]
    )


    if (superAdminRole.status === "rejected" ){
        throw new Error("Error creating super admin role")
    }

    if (applicationUserRole.status === "rejected" ){
        throw new Error("Error creating application user role")
    }

    // Return the created application as a response.
    return {
        application,
        superAdminRole: superAdminRole.value, 
        applicationUserRole: applicationUserRole.value
    }
}




export async function getApplicationHandler(){
    return  getApplications( )
}