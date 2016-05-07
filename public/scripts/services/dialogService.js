/*dialogs centralize*/
function centerModals() {
    var dialogs = $(".modal-dialog");
    for (var i = 0; i < dialogs.length; i++) {
        var $dialog = $(dialogs[i]);
        var $content = $dialog.find('.modal-content');
        var offsettop = ($(window).height() - $dialog.height()) / 2;
        var offsetleft = ($(window).width() - $content.width()) / 2;
        // Center modal vertically in window
        $dialog.css("margin-top", offsettop);
        // Center modal horizontal in window
        $dialog.css("margin-left", offsetleft);
        // show dialog
        $dialog[0].style.display = "block";
    }
};

angular.module('auction').service('$dialog', function ($modal, $log, $timeout) {
	
	this.errorDialog = function (options, callback) {
        options = _.extend(options || {}, {
            windowClass: 'default-modal',
            templateUrl: 'scripts/dialogs/templates/error.html'
        });
        open(options, callback);
    };
    
    function open(options, callback) {
        var modalInstance = $modal.open(_.extend(options, {
            backdrop: 'static',
            controller: createController(options)
        }));

        function createController() {
            return ['$scope', '$modalInstance', '$timeout',
                function ($scope, $modalInstance, $timeout) {
                    $scope.header = options.header;
                    $scope.content = options.content;
                    $scope.buttonOK = options.buttonOK || 'OK';
                    $scope.buttonYes = options.buttonYes || 'Yes';
                    $scope.buttonNo = options.buttonNo || 'No';
                    $scope.buttonCancel = options.buttonCancel || 'Cancel'

                    $scope.result = {
                        yes: 0,
                        no: 1,
                        cancel: 2
                    };

                    $scope.close = function (result) {
                        $modalInstance.close(result);
                    };
                }
            ]
        };

        $timeout(function () {
            centerModals();
        }, 1000);

        modalInstance.result.then(function (result) {
            if (callback) {
                callback(result);
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    this.openDialog = function (options, callback) {
    	var modalInstance = $modal.open(_.extend(options, {
            backdrop: 'static',
            controller: options.controller
        }));

        modalInstance.result.then(function (result) {
            if (callback) {
                callback(result);
            }
        });

        $timeout(function () {
            centerModals();
        }, 1000);
    };
});