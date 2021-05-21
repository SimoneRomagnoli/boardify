const HeadersRow = {
    props: ["topics"],
    template: 
    `
    <tr>
        <th></th>
        <th class="text-center text-capitalize" v-for="topic in topics" :key="topic">{{topic}}</th>
    </tr>
    `
}

const TasksRow = {
    props: ["topics", "tasks"],
    template: 
    `
    <tr>
        <td class="text-center font-weight-bold">Available Tasks</td>
        <td v-for="topic in topics" :key="topic">
            <p class="border rounded border-dark bg-danger text-capitalize text-center text-white" v-for="task in tasks" :key="task" v-if="task.user===null && task.topic===topic" @click.prevent="assignTask(task)">{{ task.name }}</p>
        </td>
    </tr>
    `
    ,
    data: function() {
        return {
            params: null,
            task: null
        }
    },
    methods: {
        init() {
            this.params = this.$route.params;
        },
        assignTask(task) {
            this.task = task;
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title, this.task)
            .then(response => {
                this.task = null;
                location.replace("http://localhost:3000/"); // load home page but need to reload page
            });
        }
    },
    mounted: function() {
        this.init();
    }
}

const Row = {
    props: ["member", "topics", "tasks"],
    template: 
    `
    <tr>
        <td style="vertical-align: middle">{{member}}</td>
        <td v-for="topic in topics" :key="topic">
          <p class="border rounded border-dark bg-danger text-capitalize text-center text-white" v-for="task in tasks" :key="task" v-if="task.user===member && task.topic===topic">{{ task.name }}</p>
        </td>
    </tr>
    `
}

const Board = {
    components: {
        'headers': HeadersRow,
        'tasks': TasksRow,
        'row': Row
    },
    template: 
    `
    <div class="bg-white p-3">
        <h1>{{ board.title }}</h1>
        <p>{{ board.description }}</p>
        <table class="table table-bordered">
            <headers :topics="board.topics"></headers>
            <tasks :tasks="board.tasks" :topics="board.topics"></tasks>
            <row v-for="member in board.members" :key="member" :member="member" :tasks="board.tasks" :topics="board.topics"></row>
        </table>
    </div>
    `,
    data: function() {
        return {
            params: null,
            board: {}
        }
    },
    methods: {
        init() {
            this.params = this.$route.params;
            this.mountTable();
        },
        mountTable() {
            axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title)
            .then(response => {
                this.board = response.data[0];
            });
        }
    },
    mounted: function() {
        this.init();
    }
}