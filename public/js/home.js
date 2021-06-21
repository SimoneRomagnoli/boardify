const ProjectHeader = {
    props: ["title", "owner", "members", "route"],
    template: 
    `
    <a :href="route" class="text-dark" style="text-decoration: none">
        <div class="card shadow-lg rounded-lg p-3 bfy-bg-hover">
            <h5 class="card-title mb-2"><i class="fas fa-clipboard-list bfy-green mr-1"></i> {{title}}</h5>
            <p class="card-text my-0">Owner: {{owner}}</p>
            <span class="ml-auto">{{members}} <i class="fas fa-users bfy-green"></i> </span>
        </div>
    </a>
    `
}


const Dashboard = {
    components: {
        'project-header': ProjectHeader
    },
    template: `
    <div class="col-sm-7 col-12 px-0">
        <h3 class="mt-5">Your boards</h3>
        <div class="card-body p-0">
            <div class="row">
                <div class="col-md-6 col-12 p-1" v-for="project in projects" :key="project._id">
                    <project-header :title="project.title" :owner="project.owner" :members="project.members.length" :route="'/board'+'/'+project.owner+'/'+project.title"></project-header>
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
            axios.get(this.$host + "api/projects")
            .then(response => {
                this.projects = response.data;
            })
        }
    },
    mounted: function(){
        this.init();
    }
}

const HomeChart = {
    template: `
    <div class="col-sm-4 col-12">
    </div>
    `
}

const Home = {
    components: {
        'dashboard': Dashboard,
        'home-chart': HomeChart
    },
    template: `
    <div class="px-4">
        <h2 class="mt-3">Welcome to Boardify, {{session_user.firstname}}!</h2>
        <div class="container-fluid">
            <div class="row">
                <dashboard></dashboard>
                <home-chart></home-chart>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            session_user: {}
        }
    },
    methods: {
        init() {
            this.getSessionUser()
            .then( response => {
                this.session_user = response.data;
            });
        }
    },
    mounted: function(){
        this.init();
    }
 }
