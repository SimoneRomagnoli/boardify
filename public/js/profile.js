const UserData = {
    template: `
    <div>
        <h2 class="ml-2 mt-2">User</h2>
        <div class="row" id="username-row">
            <div class="col">
                <p class="ml-2 mt-2">Username: {{profile_user.username}}</p>
            </div>
            <div class="col">
                <button v-if="session_user.username === profile_user.username" class="btn btn-danger rounded border-0 p-2">Change username</button>
            </div>
        </div>
        <div class="row" id="email-row">
            <div class="col">
                <p class="ml-2 mt-1">Email: {{profile_user.email}}</p>
            </div>
            <div class="col">
                <button v-if="session_user.username === profile_user.username" class="btn btn-danger rounded border-0 p-2">Change email</button>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            profile_user: {},
            session_user: {}
        }
    },
    methods: {
        init() {
            this.getSessionUser();
            this.getProfileUser();
        },
        getSessionUser() {
            axios.get("http://localhost:3000/session/user")
                .then( response => {
                  this.session_user = response.data;
                })
        },
        getProfileUser() {
            axios.get("http://localhost:3000/api/profile/"+this.$route.params.username)
                .then( response => {
                    this.profile_user = response.data;
                })
        }
    },
    mounted: function() {
        this.init();
    }
}


const Profile = {
    components: {
        'user-data': UserData
    },
    template: `
        <user-data></user-data>
    `
}