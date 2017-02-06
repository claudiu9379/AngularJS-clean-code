(function() {
    'use strict';

    angular
        .module('app.rule')
        .controller('RulePopupController', RulePopupController);

    RulePopupController.$inject = ['$uibModalInstance', 'data'];

    function RulePopupController($uibModalInstance, data) {

        var vm = this;

        vm.data = data.obj;

        vm.ok = ok;
        vm.cancel = cancel;


        function ok() {
            $uibModalInstance.close(vm.data);


        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };






        function init() {

          
        }

        init();



    }
})();
