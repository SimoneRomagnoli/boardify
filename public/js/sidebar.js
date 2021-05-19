const Sidebutton = {
    props: ["text", "route"],
    template: `
        <li class="nav-item border border-primary mb-2">
            <router-link class="nav-link" :to="route">{{text}}</router-link>
        </li>
  `
}

const Sidebar = {
    components: {
        'sidebutton': Sidebutton
    },
    template: `
        <div class="row">
            <div class="col mx-3 px-3">
                <ul class="nav flex-column bg-white p-2 border border-primary">
                    <sidebutton text="Dashboard" route="/"></sidebutton>
                    <sidebutton text="New Project" route="/project"></sidebutton>
                    <hr/>
                    <sidebutton text="About" route="/about"></sidebutton>
                    <sidebutton text="Settings" route="/settings"></sidebutton>
                    <li class="nav-item border border-primary">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    `
}
/*
* ,
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
* */