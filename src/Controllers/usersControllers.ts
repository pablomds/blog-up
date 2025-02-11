import { addDocumentToCollection, getDataFromCollectionWithWhereArray } from "../Firebase/firebaseFunctions";
import { COLLECTIONS } from "../Firebase/collections";

export const createUser = async (email: string, password: string, uid: string): Promise<string | void> => {
    try {
        const createdUserId = await addDocumentToCollection(COLLECTIONS.USERS, { email, password, uid, authProvider: "local" });
        return createdUserId
    } catch (error) {
        console.log('Error On createUser()', error)
    }
};

export const getUserByUid = async (uid: string) => {
    try {
        const user = await getDataFromCollectionWithWhereArray(COLLECTIONS.USERS, { property: "uid", propertyValue: uid}, "uid");
        console.log(user)
        return user
    } catch (error) {
        console.log('Error On getUserByUid', error)
    }
}