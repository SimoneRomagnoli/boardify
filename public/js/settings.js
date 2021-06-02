const SettingsField = {
    props: ['field', 'content', 'target'],
    template: `
        <div class="row rounded-lg bfy-bg-table-cell m-2 p-2">
            <strong>{{field}}: <strong>
            <div class="rounded-lg bg-white border">{{content}}</div>
            <button class="rounded border-0 align-self-center bfy-bg-card-button text-white font-weight-bold pull-right" data-toggle="modal" data-target="target">Change {{field}}</button>
        </div>
    `
}

const Settings = {
    components: {
        'settings-field': SettingsField,
        'username-modal': UsernameModal,
        'name-modal': NameModal,
        'email-modal': EmailModal,
        'password-modal': PasswordModal,
    },
    template: `
    <div class="p-3 vh-100">
        <h1 class="px-0">Settings</h1>
        <div class="modal fade" id="usernameModal" tabindex="-1" aria-labelledby="usernameModalLabel" aria-hidden="true">
          <username-modal></username-modal>
        </div>
        <div class="modal fade" id="nameModal" tabindex="-1" aria-labelledby="nameModalLabel" aria-hidden="true">
          <name-modal></name-modal>
        </div>
        <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true">
          <email-modal></email-modal>
        </div>
        <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
          <password-modal></password-modal>
        </div>
        <div class="container-fluid bg-white shadow rounded-lg p-2">
            <settings-field field="Username" :content="username" target="#usernameModal"></settings-field>
            <settings-field field="Name" :content="name" target="#nameModal"></settings-field>
            <settings-field field="Email" :content="email" target="#emailModal"></settings-field>
            <settings-field field="Password" content="" target="#passwordModal"></settings-field>
        </div>
        
    </div>
    `,
    data: function() {
        return {
            username: "",
            firstname: "",
            lastname: "",
            name: "",
            email: ""
        }
    },
    methods: {
        init() {
            this.getSessionUser();
        },
        getSessionUser() {
            axios.get('http://localhost:3000/session/user')
            .then(response => {
                const session_user = response.data;
                this.username = session_user.username;
                this.firstname = session_user.firstname;
                this.lastname = session_user.lastname;
                this.name = session_user.firstname+" "+session_user.lastname;
                this.email = session_user.email;
            }) 
        }
    },
    mounted: function() {
        this.init();
    }
}