class JWTAuth {

    signIn = (data: string) => {
        const key = process.env.API_KEY;
        console.log(key)
    }
}
export default new JWTAuth();