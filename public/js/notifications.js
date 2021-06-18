const NotificationSummary = {
    props: ["project", "message", "read", "url"],
    template: `
    <div class="row rounded-lg bfy-bg-table-cell m-2 p-2">
        <div class="col-sm-2 p-2">
            <strong class="col-sm-2 p-2">{{project.owner}} - {{project.title}} </strong>
        </div>    
        <div class="col-sm-6 p-2">
            {{message}}
        </div>
        <div class="col p-2">
            
        </div>
    </div>
    `
}


const Notifications = {
    components: {
        "notification-summary": NotificationSummary
    },
    template: `
    <div class="p-3 vh-100">
        <h1 class="px-0">Notifications</h1>
        <div class="container-fluid bg-white shadow rounded-lg p-2">
            <notification-summary v-for="notification in notifications" :key="notification" :project="notification.project" :message="notification.message" :read="notification.read" :url="notification.url"></notification-summary>
        <div>
    </div>
    `,
    data: function() {
        return {
            notifications: {}
        }
    },
    methods: {
        init() {
            this.getNotifications();
        },
        getNotifications() {
            axios.get(this.$host + "api/notification")
            .then(response => {
                this.notifications = response.data;
            })
        }
    },
    mounted: function() {
        this.init();
    }
}