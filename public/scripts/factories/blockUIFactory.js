var blocking = {
	blockUI: function(options) {
		var options = $.extend(true, {}, options);
	    var html = '<div class="loading-message"><img src="images/loading-spinner-blue.gif" align=""><span>&nbsp;&nbsp;</span></div>';
	    if (options.target) { // element blocking
	        var el = $(options.target);
	        if (el.height() <= ($(window).height())) {
	            options.cenrerY = true;
	        }            
	        el.block({
	            message: html,
	            baseZ: options.zIndex ? options.zIndex : 1000,
	            centerY: options.cenrerY != undefined ? options.cenrerY : false,
	            css: {
	                top: '10%',
	                border: '0',
	                padding: '0',
	                backgroundColor: 'none'
	            },
	            overlayCSS: {
	                backgroundColor: options.overlayColor ? options.overlayColor : '#000',
	                opacity: options.boxed ? 0.05 : 0.1, 
	                cursor: 'wait'
	            }
	        });
	    } else { // page blocking
	        $.blockUI({
	            message: html,
	            baseZ: options.zIndex ? options.zIndex : 1000,
	            css: {
	                border: '0',
	                padding: '0',
	                backgroundColor: 'none'
	            },
	            overlayCSS: {
	                backgroundColor: options.overlayColor ? options.overlayColor : '#000',
	                opacity: options.boxed ? 0.05 : 0.1,
	                cursor: 'wait'
	            }
	        });
	    }       
	},
	unblockUI: function(target) {
		if (target) {
	        $(target).unblock({
	            onUnblock: function () {
	                $(target).css('position', '');
	                $(target).css('zoom', '');
	            }
	        });
	    } else {
	        $.unblockUI();
	    }
	}
};

angular.module('auction').factory('blockingInterceptor', function ($q, $rootScope) {
	var activeRequests = 0;
    var started = function() {
        if(activeRequests == 0) {
        	blocking.blockUI();
        }    
        activeRequests++;
    };
    var ended = function() {
        activeRequests--;
        if(activeRequests==0) {
        	blocking.unblockUI();
        }
    };
    return {
        request: function (config) {
            started();
            return config || $q.when(config);
        },
        response: function (response) {
            ended();
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            ended();
            return $q.reject(rejection);
        }
    };
})