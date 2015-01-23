
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb:localhost/nodeproject');

app.set('views', './views/pages');
app.set('view engine', 'jade');
// 将表单数据格式化
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.listen(port);

console.log('server started on port: ' + port );

app.get('/', function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err);
		}

		res.render('index', {
			title: '首页',
			movies: movies
		});
	})
});

app.get('/movie/:id', function(req, res){
	var id = req.params.id;

	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: '详情页' + movie.title,
			movie: movie
		});
	})
});

app.get('/movie/list', function(req, res){
	res.render('list', {
		title: '列表页',
		movies: [{
			title: '电影名字',
			_id: 1,
			doctor: 'guoyongfeng',
			country: 'china',
			title: 'new films',
			year: 2015,
			poster: '',
			language: 'chinese',
			flash: '',
			summary: ''
		}]
	});
});

app.get('/admin/movie', function(req, res){
	res.render('admin', {
		title: '后台录入页',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: 'http://video.mukewang.com/cad06b14-fd3e-4b9c-8019-d2a167a2ba79/L.flv',
			summary: ''
		}
	});
});

//post 表单内的数据
app.post('/admin/movie/new', function(res, req){
	var id = req.body.movie._id;
	var movieobj = req.body.movie;
	var _movie

	if(id == 'undefined') {
		Movie.findById(id, function(err, movie){
			if (err) {
				console.log(err);
			}

			_movie = _.extend()
		});
	}
})
