// Set-up some default configuration for RESTful requests to the service
$.ajaxSetup({

    // do not do any processing of the data object being passed through the contorller
    processData: false,

    // automatically stringify JSON objects for RESTful requests to the service
    beforeSend: function(jqXHR, options)
    {
        if (options.contentType.indexOf("application/json") > -1 && typeof options.data != "string") {
            options.data = JSON.stringify(options.data);
        }
    }
});
