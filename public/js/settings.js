const SettingsField = {
    props: ['field', 'content', 'target'],
    template: `
        <div class="row rounded-lg bfy-bg-table-cell m-2 p-2">
            <div class="col-sm-2 p-2">
                <strong class="col-sm-2 p-2">{{field}}: </strong>
            </div>    
            <div class="col-sm-6 p-2">
                {{content}}
            </div>
            <!--<div class="col p-2">
                <button class="rounded border-0 pull-right bfy-bg-card-button text-white font-weight-bold pull-right" data-toggle="modal" :data-target="target">Change {{field}}</button>
            </div>-->
        </div>
    `
}

const Settings = {
    components: {
        'settings-field': SettingsField,
        'settings-modal': SettingsModal,
        'password-modal': PasswordModal,
    },
    template: `
    <div class="p-3 vh-100">
        <div class="modal fade" id="settingsModal" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
          <settings-modal :user="user" modalId="settingsModalLabel"></settings-modal>
        </div>
        <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
          <password-modal></password-modal>
        </div>
        <div class="container">
            <h1 class="px-0">Settings</h1>
            <div class="bg-white shadow rounded-lg p-2">
                <div class="row rounded-lg bfy-bg-table-cell m-2 p-2">
                    <div class="col-sm-2 p-2">
                        <strong class="col-sm-2 p-2">Username: </strong>
                    </div>    
                    <div class="col-sm-6 p-2">
                        {{user.username}}
                    </div>
                </div>
                <settings-field field="Firstname" :content="user.firstname" target="#firstnameModal"></settings-field>
                <settings-field field="Lastname" :content="user.lastname" target="#lastnameModal"></settings-field>
                <settings-field field="Email" :content="user.email" target="#emailModal"></settings-field>
                <settings-field field="Password" content="********" target="#passwordModal"></settings-field>
                <div class="row mt-2 p-2">
                    <div class="col-4 offset-8">
                        <button class="rounded border-0 bfy-bg-card-button text-white font-weight-bold pull-right p-2" data-toggle="modal" data-target="#passwordModal">Change password</button>
                        <button class="rounded border-0 bfy-bg-card-button text-white font-weight-bold pull-right p-2 mr-2" data-toggle="modal" data-target="#settingsModal">Change bio</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            user: {
                username: "",
                firstname: "",
                lastname: "",
                email: ""
            }
        }
    },
    methods: {
        init() {
            this.getSessionUser()
            .then(response => {
                const session_user = response.data;
                this.user.username = session_user.username;
                this.user.firstname = session_user.firstname;
                this.user.lastname = session_user.lastname;
                this.user.email = session_user.email;
            });
        }
    },
    mounted: function() {
        this.init();
    }
}