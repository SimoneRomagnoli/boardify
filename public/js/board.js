const TopicsRow = {
    props: ["topics", "setCurrentTopic"],
    template: 
    `
    <div class="row mx-1">
        <div class="col font-weight-bold py-2 rounded-lg m-2">
            <button v-if="currentUser === params.owner" class="rounded border-0 align-self-center bfy-bg-card-button text-white pull-right" data-toggle="modal" data-target="#newTopicModal">Add Topic</button>
        </div>
        <div class="col text-center text-capitalize bfy-bg-table-cell rounded-lg py-2 m-2 font-weight-bold" v-for="topic in topics" :key="topic">
            {{topic}}
            <button v-if="currentUser === params.owner" class="rounded border-0 align-self-center bfy-bg-card-button text-white font-weight-bold pull-right" data-toggle="modal" data-target="#newTaskModal" @click.prevent="setCurrentTopic(topic)">+</button>
        </div>
    </div>
    `,
    data: function() {
        return {
            currentUser: null,
            params: this.$route.params
        }
    },
    methods: {
        init() {
            axios.get("http://localhost:3000/session/user")
                .then(response => {
                this.currentUser = response.data.username;
            });
        }
    },
    mounted: function() {
        this.init()
    }
}

const TasksRow = {
    props: ["topics", "tasks", "currentTask", "setCurrentTask"],
    template: 
    `
    <div class="row mx-1 my-1">
        <div class="col font-weight-bold py-2 rounded-lg my-2 bfy-bg-table-cell d-flex align-items-center">
            Available Tasks
        </div>
        <div class="col" v-for="topic in topics" :key="topic">
            <ul class="m-0 p-0" style="list-style: none;">
                <li class="py-0 my-2" v-for="task in tasks" :key="task" v-if="(task.user===null || task.user==='') && task.topic===topic">
                    <button type="button" v-if="task.state === 'TODO'" class="btn btn-light text-capitalize w-100 d-flex align-items-center" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">
                        {{task.name}}<div class="bg-danger ml-auto text-danger rounded-circle p-3"></div>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    `
    ,
    data: function() {
        return {
            params: this.$route.params,
            currentTask: this.currentTask,
            myTask: null
        }
    }
}

const Row = {
    props: ["member", "topics", "tasks", "setCurrentTask"],
    template: 
    `
      <div class="row mx-1 my-1">
          <div class="col py-2 rounded-lg my-2 bfy-bg-table-cell d-flex align-items-center" style="vertical-align: middle">{{member}}</div>
          <div class="col" v-for="topic in topics" :key="topic">
            <ul class="m-0 p-0" style="list-style: none;">
              <li class="py-0 my-2" v-for="task in tasks" :key="task" v-if="task.user===member && task.topic===topic">
                <button type="button" v-if="task.state === 'TODO'" class="btn btn-light text-capitalize w-100 d-flex align-items-center" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">
                    {{task.name}}<div class="bg-danger ml-auto rounded-circle p-3"></div>
                </button>
                <button type="button" v-if="task.state === 'RUNNING'" class="btn btn-light text-capitalize w-100 d-flex align-items-center" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">
                    {{task.name}}<div class="bg-warning ml-auto rounded-circle p-3"></div>
                </button>
                <button type="button" v-if="task.state === 'DONE'" class="btn btn-light text-capitalize w-100 d-flex align-items-center" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">
                    {{task.name}}<div class="bg-success ml-auto rounded-circle p-3"></div>
                </button>
              </li>
            </ul>
          </div>
      </div>
    `,
    data: function() {
        return {
            task: null,
            params: this.$route.params
        }
    }
}

