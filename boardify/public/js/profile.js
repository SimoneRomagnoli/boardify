const UserData = {
    template: `
    <!--<div>
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
    </div>-->
    <div class="container-fluid mt-5">
      <div class="card border border-dark shadow-lg">
        <div class="card-header text-center">
          <div class="row">
            <div class="col-2">
              <button v-if="session_user.username === profile_user.username" class="btn btn-danger rounded border-0 p-2">Change username</button>
            </div>
            <div class="col">
              <img class="card-img" src="/static/img/default_profile.png" alt="Profile">
            </div>
            <div class="col-2">
              <button v-if="session_user.username === profile_user.username" class="btn btn-danger rounded border-0 p-2">Change email</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          corpo
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
            axios.get(this.$host + "session/user")
                .then( response => {
                  this.session_user = response.data;
                })
        },
        getProfileUser() {
            axios.get(this.$host + "api/profile/"+this.$route.params.username)
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