var app = angular.module('flapperNews', ['ui.router']);


///////////router/////////////

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: '/home.html',
	      controller: 'MainCtrl'
	    })

	   	.state('posts', {
	   		url: '/posts/{id}',
	   		templateUrl: '/posts.html',
	   		controller: 'PostsCtrl'
	   	});

	  $urlRouterProvider.otherwise('home');
	}
]);


////////// Main controller//////////

app.controller('MainCtrl', MainCtrl)

MainCtrl.$inject = ['$scope', 'posts']

function MainCtrl($scope, posts){
  $scope.addPost = addPost;
  $scope.incrementUpvotes = incrementUpvotes;

  $scope.test = 'Hello world!';
  
  $scope.posts = posts.posts;  //theoretical db in memory

	function addPost() {
		if(!$scope.title || $scope.title === '') {return alert("Please enter a title.") ;}

		$scope.posts.push({
			title: $scope.title, 
			upvotes: 0, 
			url: $scope.url,
			comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
    		{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			]
		})
		$scope.title = ''
		$scope.url = ''
	};

	function incrementUpvotes(post) {
		post.upvotes += 1;
	}
};

/////////Posts Controller///////////

app.controller('PostsCtrl', PostsCtrl)

PostsCtrl.$inject = ['$scope', '$stateParams', 'posts']

function PostsCtrl($scope, $stateParams, posts) {
	$scope.post = posts.posts[$stateParams.id]
	$scope.incrementUpvotes = incrementUpvotes;
	$scope.addComment = addComment;

	function incrementUpvotes(comment) {
		comment.upvotes += 1;
	}

	function addComment() {
		$scope.post.comments.push({
			author: 'user',
			body: $scope.body,
			upvotes: 0
		})
		$scope.body = '';
	}
}

////////factory////////////

app.factory('posts', [function(){
	var o = {
		posts: []
	}
	return o;
}]);


