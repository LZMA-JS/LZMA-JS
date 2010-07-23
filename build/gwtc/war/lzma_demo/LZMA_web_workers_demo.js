var LZMA = (function ()
{
    var action_compress   = 1,
        action_decompress = 2,
        action_get_mode   = 3,
        action_set_mode   = 4,
        action_update     = 5,
        
        lzma_worker = Worker("LZMA_worker.js");
    
    function on_progress_update(which_action, percent)
    {
        // This is just a dummy function that should be rewritten by the script.
    }
    
    lzma_worker.onmessage = function (e)
    {
        alert("Result: " + e.data);
    };
    
    return {
        compress: function (str)
        {
            lzma_worker.postMessage([action_compress, str]);
        },
        decompress: function (byte_arr)
        {
            lzma_worker.postMessage([action_decompress, byte_arr]);
        },
        get_mode: function ()
        {
            lzma_worker.postMessage([action_get_mode]);
        },
        set_progress_update: function(func)
        {
            on_progress_update = func;
        },
        set_mode: function (mode)
        {
            lzma_worker.postMessage([action_set_mode, mode]);
        }
    }
}());