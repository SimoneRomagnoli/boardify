const NavButton = {
  props: ["text", "route"],
  template: 
  `
  <li class="nav-item border rounded">
    <router-link class="nav-link text-white" :to="route">{{text}}</router-link>
  </li>
  `
}

const Navbar = {
  components: {
    'navbutton': NavButton
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div>
      <ul class="navbar-nav">
        <navbutton text="Home" route="/"></navbutton>
      </ul>
    </div>
  </nav>
  `
}