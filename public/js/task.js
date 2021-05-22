const Task = {
    template: `
    <div>
        <h3 class="mt-5">Task {{task.name}} // {{task.state}}</h3>
        <p>Topic: {{task.topic}}</p>
        <p>Description: {{task.description}}</p>
        <p>User: {{task.user}}</p>
        <p>Comment: {{task.comment}}</p>
        <router-link class="nav-link rounded" :to="'/board/'+params.owner+'/'+params.title">
            <i class="fas fa-arrow-left"></i>
        </router-link>
    </div>
    `,
    data: function() {
        return {
            params: this.$route.params,
            task: {}
        }
    },
    methods: {
        init() {
            this.mountTask();
        },
        mountTask() {
            axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/"+this.params.task)
            .then(response => {
                this.task = response.data[0];
            })
        }
    },
    mounted: function() {
        this.init();
    }
}