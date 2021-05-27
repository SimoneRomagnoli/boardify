const Sidebutton = {
    props: ["text", "route", "icon"],
    template: `
        <li class="nav-item rounded bfy-bg-button mb-2 row">
            <router-link class="nav-link text-white px-0 w-100" :to="route">
                <i :class="icon" class="text-white align-self-center px-2"></i>
                {{text}}
            </router-link>
        </li>
  `
}

const Sidebar = {
    components: {
        'sidebutton': Sidebutton
    },
    template: `
    <div class="d-flex flex-column flex-shrink-0 bfy-bg-sidebar p-2">
        <div class="row">
            <img class="col-10" src="/static/img/boardify-logo.png" alt="Boardify">
        </div>
        <ul class="mb-auto rounded nav nav-pills flex-column p-3">
            <sidebutton text="Dashboard" route="/" icon="fa fa-tachometer"></sidebutton>
            <sidebutton text="Profile" :route="profile_path" icon="fa fa-user"></sidebutton>
            <sidebutton text="New Project" route="/project" icon="fa fa-plus-square"></sidebutton>
            <sidebutton text="Notifications" route="/notifications" icon="fa fa-bell"></sidebutton>
        </ul>
        <div class="dropdown">
            <ul class="rounded nav nav-pills flex-column p-3">
                <sidebutton text="About" route="/about" icon="fa fa-info-circle"></sidebutton>
                <sidebutton text="Settings" route="/settings" icon="fa fa-gear"></sidebutton>
                <li class="nav-item rounded bfy-bg-button mb-2 row">
                    <a class="nav-link text-white px-0 mx-0 w-100" href="/logout">
                        <i class="fa fa-sign-out text-white align-self-center px-2"></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </div>
    `,
    data: function() {
        return {
            session_user: {},
            profile_path: ""
        }
    },
    methods: {
        init() {
            this.getSessionUser();
        },
        getSessionUser() {
            axios.get("http://localhost:3000/session/user")
                .then( response => {
                    this.session_user = response.data.username;
                    this.profile_path = "/profile/"+this.session_user;
                })
        }
    },
    mounted: function(){
        this.init();
    }
}