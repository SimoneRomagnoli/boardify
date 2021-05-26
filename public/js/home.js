const ProjectHeader = {
    props: ["title", "owner", "members", "route"],
    template: 
    `
    <div class="card shadow-lg rounded p-2 mr-3">
        <h4 class="card-title my-1">{{title}}</h4>
        <hr/>
        <p class="card-text">Owner: {{owner}}</p>
        <p class="card-text">Members: {{members}}</p>
        <router-link class="nav-link w-100 bfy-bg-card-button text-white font-weight-bold rounded px-5" :to="route">Open board</router-link>
    </div>
    `
}


const Dashboard = {
    components: {
        'project-header': ProjectHeader
    },
    template: `
    <div>
        <h1 class="mt-3">Hi, {{session_user.username}}!</h1>
        <h3 class="mt-5">Your boards</h3>
        <div class="row">
            <div class="col mt-3">
                <div class="card-body p-0">
                    <div class="row no-gutters">
                        <div v-for="project in projects" :key="project._id">
                            <project-header :title="project.title" :owner="project.owner" :members="project.members.length" :route="'/board'+'/'+project.owner+'/'+project.title"></project-header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            projects: [],
            session_user: {}
        }
    },
    methods: {
        init() {
            this.getProjects();
            this.getSessionUser();
        },
        getProjects() {
            axios.get("http://localhost:3000/api/projects")
            .then(response => {
                this.projects = response.data;
            })
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

const Home = {
    components: {
        'dashboard': Dashboard
    },
    template: `
        <dashboard class="px-4"></dashboard>
    `
 }
