(function(){

    angular
        .module('app.todo', ['ngAnimate']) 
        .controller('TodoController', TodoController);

          TodoController.$inject = ['guidService'];

    function TodoController(guidService){
        var vm=this;
        vm.add=add;
        vm.remove=remove;
        vm.todoList = [];
        // vm.markIn=markIn;
        // vm.markOut=markOut;
        
        function add() {
            vm.errortext="";
            var newItem = {
                todoText:vm.todoInput,
                todoGuid:guidService.guid()
            } 
            if (vm.todoInput==null){
                return;   
            }
            var element=_.find(vm.todoList, function(duplicat) {
            return duplicat.todoText==newItem.todoText;
            }); 

            if (element) {
                // window.alert("acest element a mai fost introdus in lista");
                vm.errortext = ("This element has already been added");
                vm.todoInput=undefined;
                return; 
            }  
            
            vm.todoList.push(newItem);
             
            vm.todoInput=undefined;
            vm.errortext="";
        };   
        
        

        function remove(a) {
//add a confirmation dialog; yes or no
//remove from liist th e object with the same guid value as .GUIDS
            vm.todoList = vm.todoList.filter(function(el){
                return el.todoGuid != a.todoGuid; 
            });
            return;
            _.remove(vm.todoList, function(currentObject) {
                return currentObject.todoGuid === a.todoGuid;
            });
   
        };
        vm.hoverIn = function(el){
           el.hoverEdit = true;
        };

        vm.hoverOut = function(el){
            el.hoverEdit = false;
        };
        // function markIn(){
        //     vm.markEdit=true;
        // }
        // function markOut(){
        //     vm.markEdit=false;
        // }
    };

})();    