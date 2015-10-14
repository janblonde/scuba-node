angular.module('diveLog',[])
  .controller('diveLogCtrl', DiveLogCtrl)
  .factory('diveLogApi', diveLogApi)
  .constant('apiUrl','https://unraveling-ng.azurewebsites.net');
  
function DiveLogCtrl($scope, diveLogApi){
  $scope.dives = [];
  $scope.errorMessage = '';
  $scope.isLoading = isLoading;
  $scope.refreshDives = refreshDives;
  
  var loading = false;
  
  function isLoading(){
    return loading;
  }
  
  function refreshDives(){
    loading = true;
    $scope.dives = [];
    $scope.errorMessage='';
    diveLogApi.getDives()
      .success(function(data){
        $scope.dives = data;
        loading = false;
      })
      .error(function(){
        $scope.errorMessage = "Request failed";
        loading = false;
      });
  }
}

function diveLogApi($http,apiUrl){
  return {
    getDives: function() {
      var url = apiUrl + '/api/backendtest/dives';
      return $http.get(url);
    }
  }
}

// function diveLogApi($q){
//   var dives = [
//   {
//     site: 'Abu Gotta Ramada',
//     location: 'Hurghada, Egypt',
//     depth: 72,
//     time: 54
//   },
//   {
//     site: 'Ponte Mahoon',
//     location: 'Maehbourg, Mauritius',
//     depth: 54,
//     time: 38
//   },
//   {
//     site: 'Molnar Cave',
//     location: 'Budapest, Hungary',
//     depth: 98,
//     time: 62
//   }];
  
//   var counter = 0;
  
//   return {
//     getDives : function () {
//       var deferred = $q.defer();
//       counter++;
//       setTimeout(function(){
//         if(counter%3==0){
//           deferred.reject('Error: counter is ' + counter);
//         }else{
//           deferred.resolve(dives);
//         }
//       },1000);
//       return deferred.promise;
//     }
//   };
// }