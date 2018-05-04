var app = angular.module('myApp', []);

/** CONTROLLER */
app.controller('gmailAuth',function($scope,$http) {
    vm = this;
    vm.leads = [];

    vm.dateOptions = { 'dateFormat': 'yy-mm-dd' };

    // ClientID
    var clientId = $stateParams.id;

    // Loopback access token
    var access_token = $cookies.get('access_token');

    /** Exposed Functions */
    vm.getUserLabels   = getUserLabels;

    /** Run on load */
    vm.gmailLoggedIn = false;

    // Move this to client add/edit controller when ready
    vm.gmailLabels = [];
    function getUserLabels() {
        console.log('getting labels');
            // vm.somemodel = 'yikes';
        gapi.client.gmail.users.labels.list({
            'userId': 'me'
        }).then(function(response) {
            // vm.gmailLabels = angular.copy(response.result.labels);
            vm.gmailLabels = response.result.labels.filter(function(el) {
                return el.type == 'user';
            });
            $scope.$apply(); // probably not needed when coming from the service
        }).catch(function(err) {
            alert(err);
        });
    }


});
