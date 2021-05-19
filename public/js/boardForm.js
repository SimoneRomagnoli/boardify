const BoardForm = {
    template: `
    <div>
      <section class="min-vh-100 py-5">
        <div class="container">
          <div class="row justify-content-center pt-6">
            <div class="col-xl-4 col-lg-5 col-md-6">
              <div class="text-center mb-4">
                <h1 class="mb-1">Create new project</h1>
              </div>
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
                  <div v-for="member in board.members" :key="member">
                    <div>
                      <p>{{member}}</p>
                      <button @click.prevent="remove(member)">x</button>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="member"
                    placeholder="Member"
                    id="member"
                    class="form-control mb-2"
                    v-model="member"
                  /> 
                  <button @click.prevent="add">+</button>
                  <p v-if="error.present">{{error.message}}</p>
                </div>
                <button @click.prevent="create" class="btn-block btn btn-success mt-2">
                  Create
                </button>
              </form>
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
                members: []
            },
            member: "",
            error: {
                present: false,
                message: ""
            },
            msg: null
        }
    },
    methods: {
        add() {
            axios.get(`http://localhost:3000/api/users/${this.member}`)
                .then(response => {
                    if(response.data["error"]) {
                        this.error.present = true;
                        this.error.message = response.data["error"];
                    }
                    else if(response.data["username"]) {
                        this.error.present = false;
                        this.board.members.push(this.member);
                        this.member = "";
                    }
                });
        },
        remove(member) {
            this.board.members.pop(member);
        },
        create() {
            axios.post("http://localhost:3000/api/project", this.board)
            .then(response => {
                this.msg = response.data["message"];
                if(this.msg == null) location.replace("http://localhost:3000/");
            });
        }
    }
}