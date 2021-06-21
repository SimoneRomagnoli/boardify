const ExampleBoard = {
    props: ["firstname", "lastname"],
    template: `
    <div class="p-3">
        <h1 class="px-0">Camping</h1>
        <p>Let's prepare everything within a week!</p>
        <div class="container-fluid bg-white shadow rounded-lg p-2">
            <div class="row mx-1">
                <div class="col font-weight-bold py-2 rounded-lg m-2">
                    <button class="rounded border-0 align-self-center bfy-bg-green text-white pull-left">Add Users</button>
                    <button class="rounded border-0 align-self-center bfy-bg-green text-white pull-right">Add Topic</button>
                </div>
                <div class="col text-center text-capitalize bfy-bg-gray rounded-lg py-2 m-2 font-weight-bold">
                    Food
                    <button class="rounded border-0 align-self-center bfy-bg-green text-white font-weight-bold pull-right">+</button>
                </div>
                <div class="col text-center text-capitalize bfy-bg-gray rounded-lg py-2 m-2 font-weight-bold">
                    Tents
                    <button class="rounded border-0 align-self-center bfy-bg-green text-white font-weight-bold pull-right">+</button>
                </div>
                <div class="col text-center text-capitalize bfy-bg-gray rounded-lg py-2 m-2 font-weight-bold">
                    Games
                    <button class="rounded border-0 align-self-center bfy-bg-green text-white font-weight-bold pull-right">+</button>
                </div>
            </div>
            <div class="row mx-1 my-1">
                <div class="col font-weight-bold py-2 rounded-lg my-2 bfy-bg-gray d-flex align-items-center">
                    Available Tasks
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                                Buy meat<div class="bg-danger ml-auto text-danger rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                                Train building tents<div class="bg-danger ml-auto text-danger rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                                Morning game ideas<div class="bg-danger ml-auto text-danger rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row mx-1 my-1">
                <div class="col py-2 rounded-lg my-2 bfy-bg-gray d-flex align-items-center" style="vertical-align: middle">
                {{firstname}} {{lastname}}
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                            Buy water<div class="bg-warning ml-auto rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                            Afternoon game ideas<div class="bg-warning ml-auto rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row mx-1 my-1">
                <div class="col py-2 rounded-lg my-2 bfy-bg-gray align-items-center d-flex" style="vertical-align: middle">
                    Bob Williams
                    <button class="rounded border-0 btn-danger text-white font-weight-bold ml-auto">X</button>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                            Buy dishes<div class="bg-success ml-auto rounded-circle p-2"></div>
                            </button>
                        </li>
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                            Buy pasta<div class="bg-danger ml-auto rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                            Buy tents<div class="bg-success ml-auto rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                    </ul>
                </div>
            </div>
            <div class="row mx-1 my-1">
                <div class="col py-2 rounded-lg my-2 bfy-bg-gray align-items-center d-flex" style="vertical-align: middle">
                    Alice Smith
                    <button class="rounded border-0 btn-danger text-white font-weight-bold ml-auto">X</button>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                            Call for tents' reservation<div class="bg-danger ml-auto rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="m-0 p-0" style="list-style: none;">
                        <li class="py-0 my-2">
                            <button type="button" class="btn btn-light text-capitalize w-100 d-flex align-items-center">
                            Night game ideas<div class="bg-success ml-auto rounded-circle p-2"></div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>    
    </div>
    `
}

const About = {
    components: {
        'example': ExampleBoard
    },
    template: `
    <div>
        <div class="ml-2 mt-2">
            <h2 class="mt-2">What is Boardify?</h2>
            <p>
                Boardify is a web service that helps you encouraging a vertical vision of your projects and providing a tool for splitting work into topics and tasks.
                <br>
                Moreover, it improves a team's communication with a simple way of expressing progress.
            </p>
        </div>
        <div class="ml-2 mt-2">
            <h4 class="mt-2">How does it work?</h4>
            <p>
                It is true that "team-work does the dream work", but it has to be efficient.
                <br>
                Suppose you are planning to go camping with your friends:
                <br>
                the best approach for effeciently preparing everything is to identify every <strong>task</strong> to be carried out and understand which topic it belongs to.
                <br>
                First, you should identify your <strong>topics</strong>: general categories that classify the tasks;
                <br>
                if you are going camping fore some days, you should need different types of food, some tents and lots of game ideas to have fun.
                <br>
                Then, you can think about the main tasks you need to carry out for each topic. 
                <br>
                Once you created enough tasks, your fellow friends can "take" a task, leave comments and change their status:
                <br>
                the general workflow of a task is TODO <i class="fas fa-arrow-right"></i> RUNNING <i class="fas fa-arrow-right"></i> DONE.
                <br>
                You can also add users, topics and tasks in a second moment.
                <br>
                The result should be something like this:
            </p>
        </div>
        <div class="mt-2 row">
            <div class="col-sm-10">
                <example :firstname="session_user.firstname" :lastname="session_user.lastname"></example>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            session_user: {}
        }
    },
    methods: {
        init() {
            this.getSessionUser()
            .then(response => {
                this.session_user = response.data;
            });
        }
    },
    mounted: function() {
        this.init()
    }
}