const conf = {
    appwriteURL: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    appwriteCollectionIdComment: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteCollectionIdMain: import.meta.env.VITE_APPWRITE_COLLECTION_ID_MAIN,
    appwriteDatabaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
}

export default conf