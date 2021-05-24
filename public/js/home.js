const Home = {
    components: {
        'sidebar': Sidebar,
        'dashboard': Dashboard
    },
    template: `
    <div class="container-fluid vh-100">
        <div class="row">
            <sidebar class="col-sm-2 vh-100"></sidebar>
            <dashboard class="col-sm-10 px-4"></dashboard>
        </div>
    </div>
    `
 }
