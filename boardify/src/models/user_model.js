module.exports = (mongoose) => {
    const user_schema = mongoose.Schema({
        username: String,
        firstname: String,
        lastname: String,
        email: String,
        password: String
    })
    return mongoose.model("User", user_schema, "users")
}