import _ from "lodash"
import { collection, getCountFromServer, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { doc, getDoc, getDocs, updateDoc , addDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, listAll, uploadBytesResumable, getDownloadURL, deleteObject  } from "firebase/storage";

import { db, storage } from "@/Firebase/firebaseConfig";
import { utils } from "@/Utils/utils";

export const getDataFromCollection = async (collectionName: string, dataId: string) => {
    const docRef = doc(db, collectionName, dataId);
    const docSnap = await getDoc(docRef);
    return { ...docSnap.data(), id: docSnap.id }
};

export const getAllDataFromCollectionWithIds = async (collectionName: string, listOfIds: string[]) => {

    let listOfData: any = []

    await Promise.all(
        listOfIds.map(async (id) => {
            const data = await getDataFromCollection(collectionName, id)
            listOfData.push(data)
        })
    )

    return listOfData
};

export const getAllDataFromCollectionWithWhereArray = async (collectionName: string, whereArray: any) => {

    let arrayData: any = []
    const q = query(collection(db,collectionName), where(whereArray.property, '==', whereArray.propertyValue))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        arrayData.push({...doc.data(), id: doc.id})
    })
    
    if (arrayData.length === 1) {
        return arrayData[0];
    }

    return arrayData
};

export const getDataFromCollectionWithWhereArray = async (collectionName: string, whereArray: any, field: string) => {

    let arrayData: any = []
    const q = query(collection(db,collectionName), where(whereArray.property, '==', whereArray.propertyValue))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const data = {...doc.data(), id: doc.id} as Record<string,any>;
        if (data[field] !== undefined) { // Vérifier si le champ existe
            arrayData.push({...data}); // Ajouter la valeur du champ spécifique
        }
    });
    if (arrayData.length === 1) {
        return arrayData[0];
    }
    return arrayData
};

export const getAllDataFromCollectionWithWhereArrayContains = async (collectionName: string, whereArray: any) => {

    let arrayData: any = []

    const q = query(collection(db,collectionName), where(whereArray.property, 'array-contains', whereArray.propertyValue));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        arrayData.push({...doc.data(), id: doc.id})
    })
    // if (arrayData.length === 1) {
    //     return arrayData[0];
    // }
    return arrayData
};

export const getAllDataFromCollection = async (collectionName: string) => {
    let allDataFromCollection: any = []
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    querySnapshot.forEach((doc) => {
      allDataFromCollection.push({ ...doc.data(), id: doc.id })
    });

    return _.filter(allDataFromCollection, 'isActive')
};

export const getAllDataFromCollectionEvenDisable = async (collectionName: string) => {
    let allDataFromCollection: any = []
    const querySnapshot = await getDocs(collection(db, collectionName))
    
    querySnapshot.forEach((doc) => {
      allDataFromCollection.push({ ...doc.data(), id: doc.id })
    });

    return allDataFromCollection
};

export const getPaginatedDataFromCollection = async (collectionName: string, limitNumber: number = 100, orderedBy: string = "createdDate", order: "asc" | "desc" = "desc", lastDoc = null) => {
    
    let allDataFromCollection: any = []

    let q;
    if (lastDoc) {
        q = query(
          collection(db, collectionName),
          orderBy(orderedBy, order),
          startAfter(lastDoc),
          limit(limitNumber)
        );
      } else {
        q = query(
          collection(db, collectionName),
          orderBy(orderedBy, order),
          limit(limitNumber)
        );
      }

    let querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        allDataFromCollection.push({ ...doc.data(), id: doc.id })
    });

    // Get last document for pagination ps: check if I can make this request with last document with allDataFromCollection
    const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {allDataFromCollection, lastDocument};
};

export const getTotalDataInCollection = async (collectionName: string) => {
    const collRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collRef);
    return snapshot.data().count;
};

export const addDocumentToCollection = async (collectionName: string, dataToCollection: any): Promise<string | void> => {
    try {
        dataToCollection.createdDate = utils.getUnixTimeStamp(new Date());
        dataToCollection.updatedDate = utils.getUnixTimeStamp(new Date());
        dataToCollection.isActive = true;
        const addedDocumentToCollection = collection(db, collectionName);    
        const newDocRef = await addDoc(addedDocumentToCollection, dataToCollection);
        return newDocRef.id
    } catch (error) {
        console.log('Error On addDocumentToCollection()', error);
    }

    
};

export const updateDocumentToCollection = async (collectionName: string, dataToUpdateId: string, dataToUpdate: any): Promise<void> => {

    try {
        let docToUpdate = _.omitBy(dataToUpdate, _.overSome([_.isNil, _.isNaN]));
        docToUpdate = _.omit(docToUpdate, ['id']);
        docToUpdate.updatedDate = utils.getUnixTimeStamp(new Date());
        const docRefToUpdate = doc(db, collectionName, dataToUpdateId);
        await updateDoc(docRefToUpdate, docToUpdate);   
    } catch (error) {
        console.log("Error On updateDocumentToCollection()", error)
    }

};

export const deleteDocumentFromCollection = async (collectionName: string, dataToDeleteId: string): Promise<void> => {

    const docRefToDelete = doc(db, collectionName, dataToDeleteId)
    await deleteDoc(docRefToDelete)

};

export const deleteElementFromArrayInDocument = async (collectionName: string, documentId: string, field: string, elementId: string) => {
    try {
        // Récupérer le document
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            // Obtenir le tableau du champ spécifié
            const fieldArray = docSnap.data()[field];
            if (Array.isArray(fieldArray)) {
                // Supprimer l'élément avec l'ID spécifié
                const updatedArray = fieldArray.filter((element: any) => element.id !== elementId);
                
                // Mettre à jour le document avec le nouveau tableau
                await updateDoc(docRef, { [field]: updatedArray });
                
                return { success: true };
            } else {
                return { success: false, error: "Le champ spécifié n'est pas un tableau." };
            }
        } else {
            return { success: false, error: "Le document spécifié n'existe pas." };
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'élément du tableau :", error);
        return { success: false, error: "Une erreur s'est produite lors de la suppression de l'élément du tableau." };
    }
};

export const listFiles = async (foldername: string) => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storageRef = getStorage();
    // Create a storage reference from our storage service
    const listRef = ref(storageRef, foldername);

    let imagesUrl: any[] = []

    const listAllFilesFromFolder = await listAll(listRef)

    await Promise.all(listAllFilesFromFolder.items.map(async (itemRef) => {
        let imageUrl = await getDownloadURL(itemRef)
        imagesUrl.push(imageUrl)
    }))
    return imagesUrl;
};

export const uploadFileToStorage = async (file: any, folderName: string): Promise<string> => {
    const storageRef = ref(storage, `/${folderName}/${file.name}`)
    await uploadBytesResumable(storageRef, file)
    return await getDownloadURL(storageRef)
};

export const deleteFileFromStorage = async (folderName: string, fileName: string): Promise<void> => {
    const storageRef = ref(storage, `/${folderName}/${fileName}`)
    return await deleteObject(storageRef)
};