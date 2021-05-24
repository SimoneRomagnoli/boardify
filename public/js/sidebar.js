const Sidebutton = {
    props: ["text", "route"],
    template: `
        <li class="nav-item rounded bfy-green mb-2">
            <router-link class="nav-link text-white" :to="route">{{text}}</router-link>
        </li>
  `
}

const Sidebar = {
    components: {
        'sidebutton': Sidebutton
    },
    template: `
    <div class="d-flex flex-column flex-shrink-0 bg-dark p-2">
        <a href="/" class="d-flex align-items-center text-white p-2 mt-2">
            <h2>Boardify</h2>
        </a>
        <ul class="mb-auto rounded nav nav-pills flex-column p-2">
            <sidebutton text="Dashboard" route="/"></sidebutton>
            <sidebutton text="New Project" route="/project"></sidebutton>
            <sidebutton text="Profile" route="/profile"></sidebutton>
        </ul>
        <div class="dropdown">
            <ul class="rounded nav nav-pills flex-column p-2">
                <sidebutton text="About" route="/about"></sidebutton>
                <sidebutton text="Settings" route="/settings"></sidebutton>
                <li class="nav-item rounded bfy-green mb-2">
                    <a class="nav-link text-white" href="/logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
    `
}