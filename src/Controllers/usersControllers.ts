import { addDocumentToCollection, getAllDataFromCollectionWithWhereArrayContains, getDataFromCollectionWithWhereArray, updateDocumentToCollection } from "../Firebase/firebaseFunctions";

import { COLLECTIONS } from "@/Firebase/collections";

export const createUser = async (email: string, name: string, uid: string): Promise<string | void> => {
    try {
        const user = { email, name, uid, postsIds: [], authProvider: "local" }
        const createdUserId = await addDocumentToCollection(COLLECTIONS.USERS, user);
        return createdUserId
    } catch (error) {
        console.log('Error On createUser()', error)
    }
};

export const updateUser = async (userId: string, dataToUpdate: any):Promise<void> => {
    try {
        await updateDocumentToCollection(COLLECTIONS.USERS,userId, {...dataToUpdate})
    } catch (error) {
        console.log("Error On updateuser()", error);
    }
}

export const getUserByUid = async (uid: string) => {
    try {
        const user = await getDataFromCollectionWithWhereArray(COLLECTIONS.USERS, { property: "uid", propertyValue: uid}, "uid");
        return user
    } catch (error) {
        console.log('Error On getUserByUId()', error)
    }
};

export const getUserByPostId = async (postId: string) => {
    try {
        const user = await getAllDataFromCollectionWithWhereArrayContains(COLLECTIONS.USERS, { property: "postsIds", propertyValue: postId});
        return user
    } catch (error) {
        console.log("Error On getUserByPost", error)
    }
}