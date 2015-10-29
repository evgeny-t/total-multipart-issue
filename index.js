require('total.js').http('debug');

F.route('/', view);
F.route('/', post, { flags: ['upload', 'xss'], length: 1024*1024*1024});

function view () {
    return this.view('index', {});
}


function post () {
    var self = this;

    console.log(self.files.length, self.post);
    if (self.files.length != 50) {
        console.log('Wrong file length. post is ', self.post);
        self.status = 500;
        return self.json({data:{frames: [], message:'multipart form parser error.'}});
    }

    var frames = self.files.map(function (it) { return it; });
    return this.json({
        data: {
            frames: frames
        }
    });
}
