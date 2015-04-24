/* global angular */
(function () {
	'use strict';

	/**
	 * Directive: skyFeedback
	 * Directive for letting users provide feedback
	 *
	 * Just use the directive on your form-tag, and use
	 * ng-model="feedback.xxx" on your fields. Use ng-init
	 * to set default- and/or hidden values (eg. nodeId)
	 *
	**/

	angular.module('skyFeedback').directive('skyFeedback',skyFeedback);

	skyFeedback.$inject = ['$http','$timeout','transformRequestAsFormPost'];

	function skyFeedback($http,$timeout,transformRequestAsFormPost) {
		var directive = {
			restrict:'A',
			scope:true,
			link:link
		};

		function link(scope,element,attributes) {

			var timer = {};

			element.on('submit', function(event) {
				event.preventDefault();

				$timeout.cancel(timer);

				timer = $timeout(function() {
					/* Do some magic transformRequest-stuff to actually post the data */
					var postFeedback = $http({
						url: '/umbraco/Feedback/Frontend/PostFeedback',
						method:'POST',
						data:scope.feedback,
						transformRequest: transformRequestAsFormPost
					});

					postFeedback.success(function(res) {
						scope.success=res.data.msg;
					}).error(function(res) {
						if (res && res.data && res.data.error && res.data.error.msg) {
							scope.error=res.data.error.msg;
						} else {
							scope.error='Der er desværre sket en ukendt fejl. Prøv venligst igen senere!';
						}
					});

				},200);

				return false;
			});
		}

		return directive;
	}

})();
