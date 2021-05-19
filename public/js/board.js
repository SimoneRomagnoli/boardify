const HeadersRow = {
    props: ["topics"],
    template: 
    `
    <tr>
        <th></th>
        <th v-for="topic in topics" :key="topic">{{topic}}</th>
    </tr>
    `
}

const TasksRow = {
    props: ["topics", "tasks"],
    template: 
    `
    <tr>
        <td>Available Tasks</td>
        <td v-for="topic in topics" :key="topic">
            <p v-for="task in tasks" :key="task" v-if="task.user==null && task.topic==topic">{{ task.name }}</p>
        </td>
    </tr>
    `
}

const Row = {
    props: ["member", "topics", "tasks"],
    template: 
    `
    <tr>
        <td>{{member}}</td>
        <td v-for="topic in topics" :key="topic">
            <p v-for="task in tasks" :key="task" v-if="task.user==member && task.topic==topic">{{ task.name }}</p>
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
    <div class="bg-white">
        <h1>{{ board.title }}</h1>
        <p>{{ board.description }}</p>
        <table style="width:100%">
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