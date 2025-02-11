import { addDocumentToCollection } from "../Firebase/firebaseFunctions";
import { COLLECTIONS } from "../Firebase/collections";
import { FormPostSchema } from "../Schemas/PostSchema";

export const createPost = async (data: any):Promise<string | void> => {
    try {
        const newPostId = await addDocumentToCollection(COLLECTIONS.POSTS, data);
        return newPostId
    } catch (error) {
        console.log("Error On CreatePost()", error)
    }
}