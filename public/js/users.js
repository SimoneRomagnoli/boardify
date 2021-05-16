const Users = {
    template: `
    <h1>Users</h1>
	<div class="row">
		<div class="col">
			<div v-for="user in users" class="card" v-bind:key="user._id">
				<div class="row no-gutters">
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">Username: {{user.username}}</h5>
							<p class="card-text">Email: {{user.email}}</p>
							<p class="card-text">Password: {{user.password}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `,
    data: function (){
        return {
            users: []
        }
    },
    methods: {
        //funzione getUsers
        listUsers() {
            axios.get("http://localhost:3000/users")
            .then( response => {
                this.users = response.data;
            })
        },
        replaceByDefault(e){
            e.target.src = "https://icon-library.net//images/not-found-icon/not-found-icon-4.jpg"
        }
    },
    mounted: function(){
        this.listUsers();
    }
}