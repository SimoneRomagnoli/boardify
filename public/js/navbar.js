const NavButton = {
  props: ["route", "icon"],
  template: 
  `
  <li class="nav-item rounded d-inline-flex p-0">
    <router-link class="nav-link" :to="route">
      <i :class="icon" class="text-white bfy-navbar-icon align-self-center p-0"></i>
    </router-link>
  </li>
  `
}

const Navbar = {
  components: {
    'navbutton': NavButton
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bfy-bg-navbar">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
          aria-controls="navbar" aria-expanded="false" aria-label="toggle navigation">
      <span class="text-white">
        <i class="fas fa-bars fa-1x"></i>
      </span>
    </button>
    <div class="collapse navbar-collapse nav-item navbar-nav mx-3" id="navbar">
      <router-link to="/">
        <img class="logo" style="max-height: 50px;" src="/static/img/boardify-beaver-logo-big.png" alt="Boardify"></img>
      </router-link>
    </div>
    
    <div class="nav-item pull-right row">
      <ul class="navbar-nav">
        <navbutton class="mr-3" route="/notifications" icon="fa fa-bell"></navbutton>
        <navbutton class="mr-3" route="/project" icon="fa fa-plus-square"></navbutton>
      </ul>
      <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-lg fa-user-circle text-white align-self-center bfy-navbar-icon"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="navbarDropdownMenuLink">
          <router-link class="dropdown-item" to="/about">
            <i class="fa fa-info-circle align-self-center pr-1"></i>
            About
          </router-link>
          <router-link class="dropdown-item" to="/settings">
            <i class="fa fa-gear align-self-center pr-1"></i>
            Settings
          </router-link>
          <a class="dropdown-item" href="/logout">
            <i class="fa fa-sign-out align-self-center pr-1"></i>
            Logout
          </a>
        </div>
      </div>
    </div>
    
  </nav>
  `,
  data: function() {
    return {
      session_user: {},
      profile_path: ""
    }
  },
  methods: {
    init() {
      this.getSessionUser();
    },
    getSessionUser() {
      axios.get("http://localhost:3000/session/user")
          .then( response => {
            this.session_user = response.data.username;
            this.profile_path = "/profile/"+this.session_user;
          })
    }
  },
  mounted: function(){
    this.init();
  }
}