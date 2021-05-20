const Sidebutton = {
    props: ["text", "route"],
    template: `
        <li class="nav-item rounded mb-2" style="background-color: #9AC8D9;">
            <router-link class="nav-link" :to="route">{{text}}</router-link>
        </li>
  `
}

const Sidebar = {
    components: {
        'sidebutton': Sidebutton
    },
    template: `
    <div class="d-flex flex-column flex-shrink-0 bg-white p-0 m-0">
        <ul class="mb-auto rounded nav nav-pills flex-column p-2">
            <sidebutton text="Dashboard" route="/"></sidebutton>
            <sidebutton text="New Project" route="/project"></sidebutton>
        </ul>
        <div class="dropdown">
            <ul class="mb-auto rounded nav nav-pills flex-column p-2">
                <sidebutton text="About" route="/about"></sidebutton>
                <sidebutton text="Settings" route="/settings"></sidebutton>
                <li class="nav-item rounded mb-2" style="background-color: #8BB8C8;">
                    <a class="nav-link" href="/logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
    `
}