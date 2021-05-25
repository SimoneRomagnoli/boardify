const HeadersRow = {
    props: ["topics"],
    template: 
    `
    <tr>
        <th></th>
        <th class="text-center text-capitalize" v-for="topic in topics" :key="topic">
            {{topic}}
            <button v-if="currentUser === params.owner" class="btn btn-primary input-group-btn" @click.prevent="">+</button>
        </th>
    </tr>
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

const newTaskModal = {

}

const TaskModal = {
    props: ["task_watch"],
    template: `
      <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-capitalize" id="modalLabel">{{task.name}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body p-0">
          <div class="card-body container-fluid px-1">
            <div class="row px-3">
                <div class="col-8 align-middle py-3">
                    <div>
                        <p class="my-2"><strong>Topic:</strong> {{task.topic}}</p>
                        <p class="my-2"><strong>User:</strong> {{task.user}}</p>
                    </div>
                </div>
                <div class="col-4 align-self-center text-center">
                    <span v-if="task.state === 'TODO'" class="badge badge-danger p-3">{{task.state}}</span>
                    <span v-if="task.state === 'RUNNING'" class="badge badge-warning p-3">{{task.state}}</span>
                    <span v-if="task.state === 'DONE'" class="badge badge-success p-3">{{task.state}}</span>
                </div>
            </div>
            <div class="bg bg-light py-2 rounded container-fluid">
            <div class="row">
                <div class="col-12">
                    <strong>Description:</strong>
                    <p>{{task.description}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <label for="comment"><strong>Comment:</strong></label>
                    <textarea class="w-100 rounded" id="comment" name="comment">{{task.comment}}</textarea>
                    <button v-if="currentUser === task.user" type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="saveComment(task)">Save</button>
                </div>
            </div>
            </div>
          </div>
          
        </div>
        <div class="modal-footer">
          <button v-if="currentUser === task.user" type="button" class="btn btn-info" @click.prevent="removeTask(task)">Remove task</button>
          <button v-if="task.state === 'TODO' && task.user != null && task.user !== '' && currentUser === task.user" type="button" class="btn btn-warning">Start task</button>
          <button v-if="task.state === 'TODO' && (task.user == null || task.user === '')" type="button" class="btn btn-info" @click.prevent="assignTask(task)">Take task</button>
          <button v-if="task.state === 'RUNNING' && currentUser === task.user" type="button" class="btn btn-success">Task finished</button>
        </div>
      </div>
      </div>
      
    `,
    watch: {
      task_watch: function (newVal, oldVal) {
          this.task = newVal;
      }
    },
    data: function() {
        return {
            task: {},
            params: this.$route.params,
            currentUser: null
        }
    },
    methods: {
        assignTask(task) {
            this.task = task;
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/assign", this.task)
            .then(_ => {
                this.task = null;
                this.$router.go();
            });
        },
        removeTask(task) {
            this.task = task;
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/remove", this.task)
            .then(_ => {
                this.task = null;
                this.$router.go();
            });
        },
        saveComment(task) {
            this.task = task;
            this.task.comment = document.getElementById("comment").value;
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/comment", this.task)
            .then(_ => {
                
            });
        }
    },
    mounted: function() {
        axios.get("http://localhost:3000/session/user")
        .then(response => {
            this.currentUser = response.data.username;
        });
    }
}

const TasksRow = {
    props: ["topics", "tasks", "args", "currentTask", "setCurrentTask"],
    template: 
    `
    <tr>
        <td class="font-weight-bold" style="vertical-align: middle">Available Tasks</td>
        <td v-for="topic in topics" :key="topic">
            <ul class="m-0 p-0" style="list-style: none;">
                <li class="my-1" v-for="task in tasks" :key="task" v-if="(task.user===null || task.user==='') && task.topic===topic">
                    <button type="button" v-if="task.state === 'TODO'" class="btn rounded bg-danger text-capitalize text-center text-white w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
                </li>
            </ul>
        </td>
    </tr>
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
      <tr>
          <td style="vertical-align: middle">{{member}}</td>
          <td v-for="topic in topics" :key="topic">
            <ul class="m-0 p-0" style="list-style: none;">
              <li class="my-1" v-for="task in tasks" :key="task" v-if="task.user===member && task.topic===topic">
                <button type="button" v-if="task.state === 'TODO'" class="btn rounded bg-danger text-capitalize text-center text-white w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
                <button type="button" v-if="task.state === 'RUNNING'" class="btn rounded bg-warning text-capitalize text-center w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
                <button type="button" v-if="task.state === 'DONE'" class="btn rounded bg-success text-capitalize text-center text-white w-100" data-toggle="modal" data-target="#taskModal" @click.prevent="setCurrentTask(task)">{{ task.name }}</button>
              </li>
            </ul>
          </td>
      </tr>
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
        'headers': HeadersRow,
        'tasks': TasksRow,
        'row': Row,
        'modal': TaskModal
    },
    template: 
    `
    <div class="bg-white p-3">
        <h1>{{ board.title }}</h1>
        <p>{{ board.description }}</p>
        <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <modal :task_watch="currentTask"></modal>
        </div>
        <table class="table table-bordered">
            <headers :topics="board.topics"></headers>
            <tasks :tasks="board.tasks" :topics="board.topics" :args="params" :setCurrentTask="setCurrentTask"></tasks>
            <row v-for="member in board.members" :key="member" :member="member" :tasks="board.tasks" :topics="board.topics" :args="params" :setCurrentTask="setCurrentTask"></row>
        </table>
    </div>
    `,
    data: function() {
        return {
            params: this.$route.params,
            currentTask: {},
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
            //console.log(task);
            this.currentTask = task;
        }
    },
    mounted: function() {
        this.init();
    }
}