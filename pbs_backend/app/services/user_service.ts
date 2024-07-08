export default class UserService {
    async register({ username, email, password }) {
        const user = await User.create({
            username,
            email,
            password,
        })
        return user
    }

    async userBouncer(user) {
        return user
    }
}
