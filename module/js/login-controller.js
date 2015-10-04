(function() {
    "use strict";

    angular.module('login.controller', [])
        .controller('LoginCtrl', ['LoginService', function(LoginService) {
            var self = this;

            self.signIn = function(user, signInForm) {
                self.user = {};
                signInForm.$setPristine();
                LoginService.login(user)
                    .catch(function() {
                        alert('fail');
                    });
            };
        }]);
})();
