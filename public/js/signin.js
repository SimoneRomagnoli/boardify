const Signin = {
    template: `
    <div>
        <section class="min-vh-100 py-5">
            <div class="container">
            <div class="row justify-content-center pt-6">
                <div class="col-xl-4 col-lg-5 col-md-6">
                <div class="text-center mb-4">
                    <h1 class="mb-1">Sign in to Boardify</h1>
                </div>
                <form action="/api/signin" method="POST">
                    <div class="form-group mb-0">
                    <input type="text" name="username" placeholder="Username" id="username" class="form-control mb-2" />
                    </div>
                    <div class="form-group mb-0">
                    <input type="password" name="password" placeholder="Password" id="password" class="form-control mb-2" />
                    </div>
                    <button type="submit" class="btn-block btn btn-success mt-2">Sign in</button>
                </form>
                <hr />
                <div class="text-center text-small text-muted">
                    <span>Don't have an account yet? <router-link to="/signup">Sign up</router-link>
                    </span>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>

    `
}