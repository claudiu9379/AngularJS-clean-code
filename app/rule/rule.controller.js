(function() {
    

    angular
        .module('app.rule')
        .controller('RuleController', RuleController);

     RuleController.$inject = ['$uibModal'];

    function RuleController($uibModal) {

        var vm = this;
        vm.name = "test";
        vm.showpopup = showpopup;

        function showpopup()
        {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/rule/rule.popup.view.html',
                controller: 'RulePopupController',
                controllerAs: 'vm',
                size: "lg",
                resolve: {
                    data: function() {
                        return {
                            obj: vm.data.userinput

                        };
                    }
                }
            });
            modalInstance.result.then(function(obj) {
                    if (!obj)
                        return;
                    vm.data.userinput = obj;
            });
                // function() {
                //     $log.info('Modal dismissed at: ' + new Date());
                // };
        }
        function init() {

        }

        init();

    }
})();
