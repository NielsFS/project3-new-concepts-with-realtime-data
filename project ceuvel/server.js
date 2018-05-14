var express = require('express');
var app = express();
var SockJS = require('sockjs-client-node');
const ejs = require('ejs');
var Stomp = require('stompjs');

var http = require('http').Server(app);
var io = require('socket.io')(http);


    app.use(express.static('public'))
    .set('view engine', 'ejs')
    .set('views', 'views')
    .get('/', index)
    .get('/index.html', index)

function index(req, res) {
    res.render('index.ejs',);
}


http.listen(3008, function() {
})

io.on('connection', function(socket){
    console.log('a user connected');
  });


      

// http.listen(3010, function(){
// console.log('listening on *:3010');
// });

const stomp = {
    url: new SockJS('https://app.jouliette.net/stomp/'),
    client: null,
    data: [],
    init(){
      this.client = Stomp.over(this.url);
      this.client.connect('web', 'mnwdTGgQu5zPmSrz', this.onConnect, console.error, '/');
    },
    onConnect(){
      console.log("connected");
  
    //   stomp.client.subscribe("/exchange/power/00", stomp.onData);
      stomp.client.subscribe("/exchange/power/01", stomp.onData);
    },
    onData(data){
      let json = JSON.parse(data.body);
      
      console.log(json);
      io.emit("data", json)
      
    }
  };

stomp.init()

