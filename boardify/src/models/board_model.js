module.exports = (mongoose) => {
    const board_schema = mongoose.Schema({
        title: String,
        owner: String,
        description: String,
        topics: [String],
        members: [String],
        tasks: [{
            name: String, 
            description: String,
            topic: String,
            user: String,
            state: String,
            comment: String
        }]
    })
    return mongoose.model("Board", board_schema, "boards")
}