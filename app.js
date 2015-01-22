
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));

app.listen(port);

console.log('server started on port: ' + port );

app.get('/', function(req, res){
	res.render('index', {
		title: '首页'
	});
});

app.get('/admin/:id', function(req, res){
	res.render('detail', {
		title: '详情页'
	});
});

app.get('/admin/list', function(req, res){
	res.render('list', {
		title: '列表页'
	});
});

app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title: '后台录入页'
	});
});