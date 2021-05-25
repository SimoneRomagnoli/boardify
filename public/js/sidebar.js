const Sidebutton = {
    props: ["text", "route", "icon"],
    template: `
        <li class="nav-item rounded bfy-bg-button mb-2 row">
            <router-link class="nav-link text-white px-0 w-100" :to="route">
                <i :class="icon" class="text-white align-self-center px-2"></i>
                {{text}}
            </router-link>
        </li>
  `
}

const Sidebar = {
    components: {
        'sidebutton': Sidebutton
    },
    template: `
    <div class="d-flex flex-column flex-shrink-0 bfy-bg-sidebar p-2">
        <a href="/" class="d-flex align-items-center text-white p-2 mt-2">
            <h2>Boardify</h2>
        </a>
        <ul class="mb-auto rounded nav nav-pills flex-column p-3">
            <sidebutton text="Dashboard" route="/" icon="fa fa-tachometer"></sidebutton>
            <sidebutton text="New Project" route="/project" icon="fa fa-plus-square"></sidebutton>
            <sidebutton text="Profile" route="/profile" icon="fa fa-user"></sidebutton>
        </ul>
        <div class="dropdown">
            <ul class="rounded nav nav-pills flex-column p-3">
                <sidebutton text="About" route="/about" icon="fa fa-info-circle"></sidebutton>
                <sidebutton text="Settings" route="/settings" icon="fa fa-gear"></sidebutton>
                <li class="nav-item rounded bfy-bg-button mb-2 row">
                    <i class="fa fa-sign-out text-white align-self-center p-2"></i>
                    <a class="nav-link text-white px-0 mx-0" href="/logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
    `
}