const Profile = {
    template: `
    <div>
        <h1>Users</h1>
        <div class="row">
            <div class="col">
                <div class="row no-gutters">
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Username: {{profile.username}}</h5>
                            <p class="card-text">Email: {{profile.email}}</p>
                            <p class="card-text">Password: {{profile.password}}</p>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function (){
        return {
            profile: []
        }
    },
    methods: {
        init() {
            this.getProfile();
        },
        getProfile() {
            axios.get("http://localhost:3000/api/profile")
            .then( response => {
                this.profile = response.data;
            })
        },
        replaceByDefault(e){
            e.target.src = "https://icon-library.net//images/not-found-icon/not-found-icon-4.jpg"
        }
    },
    mounted: function(){
        this.init();
    }
}