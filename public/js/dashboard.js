const ProjectHeader = {
    props: ["title", "owner", "members", "route"],
    template: 
    `
    <div class="card border-dark p-3 mr-3">
        <h2 class="card-title">{{title}}</h2>
        <hr/>
        <h4 class="card-text">Owner: {{owner}}</h4>
        <h4 class="card-text">Members: {{members}}</h4>
        <router-link class="nav-link pl-0" :to="route">Submit tasks</router-link>
    </div>
    `
}


const Dashboard = {
    components: {
        'project-header': ProjectHeader
    },
    template: `
    <div>
        <h1 class="mt-3">Hi, {{session_user.username}} !</h1>
        <h3 class="mt-5">Your projects</h3>
        <div class="row d-flex flex-wrap">
            <div class="col p-0 mt-3">
                <div class="card-body p-0">
                    <div class="row no-gutters">
                        <div v-for="project in projects" :key="project._id">
                            <project-header :title="project.title" :owner="project.owner" :members="project.members.length+1" :route="'/board'+'/'+project.owner+'/'+project.title"></project-header>
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