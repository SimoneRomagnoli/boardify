const NewUsersModal = {
    template: `
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-capitalize" id="newUserModalLabel">New Users</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body p-0">
                <div class="card-body container-fluid px-1">
                    <div class="bg bg-light py-2 rounded container-fluid">
                        <div class="row">
                            <div class="col form-group mb-0">
                                <div class="input-group mb-2">
                                    <input
                                        type="text"
                                        name="user"
                                        placeholder="User"
                                        id="user"
                                        class="form-control"
                                        v-model="member"
                                    />
                                    <button class="btn btn-success input-group-btn ml-1" @click.prevent="addMember">+</button>
                                </div>
                                <p v-if="error.present">{{error.message}}</p>
                                <ul class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-center py-1 pr-0 pl-3" v-for="user in users" :key="user">
                                        {{user}}
                                        <a href="#" class="badge badge-danger float-right mr-2" @click.prevent="removeMember(user)">X</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="bfy-bg-button text-white rounded-lg border-0 p-2" data-dismiss="modal" @click.prevent="qr()">QR Code</button>
                <button type="button" class="bfy-bg-card-button text-white rounded-lg border-0 p-2" data-dismiss="modal" @click.prevent="addToBoard()">Add</button>
            </div>
        </div>
      </div>
    `,
    data: function() {
        return {
            params: this.$route.params,
            boardMembers: [],
            member: "",
            users: [],
            error: {
                present: false,
                message: ""
            }
        }
    },
    methods: {
        addMember() {
            if(this.boardMembers.includes(this.member)) {
                this.error.present = true;
                this.error.message = "This user is already present in this board.";
                this.member = "";
            } else {
                axios.get(`http://localhost:3000/api/users/${this.member}`)
                    .then(response => {
                        if(response.data["error"]) {
                            this.error.present = true;
                            this.error.message = response.data["error"];
                            this.member = "";
                        }
                        else if(response.data["username"]) {
                            this.error.present = false;
                            if(!this.users.includes(this.member)) {
                                this.users.push(this.member);
                            }
                            this.member = "";
                        }
                    });
            }
        },
        removeMember(member) {
            const index = this.users.indexOf(member);
            this.users.splice(index,1);
        },
        addToBoard() {                
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/newUsers", this.users)
            .then(_ => {
                this.$router.go();
            });
        },
        qr() {
            var element = document.getElementById('qr-here');
            var opt = {
            margin:       1,
            filename:     this.params.owner+"/"+this.params.title,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            
            // New Promise-based usage:
            html2pdf().set(opt).from(element).save();
            
            // Old monolithic-style usage:
            html2pdf(element, opt);
        }
    },
    mounted: function() {
        axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title)
            .then(response => { 
                this.boardMembers = response.data[0].members;
            });
    }
}

const NewTopicModal = {
    template: `
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-capitalize" id="newTopicModalLabel">New Topic</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body p-0">
                <div class="card-body container-fluid px-1">
                    <div class="bg bg-light py-2 rounded container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <label for="topic-name"><strong>Name:</strong></label>
                                <input type="text" class="w-100 rounded border" id="topic-name" name="topic-name"><br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="bfy-bg-card-button text-white rounded-lg border-0 p-2" data-dismiss="modal" @click.prevent="createTopic()">Create Topic</button>
            </div>
        </div>
      </div>
    `,
    data: function() {
        return {
            params: this.$route.params
        }
    },
    methods: {
        createTopic() {
            const topic = {
                name: document.getElementById("topic-name").value
            }
                
            axios.put("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title+"/newTopic", topic)
            .then(_ => {
                this.$router.go();
            });
        }
    }
}

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