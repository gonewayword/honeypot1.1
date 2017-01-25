angular.module('app.bankAuth', [])

    .controller('BankCtrl',

        function($scope, $location, $http) {
            $scope.checkingName;
            $scope.savingsName;
            var checkingHandler = Plaid.create({
                selectAccount: true,
                env: 'tartan',
                clientName: 'Client Name',
                key: 'b7491cfbd7c72652af1c7bf9c9b667',
                product: 'auth',
                onLoad: function() {
                    // The Link module finished loading.
                },
                onSuccess: function(token, metadata) {
                    $scope.checkingName = metadata.account.name;
                    $scope.$apply();

                    console.log('metadata>>>>>>>>>>>>>>', metadata);
                    console.log('checking token: ', token)
                    console.log('checking id: ', metadata.account.id);
                    $http.post('https://tartan.plaid.com/exchange_token', token, metadata.account.id)
                },
                onExit: function() {
                    console.log('user closed');
                }
            });
            var savingsHandler = Plaid.create({
                selectAccount: true,
                env: 'tartan',
                clientName: 'Client Name',
                key: 'b7491cfbd7c72652af1c7bf9c9b667',
                product: 'auth',
                onLoad: function() {
                    // The Link module finished loading.
                },
                onSuccess: function(token, metadata) {
                    $scope.savingsName = metadata.account.name;
                    $scope.$apply();
                    console.log('savings token: ', token);
                    console.log('savings id: ', metadata.account.id);
                },
                onExit: function() {
                    console.log('user closed');
                }
            });

            $scope.openSavings = function() {
                savingsHandler.open();
            };
            $scope.openChecking = function() {
                checkingHandler.open();
            };

            $scope.goToFirstPet = function() {
               $location.path('/firstPet');
             };
        }
    );