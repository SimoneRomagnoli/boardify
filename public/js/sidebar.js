const Sidebutton = {
    props: ["text", "route"],
    template: `
        <li class="nav-item border border-primary mb-2">
            <router-link class="nav-link" :to="route">{{text}}</router-link>
        </li>
  `
}

const Sidebar = {
    components: {
        'sidebutton': Sidebutton
    },
    template: `
      <aside class="col-2 vh-100">
        <ul class="nav d-flex flex-column bg-white p-2 border border-primary h-75">
          <sidebutton text="Dashboard" route="/"></sidebutton>
          <sidebutton text="New Project" route="/project"></sidebutton>
          <hr/>
          <hr/>
          <hr/>
          <sidebutton text="About" route="/about"></sidebutton>
          <sidebutton text="Settings" route="/settings"></sidebutton>
          <li class="nav-item border border-primary">
            <a class="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
      </aside>
    `
}