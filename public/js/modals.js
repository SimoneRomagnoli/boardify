const NewTaskModal = {
    props: ["topic_watch"],
    template: `
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-capitalize" id="newTaskModalLabel">{{topic}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body p-0">
                <div class="card-body container-fluid px-1">
                    <div class="bg bg-light py-2 rounded container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <label for="name"><strong>Name:</strong></label>
                                <input type="text" class="w-100 rounded border" id="name" name="name"><br>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <label for="description"><strong>Description:</strong></label>
                                <textarea class="w-100 rounded border" id="description" name="description"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="bfy-bg-card-button text-white rounded-lg border-0 p-2" data-dismiss="modal" @click.prevent="createTask()">Create Task</button>
            </div>
        </div>
      </div>
    `,
    watch: {
        topic_watch: function (newVal, oldVal) {
            this.topic = newVal;
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
        }
    },
    data: function() {
        return {
            topic: {},
            params: this.$route.params
        }
    },
    methods: {
        createTask() {
            const task = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                topic: this.topic,
                user: null,
                state: "TODO",
                comment: ""
            }

            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/newTask", task)
            .then(_ => {
                this.topic = null;
                this.$router.go();
            });
        }
    }
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