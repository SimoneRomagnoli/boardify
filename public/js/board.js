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

const TaskModal = {
    props: ["args"],
    template:
    `
      <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
      </div>
    `,
    data: function () {
        return {
            task: null,
            params: this.args
        }
    },
    methods: {
        init() {
            //this.mountTask();
        },
        mountTask() {
            axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/"+this.params.task)
                .then(response => {
                    this.task = response.data[0];
                });
        }
    },
    mounted: function () {
        this.init();
    }

}

const TasksRow = {
    props: ["topics", "tasks", "args"],
    template: 
    `
    <tr>
        <td class="text-center font-weight-bold">Available Tasks</td>
        <td v-for="topic in topics" :key="topic" class="p-2">
          <a href="" class="border rounded border-dark bg-danger text-capitalize text-white m-2" v-for="task in tasks" :key="task" v-if="task.user===null && task.topic===topic">{{ task.name }}</a>
        </td>
    </tr>
    `
    ,
    data: function() {
        return {
            params: this.args,
            task: null
        }
    },
    methods: {
        init() {
            this.params = this.$route.params;
        },
        assignTask(task) {
            this.task = task;
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/assign", this.task)
            .then(response => {
                this.task = null;
                location.replace("http://localhost:3000/"); // load home page but need to reload page
            });
        }
        //@click.prevent="assignTask(task)"
    },
    mounted: function() {
        this.init();
    }
}

const Row = {
    props: ["member", "topics", "tasks", "args"],
    template: 
    `
      <tr>
          <td class="text-center font-weight-bold" style="vertical-align: middle">{{member}}</td>
          <td v-for="topic in topics" :key="topic">
            <button type="button" class="btn border rounded border-dark bg-danger text-capitalize text-center text-white" data-toggle="modal" data-target="#taskModal" v-for="task in tasks" :key="task" v-if="task.user===member && task.topic===topic">{{ task.name }}</button>
          </td>
      </tr>
    `,
    data: function() {
        return {
            task: null,
            params: this.args
        }
    },
    methods: {
        removeTask(task) {
            this.task = task;
            console.log(this.task)
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/remove", this.task)
            .then(response => {
                this.task = null;
                location.replace("http://localhost:3000/"); // load home page but need to reload page
            });
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
        <!--<modal :args="args"></modal>-->
        <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-bordered">
            <headers :topics="board.topics"></headers>
            <tasks :tasks="board.tasks" :topics="board.topics" :args="params"></tasks>
            <row v-for="member in board.members" :key="member" :member="member" :tasks="board.tasks" :topics="board.topics" :args="params"></row>
        </table>
    </div>
    `,
    data: function() {
        return {
            params: this.$route.params,
            board: {},
            showModal: false
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
        }
    },
    mounted: function() {
        this.init();
    }
}