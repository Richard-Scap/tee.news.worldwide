var app = angular.module('flapperNews', []);

app.controller('MainCtrl', MainCtrl)

MainCtrl.$inject = ['$scope']

function MainCtrl($scope){
  $scope.addPost = addPost;
  $scope.upvotePost = upvotePost;

  $scope.test = 'Hello world!';
  
  $scope.posts = [
	  {title: 'post 1', upvotes: 5},
	  {title: 'post 2', upvotes: 2},
	  {title: 'post 3', upvotes: 15},
	  {title: 'post 4', upvotes: 9},
	  {title: 'post 5', upvotes: 4}
	];

	function addPost() {
		if(!$scope.title || $scope.title === '') {return alert("Please enter a title.") ;}
		$scope.posts.push({title: $scope.title, upvotes: 0, url: $scope.url})
		$scope.title = ''
	};

	function upvotePost(post) {
		post.upvotes += 1;
	}
};