const ColumnChart = {
    template: `
      <div id="columnChart"></div>
    `,
    data: function () {
        return {
            params: this.$route.params,
            tasks: null,
            members: null
        }
    },
    methods: {
        fillChart() {
            let todo = [];
            let running = [];
            let done = [];
            this.members.forEach(m => todo.push({x: m, y: this.tasks.filter(t => t.user === m && t.state === 'TODO').length}));
            this.members.forEach(m => running.push({x: m, y: this.tasks.filter(t => t.user === m && t.state === 'RUNNING').length}));
            this.members.forEach(m => done.push({x: m, y: this.tasks.filter(t => t.user === m && t.state === 'DONE').length}));
            JSC.Chart('columnChart', {
                type: 'horizontal column',
                series: [
                    {
                        name: 'TODO',
                        points: todo
                    },
                    {
                        name: 'RUNNING',
                        points: running
                    },
                    {
                        name: 'DONE',
                        points: done
                    }
                ]
            });
        },
        getTasks() {
            axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title)
            .then(response => {
                this.tasks = response.data[0].tasks;
                this.members = response.data[0].members;
                this.fillChart();
            });
        }
    },
    mounted: function () {
        this.getTasks();
    }
}

const PieChart = {
    template: `
      <div id="pieChart"></div>
    `,
    data: function () {
        return {
            params: this.$route.params,
            tasks: null
        }
    },
    methods: {
        fillChart() {
            let points = [];
            points.push({x: "TODO", y: this.tasks.filter(t => t.state === 'TODO').length});
            points.push({x: "RUNNING", y: this.tasks.filter(t => t.state === 'RUNNING').length});
            points.push({x: "DONE", y: this.tasks.filter(t => t.state === 'DONE').length});
            JSC.Chart('pieChart', {
                type: 'pie',
                series: [
                    {
                        points: points
                    }
                ]
            });
        },
        getTasks() {
            axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title)
                .then(response => {
                    this.tasks = response.data[0].tasks;
                    this.fillChart();
                });
        }
    },
    mounted: function () {
        this.getTasks();
    }
}

const Board = {
    components: {
        'topics': TopicsRow,
        'tasks': TasksRow,
        'row': Row,
        'task-modal': TaskModal,
        'new-task-modal': NewTaskModal,
        'new-topic-modal': NewTopicModal,
        'column-chart': ColumnChart,
        'pie-chart': PieChart
    },
    template: 
    `
    <div class="p-3 vh-100">
        <h1 class="px-0">{{board.title}}</h1>
        <p>{{board.description}}</p>
        <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <task-modal :task_watch="currentTask"></task-modal>
        </div>
        <div class="modal fade" id="newTaskModal" tabindex="-1" aria-labelledby="newTaskModalLabel" aria-hidden="true">
          <new-task-modal :topic_watch="currentTopic"></new-task-modal>
        </div>
        <div class="modal fade" id="newTopicModal" tabindex="-1" aria-labelledby="newTopicModalLabel" aria-hidden="true">
          <new-topic-modal></new-topic-modal>
        </div>
        <div class="container-fluid bg-white shadow rounded-lg p-2">
            <topics :topics="board.topics" :setCurrentTopic="setCurrentTopic"></topics>
            <tasks :tasks="board.tasks" :topics="board.topics" :setCurrentTask="setCurrentTask"></tasks>
            <row v-for="member in board.members" :key="member" :member="member" :tasks="board.tasks" :topics="board.topics" :setCurrentTask="setCurrentTask"></row>
        </div>
        <div class="container-fluid p-2 shadow mt-5">
          <div class="row">
            <div class="col-8">
              <strong>Users Tasks Progress</strong>
              <column-chart></column-chart>
            </div>
            <div class="col-4">
              <strong>Global Project Progress</strong>
              <pie-chart></pie-chart>
            </div>
          </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            params: this.$route.params,
            currentTask: {},
            currentTopic: null,
            board: {}
        }
    },
    methods: {
        init() {
            this.mountTable();
        },
        mountTable() {
            axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title)
            .then(response => {
                this.board = response.data[0];
            });
        },
        setCurrentTask(task) {
            this.currentTask = task;
        },
        setCurrentTopic(topic) {
            this.currentTopic = topic;
        }
    },
    mounted: function() {
        this.init();
    }
}