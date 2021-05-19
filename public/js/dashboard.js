const ProjectHeader = {
    props: ["title", "owner", "members", "route"],
    template: 
    `
    <div class="col card-body">
        <h2 class="card-title">{{title}}</h2>
        <hr/>
        <h4 class="card-text">Owner: {{owner}}</h4>
        <h4 class="card-text">Members: {{members}}</h4>
        <router-link class="nav-link" :to="route">Go</router-link>
    </div>
    `
}


const Dashboard = {
    components: {
        'project-header': ProjectHeader
    },
    template: `
    <div>
        <h1>Dashboard</h1>
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="row no-gutters">
                        <div v-for="project in projects" v-bind:key="project._id">
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
            projects: []
        }
    },
    methods: {
        init() {
            this.getProjects();
        },
        getProjects() {
            axios.get("http://localhost:3000/api/projects")
            .then(response => {
                this.projects = response.data;
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