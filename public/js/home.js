const Home = {
    components: {
        'sidebar': Sidebar,
        'dashboard': Dashboard
    },
    template: `
    <div>
        <sidebar class="float-left"></sidebar>
        <dashboard></dashboard>
    </div>
    `
 }
