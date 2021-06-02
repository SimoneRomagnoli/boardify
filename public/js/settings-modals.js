const SettingsModal = {
    props: ['field', 'value', 'modalId'],
    template: `
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-capitalize" :id="modalId">Change {{field}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body p-0">
                <div class="card-body container-fluid px-1">
                    <div class="bg bg-light py-2 rounded container-fluid">
                        <div class="row">
                            <div class="col-sm-2 p-2 my-0 mx-2">
                                <label class="my-0 text-capitalize" :for="field">{{field}}:</label>
                            </div>
                            <div class="col-sm p-2 my-0 mx-2">                            
                                <input type="text" class="w-100 my-0 rounded border" :id="field" :name="field" :value="value">
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
            field: this.field,
            error: {
                present: false,
                message: ""
            }
        }
    },
    methods: {
        change() {
            const elem = {
                [this.field]: document.getElementById(this.field).value
            }
            axios.put("http://localhost:3000/api/user/"+this.field, elem)
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