const Board = {
    template: 
    `
    <div class="bg-white h-100">
        <h1>{{ $route.params.title }}</h1>
        <table>
            {{board}}
        </table>
    </div>
    `,
    data: function() {
        return {
            params: null,
            board: null
        }
    },
    methods: {
        init() {
            this.params = this.$route.params;
            this.mountTable();
        },
        mountTable() {
            axios.get("http://localhost:3000/api/board/"+this.params.owner+"/"+this.params.title)
            .then(response => {
                this.board = response.data;
            });
        }
    },
    mounted: function() {
        this.init();
    }
}