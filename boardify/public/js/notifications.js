const NotificationSummary = {
    props: ["project", "message", "url", "object", "date", "receivers", "sessionUser"],
    template: `
    <div class="row rounded-lg bfy-bg-gray m-2 p-2 d-flex">
        <div class="align-self-center">
            <span v-if="!read" class="fa fa-circle bfy-green ml-2"></span>
            <span v-else class="fa fa-circle-thin bfy-green ml-2"></span>
        </div>
        <div class="col-sm-4 p-2 align-self-center">
            <strong class="col-sm-2 p-2">{{project.owner}} - {{project.title}} </strong>
        </div>    
        <div class="col-sm-4 p-2 align-self-center">
            {{message}}: {{object}}
        </div>
        <div class="col-sm-2 p-2 align-self-center">
            {{dateString}}
        </div>
        <div class="p-2 ml-auto">
        <button class="bfy-bg-green text-white rounded p-1 text-center border-0" :to="url" style="text-decoration: none" @click.prevent="readNotifications(project)">
            Open board
        </button>
        </div>
    </div>
    `,
    data: function() {
        const date = new Date(this.date)
        const hhMM = date.getHours() + ':' + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear()

        return {
            url: this.url,
            read: this.receivers.filter(receiver => receiver.user === this.sessionUser.username)[0].read,
            dateString: dd + '/' + mm + '/' + yyyy + ' ' + hhMM
        }
    },
    methods: {
        readNotifications(project) {
            axios.put(this.$host + "api/notification", project)
            .then(_ => {
                this.$router.push(this.url);
                location.reload();
            });
        }
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
                    :project="notification.project" :message="notification.message" :object="notification.object" :url="notification.url" :date="notification.date" :receivers="notification.to" :sessionUser="sessionUser">
                </notification-summary>
            </div>
        <div>
    </div>
    `,
    data: function() {
        return {
            notifications: {},
            sessionUser: {}
        }
    },
    methods: {
        init() {
            this.getSessionUser().then(response => {
                this.sessionUser = response.data;
                this.getNotifications();
            });
        },
        getNotifications() {
            axios.get(this.$host + "api/notification")
            .then(response => {
                this.notifications = response.data.reverse();
            })
        }
    },
    mounted: function() {
        this.init();
    }
}