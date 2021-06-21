const NavButton = {
  props: ["route", "icon", "badge"],
  template: 
  `
  <div class="nav-item rounded d-inline-flex p-0">
    <router-link class="nav-link" :to="route">
      <i :class="icon" class="text-white bfy-icon align-self-center p-0"></i><span v-if="badge" class="bfy-notification-badge bg-danger"></span>
    </router-link>
  </div>
  `
}

const Navbar = {
  components: {
    'navbutton': NavButton
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bfy-bg-dark-gray">
    <div class="nav-item navbar-nav mx-3">
      <router-link to="/">
        <img class="logo" style="max-height: 50px;" src="/static/img/boardify-beaver-logo-big.png" alt="Boardify"></img>
      </router-link>
    </div>
    
    <div class="nav-item ml-auto row">
      <navbutton route="/notifications" icon="fa fa-bell" :badge="notifications"></navbutton>
      <navbutton route="/project" icon="fa fa-plus-square" :badge="false"></navbutton>
      <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-lg fa-user-circle text-white align-self-center bfy-icon"></i>
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
  data() {
    return {
      notifications: this.$notifications
    }
  },
  methods: {
    init() {
      this.getSessionUser()
      .then(res => {
        const sessionUser = res.data.username;
        axios.get(this.$host + "api/notification")
        .then(response => {
          this.notifications = 
            this.$notifications ||
            response.data
              .map(not => not.to)
              .map(receivers => { return receivers.filter(receiver => receiver.user === sessionUser)[0] })
              .map(readMap => readMap.read)
              .some(read => !read);
        });
      });
    }
  },
  mounted() {
    this.init();
  }
}