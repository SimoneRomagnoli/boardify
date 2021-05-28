const About = {
    template: `
    <div>
        <h2 class="ml-2 mt-2">What is Boardify?</h2>
        <div class="ml-2 mt-2">
            <p>Boardify </p>
        </div>
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
            session_user: {}
        }
    },
    methods: {
        init() {
            this.getSessionUser();
        },
        getSessionUser() {
            axios.get("http://localhost:3000/session/user")
            .then(response => {
                this.session_user = response.data;
            })
        }
    },
    mounted: function() {
        this.init()
    }
}