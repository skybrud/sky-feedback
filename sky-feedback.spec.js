(function() {
	'use strict';

	describe('Directive: sky-feedback',function() {
		beforeEach(module('skyFeedback'));

		var $compile,
			$rootScope,
			scope,
			$httpBackend,
			$timeout,
			element;

		beforeEach(inject(function(_$rootScope_,_$compile_,_$httpBackend_,_$timeout_) {
			$compile = _$compile_;
			$httpBackend = _$httpBackend_;
			$timeout = _$timeout_;
			$rootScope = _$rootScope_;
		}));

		beforeEach(function() {
			element = angular.element('<form sky-feedback ng-init="feedback.name=\'Filip Bech\'; feedback.email=\'fbruun@skybrud.dk\'"><input ng-model="feedback.name"/><input ng-model="feedback.email" /><button>Send</button></form>');
			$compile(element)($rootScope);
			$rootScope.$digest();
			scope = element.scope();
		});

		it('should POST the data when form is submitted', function() {
			element.triggerHandler('submit');

			var response = JSON.stringify({
				data: {
					msg:'success'
				}
			});

			$httpBackend.expect('POST','/umbraco/Feedback/Frontend/PostFeedback', 'name=Filip+Bech&email=fbruun%40skybrud.dk').respond(200,response);
			$timeout.flush();
			$httpBackend.flush();
		});

		it('should handle success', function() {
			expect(scope.error).not.toBeDefined();
			expect(scope.success).not.toBeDefined();

			element.triggerHandler('submit');

			var response = JSON.stringify({
				data: {
					msg:'success'
				}
			});

			$httpBackend.when('POST','/umbraco/Feedback/Frontend/PostFeedback', 'name=Filip+Bech&email=fbruun%40skybrud.dk').respond(200,response);
			$timeout.flush();
			$httpBackend.flush();

			expect(scope.error).not.toBeDefined();
			expect(scope.success).toBeDefined();
		});

		it('should handle errors', function() {
			expect(scope.error).not.toBeDefined();
			expect(scope.success).not.toBeDefined();

			element.triggerHandler('submit');

			var response = JSON.stringify({
				data: {
					error: {
						msg: 'error'
					}
				}
			});

			$httpBackend.when('POST','/umbraco/Feedback/Frontend/PostFeedback', 'name=Filip+Bech&email=fbruun%40skybrud.dk').respond(500,response);
			$timeout.flush();
			$httpBackend.flush();

			expect(scope.error).toBeDefined();
			expect(scope.success).not.toBeDefined();
		});


		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});


	});



})();
