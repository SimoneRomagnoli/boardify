const SettingsModal = {
    props: ['user'],
    template: `
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-capitalize">Change user bio</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body p-0">
                <div class="card-body container-fluid px-1">
                    <div class="bg bg-light py-2 rounded container-fluid">
                        <div class="row">
                            <div class="col-sm-2 p-2 my-0 mx-2">
                                <label class="my-0 text-capitalize" for="firstname">Firstname:</label>
                            </div>
                            <div class="col-sm p-2 my-0 mx-2">                            
                                <input type="text" class="w-100 my-0 rounded border" id="firstname" name="firstname" :value="user.firstname">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2 p-2 my-0 mx-2">
                                <label class="my-0 text-capitalize" for="lastname">Lastname:</label>
                            </div>
                            <div class="col-sm p-2 my-0 mx-2">                            
                                <input type="text" class="w-100 my-0 rounded border" id="lastname" name="lastname" :value="user.lastname">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2 p-2 my-0 mx-2">
                                <label class="my-0 text-capitalize" for="email">Email:</label>
                            </div>
                            <div class="col-sm p-2 my-0 mx-2">                            
                                <input type="text" class="w-100 my-0 rounded border" id="email" name="email" :value="user.email">
                            </div>
                        </div>
                        <div v-if="error.present">
                            <p>{{error.message}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="bfy-bg-card-button text-white rounded-lg border-0 p-2" @click.prevent="change">Change</button>
            </div>
        </div>
      </div>
    `,
    data() {
        return {
            user: this.user,
            error: {
                present: false,
                message: ""
            }
        }
    },
    methods: {
        change() {
            const newUser = {
                username: this.user.username,
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                email: $("#email").val()
            }
            axios.put(this.$host + "api/users/" + this.user.username, newUser)
            .then(response => {
                if(response.data.error) {
                    this.error.present = true;
                    this.error.message = response.data.error;
                } else {
                    this.$router.go();
                }
            });
        }
    }
}

const PasswordModal = {
    template: `
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-capitalize" id="passwordModalLabel">Change password</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body p-0">
                <div class="card-body container-fluid px-1">
                    <div class="bg bg-light py-2 rounded container-fluid">
                        <div class="row m-2 p-2">
                            <div class="col-sm p-2 my-0 mx-2">
                                <label class="my-0" for="old-password">Old Password:</label>
                            </div>
                            <div class="col-sm p-2 my-0 mx-2">                            
                                <input type="password" class="w-100 my-0 rounded border" id="old-password" name="old-password">
                            </div>
                        </div>
                        <div class="row m-2 p-2">
                            <div class="col-sm p-2 my-0 mx-2">
                                <label class="my-0" for="new-password">New Password:</label>
                            </div>
                            <div class="col-sm p-2 my-0 mx-2">                            
                                <input type="password" class="w-100 my-0 rounded border" id="new-password" name="new-password">
                            </div>
                        </div>
                        <div class="row m-2 p-2">
                            <div class="col-sm p-2 my-0 mx-2">
                                <label class="my-0" for="repeat-password">Confirm Password:</label>
                            </div>
                            <div class="col-sm p-2 my-0 mx-2">                            
                                <input type="password" class="w-100 my-0 rounded border" id="repeat-password" name="repeat-password">
                            </div>
                        </div>
                        <div v-if="error.present">
                            <p>{{error.message}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="bfy-bg-card-button text-white rounded-lg border-0 p-2" @click.prevent="changePassword()">Change</button>
            </div>
        </div>
      </div>
    `,
    data() {
        return {
            error: {
                present: false,
                message: ""
            }
        }
    },
    methods: {
        changePassword() {
            const body = {
                oldPassword: document.getElementById("old-password").value,
                newPassword: document.getElementById("new-password").value,
                repeatPassword: document.getElementById("repeat-password").value
            }
            axios.put(this.$host + "api/user/password", body)
            .then(response => {
                if(response.data.error) {
                    this.error.present = true;
                    this.error.message = response.data.error;
                } else {
                    this.$router.go();
                }
            });
        }
    }
}