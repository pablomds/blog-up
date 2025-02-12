import { addDocumentToCollection, getAllDataFromCollection, getDataFromCollection } from "../Firebase/firebaseFunctions";
import { COLLECTIONS } from "../Firebase/collections";
import { FormPostSchema } from "../Schemas/PostSchema";

export const createPost = async (data: any):Promise<string | void> => {
    try {
        const newPostId = await addDocumentToCollection(COLLECTIONS.POSTS, data);
        return newPostId
    } catch (error) {
        console.log("Error On createPost()", error)
    }
};

export const getPost = async (postId: string) => {
    try {
        const post = await getDataFromCollection(COLLECTIONS.POSTS, postId);
        return post
    } catch (error) {
        console.log("Error On getPost()", error)
    }
}

export const getPosts = async () => {
    try {
        const posts = await getAllDataFromCollection(COLLECTIONS.POSTS);
        return posts
    } catch (error) {
        console.log("Error On getPosts()", error)
    }
};