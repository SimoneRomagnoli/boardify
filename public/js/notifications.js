const NotificationSummary = {
    props: ["project", "message", "read", "url", "object", "date"],
    template: `
    <div class="row rounded-lg bfy-bg-table-cell m-2 p-2 d-flex">
        <div class="align-self-center">
            <span v-if="!read" class="fa fa-circle bfy-notification-color ml-2"></span>
            <span v-else class="fa fa-circle-thin bfy-notification-color ml-2"></span>
        </div>
        <div class="col-sm-4 p-2">
            <strong class="col-sm-2 p-2">{{project.owner}} - {{project.title}} </strong>
        </div>    
        <div class="col-sm-4 p-2">
            {{message}}: {{object}}
        </div>
        <div class="p-2 ml-auto">
        <router-link class="bfy-bg-card-button text-white rounded p-1 text-center border-0" :to="url" style="text-decoration: none">
            Open board
        </router-link>
        </div>
    </div>
    `,
    methods: {

    }
}


const Notifications = {
    components: {
        "notification-summary": NotificationSummary
    },
    template: `
    <div class="p-3 vh-100">
        <div class="container">
            <h1 class="px-0">Notifications</h1>
            <div class="bg-white shadow rounded-lg p-2">
                <notification-summary v-for="notification in notifications" :key="notification" 
                    :project="notification.project" :message="notification.message" :object="notification.object" :read="notification.read" :url="notification.url" :date="notification.date">
                </notification-summary>
            </div>
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