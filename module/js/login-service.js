(function() {
    "use strict";
    angular.module('login.service', [])
        .factory('LoginService', ['$http', 'domain', 'secret', '$httpParamSerializerJQLike', 'session', '$state', '$ionicHistory',
            function($http, domain, secret, $httpParamSerializerJQLike, session, $state, $ionicHistory) {
                var service = {
                    login: function(user) {
                        return $http.post(domain.api + '/oauth/token', $httpParamSerializerJQLike({
                                grant_type: 'password',
                                username: user.username,
                                password: user.password
                            }), {
                                headers: {
                                    'Authorization': secret.auth,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            })
                            .then(function(response) {
                                session.create(response.data.access_token, user.username);

                                $ionicHistory.nextViewOptions({
                                    disableAnimate: true,
                                    disableBack: true,
                                    historyRoot: true
                                });

                                $state.go('todos');
                            });
                    }
                };
                return service;
            }
        ]);
})();
