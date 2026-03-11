import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.databases = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, content, archived,featuredMedia,userId, slug}) {
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredMedia,
                    archived,
                    userId,
                }
            });
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title, content, archived,featuredMedia,userId}) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredMedia,
                    archived,
                    userId,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                rowId: slug
            })
        } catch (error) {
            throw error;

        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                rowId: slug
            })
        } catch (error) {
            console.log("appwrite getPost error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("archived", "false")]) {
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                queries: queries,
            })
        } catch (error) {
            console.log("appwrite getPosts error ", error)
            return false
        }
    }

    async uploadFile(file) {
        try {
            const allowedTypes = [
                "image/png",
                "image/jpeg",
                "image/jpg",
                "image/webp",
                "image/gif",
                "video/mp4",
                "video/webm",
                "video/ogg"
            ];

            if (!allowedTypes.includes(file.type)) {
                console.log("Only images, GIFs, and videos are allowed");
                return false;
            }


            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file,
            })
        } catch (error) {
            console.log("Appwritevserive upload error  ", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })
        } catch (error) {
            console.log("appwrite deleteFile error ", error)
            return false
        }
    }

    getPreview(fileId) {
        try {
            return this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
        } catch (error) {
            console.log("appwrite get preview error ", error)
            return false
        }
    }

    getView(fileId) {
        try {
            return this.bucket.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
        } catch (error) {
            console.log("appwrite getview error", error)
            return false
        }
    }

    async createComment({postId, commentContent, parentCommentId}){
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdComment,
                rowId: ID.unique(),
                data: {
                    postId,
                    commentContent,
                    parentCommentId
                }
            })
        } catch (error) {
            
        }
    }

    async updateComment(slug, {postId,commentContent, parentCommentId}) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdComment,
                rowId: slug,
                data: {
                    postId,
                    commentContent,
                    parentCommentId
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteComment({slug}) {
        try {
            return await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdComment,
                rowId: slug,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getPostComment(queries = []){
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdComment,
                queries
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getUserPosts(userId) {
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                queries: [
                    Query.equal('userId', userId)
                ]
            })
        } catch (error) {
            console.log()
        }
    }

    async likePost(postId, currentLikes) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                rowId: postId,
                data: {
                    likes: currentLikes + 1
                }
            })
        } catch (error) {
            console.log("like post error", error)
        }
    }

    async unlikePost(commentId, currentLikes) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionIdMain,
                rowId: commentId,
                data: {
                    likes: currentLikes - 1
                }
            })
        } catch (error) {
            console.log("unlike comment error", error)
        }
    }

    async getCurrentUserAvatar() {
        try {
            const user = await account.get();
            if (user.$id) {
                const avatarUrl = avatars.getInitials({
                    name: user.name,
                    width: 100,                    
                    height: 100,           
                });
                return avatarUrl.toString();
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

const service = new Service();

export default service;