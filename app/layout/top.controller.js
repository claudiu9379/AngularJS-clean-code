(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('TopController', TopController);

    TopController.$inject = ['$scope', '$state', '$timeout', 'languageService', 'storageService', 'securityApiService', '$uibModal', 'rtmService'];
    /* @ngInject */
    function TopController($scope, $state, $timeout, languageService, storageService, securityApiService, $uibModal, rtmService) {
        //TODO Add menu logic here if necessary
        var vm = this;
        vm.loggedUser = storageService.loggedUser;
        vm.logout = logout;
        vm.language = languageService;
        vm.nick = "";
        vm.messages = [];
        vm.receiveChatMessage = receiveChatMessage;
        vm.receiveComment = receiveComment;

        vm.chatMessage = null;

        function receiveChatMessage(obj) {
            vm.chatMessage = obj;
            vm.messages.push(obj);
            $scope.$digest();
        }

        function receiveComment(obj) {
            debugger;
            var msg = _.find(vm.messages, function(it) {
                return it.id == obj.id;
            });
            if (!msg)
                return;
            msg.comments.push(obj);


            //vm.chatMessage = obj;
            //vm.messages.push(obj);
            //$scope.$digest();
        }

        hello.init({
            facebook: 978667605520024
        }, {
            redirect_uri: 'http://localhost:3002/#/login'
        });

        // hello.init({
        //     facebook: 978667605520024,
        //     windows: WINDOWS_CLIENT_ID,
        //     google: GOOGLE_CLIENT_ID
        // }, {
        //     redirect_uri: 'redirect.html'
        // });

        // vm.loginfacebook = function() {
        //     hello('facebook').login({
        //         scope: 'email',
        //         force: false
        //     }).then(function(usr) {
        //         debugger;
        //         hello('facebook').api('me').then(function(json) {
        //             alert('Your name is ' + json.name);
        //         }, function(e) {
        //             alert('Whoops! ' + e.error.message);
        //         });
        //         alert('You are signed in to Facebook');
        //     }, function(e) {
        //         alert('Signin error: ' + e.error.message);
        //     });
        // }

        //https://github.com/MrSwitch/hello.js/issues/309
        vm.loginfacebook = function() {
            hello('facebook').login({
                scope: 'email',
                force: true
            }).then(function(usr) {
                hello('facebook').api('me/permissions').then(function(r) {
                    if (r.data.filter(function(item) {
                            return item.permission === 'email' && item.status !== 'granted';
                        }).length) {
                        return;
                    } else {
                        hello('facebook').api('me').then(function(json) {
                            var req = json;
                            securityApiService.post("api/security/loginfb", req)
                                .then(function(obj) {
                                    //vm.users.list = obj.data.userss;
                                    if (obj.success == false) {
                                        //debugger;
                                        //vm.language.text
                                        vm.Message = vm.language.text[obj.message];
                                        return;
                                    }
                                    obj.data.avatar = obj.data.fbAvatar;
                                    storageService.setLoggedUser(obj.data, vm.RememberMe);
                                    $state.go("search");
                                });
                        }, function(e) {
                            //alert('Whoops! ' + e.error.message);
                        });
                    }
                }, function(e) {
                    //alert('Signin error: ' + e.error.message);
                });
            }, function(e) {
                //alert('Signin error: ' + e.error.message);
            })
        }



        vm.logoutfacebook = function() {
            hello('facebook').logout().then(function() {
                //alert('Signed out');
            }, function(e) {
                //alert('Signed out error: ' + e.error.message);
            });
        }
        var setNick = function() {
            if (vm.loggedUser) {
                if (vm.loggedUser.nick) {
                    vm.nick = vm.loggedUser.nick;
                } else {
                    var arrayOfStrings = vm.loggedUser.email.split("@");
                    if (arrayOfStrings) {
                        vm.nick = arrayOfStrings[0];
                    }
                }
            }
        };
        setNick();

        var setAvatar = function() {
            if (vm.loggedUser) {
                if (vm.loggedUser.avatar == undefined || (vm.loggedUser.avatar && vm.loggedUser.avatar == "")) {
                    vm.loggedUser.avatar = "styles/no_avatar.jpg";
                }
            }
        }
        setAvatar();

        $scope.$on('userChanged', function() {
            vm.loggedUser = storageService.loggedUser;
            setNick();
            setAvatar();

            if (vm.loggedUser) {
                rtmService.start(vm.loggedUser.userId);
            } else {
                rtmService.stop();
            }
        });



        vm.changeLanguage = function(lang) {
            languageService.changeLanguage(lang);
        };

        vm.gotoChangePassword = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/user/changepassword.view.html',
                controller: 'ChangePasswordController',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        var obj = {
                            message: null
                        };
                        return obj;
                    }
                }
            });
            modalInstance.result.then(function(obj) {

            }, function() {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        function logout() {

            var req = {
                UserGuid: storageService.loggedUser.id
            };

            // securityApiService.logout(req).then(function (obj) {               
            //     storageService.setLoggedUser(null, false);
            //     $state.go("login");
            // })
            securityApiService.post("api/security/logout", req)
                .then(function(obj) {
                    storageService.setLoggedUser(null, false);
                });
        }



        function init() {
            rtmService.subscribe({
                evtName: "receive_msg",
                ctrlName: "top",
                fct: vm.receiveChatMessage
            });

            rtmService.subscribe({
                evtName: "receive_comment",
                ctrlName: "top",
                fct: vm.receiveComment
            });


            if (vm.loggedUser) {
                rtmService.start(vm.loggedUser.id);
            } else {
                rtmService.stop();
            }
        }

        init();



    }
})();
