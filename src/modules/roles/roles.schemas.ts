import { z } from "zod";
import {zodToJsonSchema} from "zod-to-json-schema"
import {All_PERMISSIONS} from "./../../config/permissions"




const createRoleBodySchema = z.object({
    name: z.string(),
    permissions: z.array(z.enum(All_PERMISSIONS)),
    applicationId: z.string().uuid(),
});


export type CreateRoleBody = z.infer<typeof createRoleBodySchema>
export const createRoleJsonSchema = {
    body: zodToJsonSchema(createRoleBodySchema, "createRoleBodySchema")
}
