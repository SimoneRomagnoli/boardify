const NavButton = {
  props: ["text", "route"],
  template: 
  `
  <li class="nav-item">
    <router-link class="nav-link" :to="{name:route}">{{text}}</router-link>
  </li>
  `
}

const Navbar = {
  components: {
    'navbutton': NavButton
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div id="navbarNav">
      <ul class="navbar-nav">
        <navbutton text="Home" route="/"></navbutton>
        <navbutton text="Users" route="/users"></navbutton>
      </ul>
    </div>
  </nav>
  `
}