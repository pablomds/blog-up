import { addDocumentToCollection, deleteDocumentFromCollection,getAllDataFromCollectionWithIds, getAllDataFromCollection, getDataFromCollection, getPaginatedDataFromCollection, getTotalDataInCollection, updateDocumentToCollection } from "@/Firebase/firebaseFunctions";

import { COLLECTIONS } from "@/Firebase/collections";

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
};

export const deletePost = async (postId: string) => {
    try {
        await deleteDocumentFromCollection(COLLECTIONS.POSTS, postId);
    } catch (error) {
        console.log("Error On deletePost()", error)
    }
};

export const updatePost = async (postId: string, dataToUpdate: any) => {
    try {
        await updateDocumentToCollection(COLLECTIONS.POSTS, postId, dataToUpdate)
    } catch (error) {
        console.log("Error On updatePost()", error)
    }
};

export const getPaginatedPosts = async (limitNumber: number, orderedBy: string = "createdDate", order: "asc" | "desc" = "desc", lastDoc = null) => {
    try {
        const paginatedPosts = await getPaginatedDataFromCollection(COLLECTIONS.POSTS,limitNumber,orderedBy,order,lastDoc);
        return paginatedPosts;
    } catch (error) {
        console.log("Error On getLastestPosts", error);
    }
};

export const getTotalPosts = async () => {
    try {
        const totalPosts = await getTotalDataInCollection(COLLECTIONS.POSTS);
        return totalPosts;
    } catch (error) {
        console.log("Error On getTotalPosts()", error);
    }
};

export const getPosts = async () => {
    try {
        const posts = await getAllDataFromCollection(COLLECTIONS.POSTS);
        return posts
    } catch (error) {
        console.log("Error On getPosts()", error)
    }
};

export const getPostsWithIds = async (ids: string[]) => { 
    try {
        const posts = await getAllDataFromCollectionWithIds(COLLECTIONS.POSTS, ids);
        return posts
    } catch (error) {
        console.log("Error On getPostsWithIds()", error)
    }
}