export const All_PERMISSIONS = [
    // roles 
    "roles:write",
    "roles:delete",
    "roles:read",

    // users
    "users:roles:write", // Allowed to add a role to a user 
    "users:roles:delete", // Allowed to remove from role to a user 


    // posts
    "posts:write", 
    "posts:read",
    "posts:delete",
    "posts:edit-own"

] as const;



export const PERMISSIONS = All_PERMISSIONS.reduce((acc, permission ) => {

    acc[permission] = permission;

    return acc;
}, {} as Record<(typeof All_PERMISSIONS[number]), (typeof All_PERMISSIONS)[number]>);



export const USER_ROLE_PERMISSIONS = [
    PERMISSIONS["posts:write"],
    PERMISSIONS["posts:read"],
]


export const SYSTEM_ROLES = {
    SUPER_ADMIN: "SUPER_ADMIN",
    APPLICATION_USER: "APPLICATION_USER",
}


