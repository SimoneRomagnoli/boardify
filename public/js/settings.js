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
            <div class="col p-2">
                <button class="rounded border-0 pull-right bfy-bg-card-button text-white font-weight-bold pull-right" data-toggle="modal" :data-target="target">Change {{field}}</button>
            </div>
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
        <h1 class="px-0">Settings</h1>
        <div class="modal fade" id="firstnameModal" tabindex="-1" aria-labelledby="firstnameModalLabel" aria-hidden="true">
          <settings-modal field="firstname" :value="firstname" modalId="firstnameModalLabel"></settings-modal>
        </div>
        <div class="modal fade" id="lastnameModal" tabindex="-1" aria-labelledby="lastnameModalLabel" aria-hidden="true">
          <settings-modal field="lastname" :value="lastname" modalId="lastnameModalLabel"></settings-modal>
        </div>
        <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true">
          <settings-modal field="email" :value="email" modalId="emailModalLabel"></settings-modal>
        </div>
        <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
          <password-modal></password-modal>
        </div>
        <div class="container-fluid bg-white shadow rounded-lg p-2">
            <div class="row rounded-lg bfy-bg-table-cell m-2 p-2">
                <div class="col-sm-2 p-2">
                    <strong class="col-sm-2 p-2">Username: </strong>
                </div>    
                <div class="col-sm-6 p-2">
                    {{username}}
                </div>
            </div>
            <settings-field field="Firstname" :content="firstname" target="#firstnameModal"></settings-field>
            <settings-field field="Lastname" :content="lastname" target="#lastnameModal"></settings-field>
            <settings-field field="Email" :content="email" target="#emailModal"></settings-field>
            <settings-field field="Password" content="********" target="#passwordModal"></settings-field>
        </div>
        
    </div>
    `,
    data: function() {
        return {
            username: "",
            firstname: "",
            lastname: "",
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
                this.email = session_user.email;
            }) 
        }
    },
    mounted: function() {
        this.init();
    }
}