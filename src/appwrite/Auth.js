import conf from "../conf/conf";
import { Account, ID, Client } from "appwrite";

export class AuthService {
    client = new Client();

    constructor() {
        this.client
            .setProject(conf.appwriteProjectId)
            .setEndpoint(conf.appwriteURL)
        
         this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const user = await this.account.create({
                userId : ID.unique(),
                email: email,
                password: password
            });

            if(user) {
                await this.sendEmailVerification()
                return user
            } else {
                return user;
            }
        } catch (error) {
            console.log("Their is some error while Signing up", error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession({ 
                email: email,
                password: password
             })
        } catch (error) {
            console.log("Their is some error while logging in", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
           console.log("Their is some error while getting user info", error);
        }
        return null
    }

    async sendEmailVerification(){
        try {
            return await this.account.createEmailVerification({
                url: "http://localhost:5173/verify-email"
            })
        } catch (error) {
            console.log('There was some issue while sending email, please check again', error)
        }
    }

    async userVerification(userId, secret) {
    try {
        return await this.account.updateEmailVerification({
            userId: userId,
            secret: secret
        });
    } catch (error) {
        console.log("Error verifying email", error);
    }
}
}

const authService = new AuthService()

export default authService