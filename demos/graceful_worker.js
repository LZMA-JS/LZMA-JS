if (!Worker) {
    ///NOTE: IE8 needs onmessage to be created first, IE9 cannot, IE7- do not care.
    /*@cc_on
        /// Is this IE8-?
        @if (@_jscript_version < 9)
            var onmessage = function (){};
        @end
    @*/
    
    /// If this were a regular function statement, IE9 would run it first and therefore make the Worker variable truthy because of hoisting.
    var Worker = function(script)
    {
        var return_object = {};
        
        function load_script(script)
        {
            ///NOTE: Determine if there are better/other ways to do this.
            var script_tag  = document.createElement("script");
            script_tag.type ="text/javascript";
            script_tag.src  = script;
            document.body.appendChild(script_tag);
        }
        
        /// Dummy onmessage() function.
        return_object.onmessage = function () {};
        
        /// This is the function that the main script calls to post a message to the "worker."
        return_object.postMessage = function (message)
        {
            /// Delay the call just in case the "worker" script has not had time to load.
            setTimeout(function ()
            {
                /// Call the global onmessage() created by the "worker."
                ///NOTE: Wrap the message in an object.
                window.onmessage({data: message});
            }, 10);
        };
        
        /// Create a global postMessage() function for the "worker" to call.
        window.postMessage = function (e)
        {
            ///NOTE: Wrap the message in an object.
            ///TODO: Add more properties.
            return_object.onmessage({data: e, type: "message"});
        };
        
        load_script(script);
        
        return return_object;
    }
}