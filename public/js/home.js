const Home = {
    components: {
        'sidebar': Sidebar,
        'dashboard': Dashboard
    },
    template: `
    <div class="container-fluid" style="min-height:90vh;">
        <div class="row p-3" style="min-height: 90vh;">
            <sidebar class="col-sm-2 nav flex-column nav-pills border rounded"></sidebar>
            <dashboard class="col-sm-10 px-4"></dashboard>
        </div>
    </div>
    `
 }
