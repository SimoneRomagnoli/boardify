const Sidebutton = {
    props: ["text", "route"],
    template: `
        <li class="nav-item">
            <router-link class="nav-link" :to="route">{{text}}</router-link>
        </li>
  `
}

const Sidebar = {
    components: {
        'sidebutton': Sidebutton
    },
    template: `
        <div id="sidebarNav" class="row">
            <div class="col-sm-3">
                <ul class="nav flex-column bg-white">
                    <sidebutton text="Dashboard" route="/"></sidebutton>
                    <sidebutton text="New Project" route="/newproject"></sidebutton>
                    <hr/>
                    <sidebutton text="About" route="/about"></sidebutton>
                    <sidebutton text="Settings" route="/settings"></sidebutton>
                    <sidebutton text="Logout" route="/logout"></sidebutton>
                </ul>
            </div>
            <h1>Hi, {{session_user.username}}!</h1>
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
            .then( response => {
                this.session_user = response.data;
            })
        },
        replaceByDefault(e){
            e.target.src = "https://icon-library.net//images/not-found-icon/not-found-icon-4.jpg"
        }
    },
    mounted: function(){
        this.init();
    }
}