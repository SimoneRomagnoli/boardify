module.exports = mongoose => {
    const notification_schema = mongoose.Schema({
        to: [{
            user: String,
            read: Boolean
        }],
        project: {
	    title: String,
	    owner: String
	    },
        message: String,
        object: String,
	    url: String,
        date: Date
    });
    return mongoose.model("Notification", notification_schema, "notifications");
}
