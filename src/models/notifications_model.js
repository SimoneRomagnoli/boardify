module.exports = mongoose => {
    const notification_schema = mongoose.Schema({
        to: [String],
        project: {
	    title: String,
	    owner: String
	},
        message: String,
        read: Boolean,
	url: String
    });
    return mongoose.model("Notification", notification_schema, "notifications");
}
