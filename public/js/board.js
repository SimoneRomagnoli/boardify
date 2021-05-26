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
    props: ["topics", "tasks", "args", "currentTask", "setCurrentTask"],
    template: 
    `
    <div class="row mx-1 my-1">
        <div class="col font-weight-bold py-2 rounded-lg my-2 bfy-bg-table-cell d-flex align-items-center">
            Available Tasks
        </div>
        <div class="col" v-for="topic in topics" :key="topic">
            <ul class="m-0 p-0" style="list-style: none;">
                <li class="py-0 my-2" v-for="task in tasks" :key="task" v-if="(task.user===null || task.user==='') && task.topic===topic">
                    <button type="button" v-if="task.state === 'TODO'" class="btn rounded bg-danger text-capitalize text-center text-white w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
                </li>
            </ul>
        </div>
    </div>
    `
    ,
    data: function() {
        return {
            params: this.args,
            currentTask: this.currentTask,
            myTask: null
        }
    },
    methods: {
        init() {
            this.params = this.$route.params;
        }
    },
    mounted: function() {
        this.init();
    }
}

const Row = {
    props: ["member", "topics", "tasks", "args", "setCurrentTask"],
    template: 
    `
      <div class="row mx-1 my-1">
          <div class="col py-2 rounded-lg my-2 bfy-bg-table-cell d-flex align-items-center" style="vertical-align: middle">{{member}}</div>
          <div class="col" v-for="topic in topics" :key="topic">
            <ul class="m-0 p-0" style="list-style: none;">
              <li class="py-0 my-2" v-for="task in tasks" :key="task" v-if="task.user===member && task.topic===topic">
                <button type="button" v-if="task.state === 'TODO'" class="btn rounded bg-danger text-capitalize text-center text-white w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
                <button type="button" v-if="task.state === 'RUNNING'" class="btn rounded bg-warning text-capitalize text-center w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
                <button type="button" v-if="task.state === 'DONE'" class="btn rounded bg-success text-capitalize text-center text-white w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
              </li>
            </ul>
          </div>
      </div>
    `,
    data: function() {
        return {
            task: null,
            params: this.args
        }
    }
}

const Board = {
    components: {
        'topics': TopicsRow,
        'tasks': TasksRow,
        'row': Row,
        'task-modal': TaskModal,
        'new-task-modal': NewTaskModal,
        'new-topic-modal': NewTopicModal
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
          <new-topic-modal></new-task-modal>
        </div>
        <div class="container-fluid bg-white shadow rounded-lg p-2">
            <topics :topics="board.topics" :setCurrentTopic="setCurrentTopic"></topics>
            <tasks :tasks="board.tasks" :topics="board.topics" :args="params" :setCurrentTask="setCurrentTask"></tasks>
            <row v-for="member in board.members" :key="member" :member="member" :tasks="board.tasks" :topics="board.topics" :args="params" :setCurrentTask="setCurrentTask"></row>
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