module.exports = mongoose => {
    const notification_schema = mongoose.Schema({
        to: [String],
        type: String,
        project: String,
        message: String,
        read: Boolean
    });
    return mongoose.model("Notification", notification_schema, "notifications");
}