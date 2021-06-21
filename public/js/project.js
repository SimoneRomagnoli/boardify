const Project = {
    template: `
    <div>
      <section class="min-vh-100 py-5">
        <div class="container">
          <div class="row justify-content-center pt-6">
            <div class="col-xl-4 col-lg-5 col-md-6">
              <div class="text-center mb-4">
                <h1 class="mb-1">Create a new project</h1>
              </div>
              <div class="card-body border rounded-lg bfy-bg-table-cell">
                <form method="POST">
                  <div class="form-group mb-0">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      id="title"
                      class="form-control mb-2"
                      v-model="board.title"
                    />
                    <p v-if="msg != null">{{msg}}</p>
                  </div>
                  <div class="form-group mb-0">
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Description"
                      id="description"
                      class="form-control mb-2"
                      v-model="board.description"
                    ></textarea>
                  </div>
                  <div class="form-group mb-0">
                    <div class="input-group mb-2">
                      <input
                          type="text"
                          name="member"
                          placeholder="Member"
                          id="member"
                          class="form-control"
                          v-model="member"
                      />
                      <button class="btn btn-success input-group-btn ml-1" @click.prevent="addMember">+</button>
                    </div>
                    <p v-if="error.present">{{error.message}}</p>
                    <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between align-items-center py-1 pr-0 pl-3" v-for="member in board.members" :key="member">
                        {{member}}
                        <a href="#" class="badge badge-danger float-right mr-2" @click.prevent="removeMember(member)">X</a>
                      </li>
                    </ul>
                  </div>
                  <div class="form-group mb-0 mt-2">
                    <div class="input-group mb-2">
                      <input
                          type="text"
                          name="topic"
                          placeholder="Topic"
                          id="topic"
                          class="form-control"
                          v-model="topic"
                      />
                      <button class="btn btn-success input-group-btn ml-1" @click.prevent="addTopic">+</button>
                    </div>
                    <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between align-items-center py-1 pr-0 pl-3" v-for="topic in board.topics" :key="topic">
                        {{topic}}
                        <a href="#" class="badge badge-danger float-right mr-2" @click.prevent="removeTopic(topic)">X</a>
                      </li>
                    </ul>
                  </div>
                  <button @click.prevent="create" class="btn-block btn btn-success mt-2">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    `,
    data: function() {
        return {
            board: {
                title: "",
                description: "",
                members: [],
                topics: []
            },
            member: "",
            topic: "",
            error: {
                present: false,
                message: ""
            },
            msg: null
        }
    },
    methods: {
        addMember() {
            axios.get(this.$host + `api/users/${this.member}`)
                .then(response => {
                    if(response.data["error"]) {
                        this.error.present = true;
                        this.error.message = response.data["error"];
                        this.member = "";
                    }
                    else if(response.data["username"]) {
                        this.error.present = false;
                        if(!this.board.members.includes(this.member)) {
                            this.board.members.push(this.member);
                        }
                        this.member = "";
                    }
                });
        },
        removeMember(member) {
            const index = this.board.members.indexOf(member);
            this.board.members.splice(index,1);
        },
        addTopic() {
          if(!this.board.topics.includes(this.topic)) {
            this.board.topics.push(this.topic);
          }
          this.topic = "";
        },
        removeTopic(topic) {
          const index = this.board.topics.indexOf(topic);
          this.board.topics.splice(index,1);
        },
        create() {
            axios.post(this.$host + "api/project", this.board)
            .then(response => {
                this.msg = response.data["message"];
                if(this.msg == null) location.replace("http://localhost:3000/");
            });
        }
    }
}