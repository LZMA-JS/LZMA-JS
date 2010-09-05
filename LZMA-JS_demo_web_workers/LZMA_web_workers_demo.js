(function ()
{
    var clear_left_button_el  = document.getElementById("clear_left_button"),
        clear_right_button_el = document.getElementById("clear_right_button"),
        compress_button_el    = document.getElementById("compress_button"),
        decompress_button_el  = document.getElementById("decompress_button"),
        left_text_el          = document.getElementById("left_text"),
        left_output_el        = document.getElementById("left_output"),
        right_text_el         = document.getElementById("right_text"),
        right_output_el       = document.getElementById("right_output"),
        select_mode_el        = document.getElementById("select_mode"),
    
        LZMA = (function ()
        {
            var action_compress   = 1,
                action_decompress = 2,
                action_get_mode   = 3,
                action_set_mode   = 4,
                action_update     = 5,
                
                lzma_worker = Worker("LZMA_web_worker.js");
            
            function on_progress_update(which_action, percent)
            {
                /// This is just a dummy function that should be rewritten by the script.
            }
            
            function on_finish(which_action, result)
            {
                /// This is just a dummy function that should be rewritten by the script.
            }
            
            lzma_worker.onmessage = function (e)
            {
                switch (e.data[0]) {
                case action_compress:
                    on_finish(1, e.data[1]);
                    break;
                case action_decompress:
                    on_finish(2, e.data[1]);
                    break;
                case action_get_mode:
                    /// Not used for demo.
                    break;
                case action_update:
                    on_progress_update(e.data[1][0], e.data[1][1]);
                    break;
                }
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
                set_mode: function (mode)
                {
                    lzma_worker.postMessage([action_set_mode, mode]);
                },
                set_finish: function (func)
                {
                    on_finish = func;
                },
                set_progress_update: function(func)
                {
                    on_progress_update = func;
                }
            }
        }());
    
    if (!String.prototype.trim) {
        String.prototype.trim = function (){
            return this.replace(/^\s+|\s+$/, "");
        }
    }
    
    function is_array(input)
    {
        return typeof(input) === "object" && (input instanceof Array);
    }
    
    function convet_formated_hex_to_bytes(hex_str)
    {
        var count = 0,
            hex_arr,
            hex_data = [],
            hex_len,
            i;
        
        if (hex_str.trim() == "") return [];
        
        /// Check for invalid hex characters.
        if (/[^0-9a-fA-F\s]/.test(hex_str)) {
            return false;
        }
        
        hex_arr = hex_str.split(/([0-9a-fA-F]+)/g);
        hex_len = hex_arr.length;
        
        for (i = 0; i < hex_len; ++i) {
            if (hex_arr[i].trim() == "") {
                continue;
            }
            hex_data[count++] = parseInt(hex_arr[i], 16);
        }
        
        return hex_data;
    }
    
    function convert_to_formated_hex(byte_arr)
    {
        var hex_str = "",
            i,
            len,
            tmp_hex;
        
        if (!is_array(byte_arr)) {
            return false;
        }
        
        len = byte_arr.length;
        
        for (i = 0; i < len; ++i) {
            if (byte_arr[i] < 0) {
                byte_arr[i] = byte_arr[i] + 256;
            }
            tmp_hex = byte_arr[i].toString(16);
            
            // Add leading zero.
            if (tmp_hex.length == 1) tmp_hex = "0" + tmp_hex;
            
            if ((i + 1) % 16 === 0) {
                tmp_hex += "\n";
            } else {
                tmp_hex += " ";
            }
            
            hex_str += tmp_hex;
        }
        
        return hex_str.trim();
    }
    
    function update_sizes(compare)
    {
        var compare_result = "",
            left_size  = left_text_el.value.length,
            right_size = convet_formated_hex_to_bytes(right_text_el.value);
        
        if (right_size === false) {
            right_size = "invalid hex input";
        } else {
            right_size = right_size.length;
        }
        
        if (compare && right_size > 0 && left_size > 0) {
            compare_result = " (" + Math.round((right_size / left_size) * 100) + "%)";
        }
        
        left_output_el.innerHTML  = left_size  + " byte" + (left_size  !== 1 ? "s" : "");
        right_output_el.innerHTML = right_size + " byte" + (right_size !== 1 ? "s" : "") + compare_result;
    }
    
    function clear_left()
    {
        left_text_el.value = "";
        update_sizes();
    }
    
    function clear_right()
    {
        right_text_el.value = "";
        update_sizes();
    }
    
    
    clear_left_button_el.onclick  = clear_left;
    clear_right_button_el.onclick = clear_right;
    
    compress_button_el.onclick = function ()
    {
        right_text_el.value = "";
        update_sizes();
        my_on_progress_update(1, 0);
        
        LZMA.set_finish(function (which_action, compressed)
        {
            if (compressed === false) {
                alert("An error occured during compression.");
                update_sizes();
                return;
            }
            
            right_text_el.value = convert_to_formated_hex(compressed);
            update_sizes(true);
        });
        
        LZMA.compress(left_text_el.value);
    }
    
    decompress_button_el.onclick = function ()
    {
        var byte_arr = convet_formated_hex_to_bytes(right_text_el.value),
            decompressed;
        
        left_text_el.value = "";
        update_sizes();
        my_on_progress_update(2, 0);
        
        
        if (byte_arr == false) {
            ///TODO: Show which character is wrong.  I.e., invalid compressed input: invalid hex character `s
            alert("invalid compressed input");
            update_sizes();
            return false;
        }
        
        LZMA.set_finish(function (which_action, decompressed)
        {
            if (decompressed === false) {
                alert("An error occured during decompression.");
                return;
            }
            
            left_text_el.value = decompressed;
            update_sizes(true);
        });
        
        LZMA.decompress(byte_arr);
    }
    
    select_mode_el.onchange = function ()
    {
        LZMA.set_mode(select_mode_el.value);
    }
    
    function my_on_progress_update(which_action, percent)
    {
        if (which_action === 1) { // Compression
            right_output_el.innerHTML = "Compressing... "   + Math.round(percent * 100) + "%";
        } else { // Decompression
            left_output_el.innerHTML  = "Decompressing... " + Math.round(percent * 100) + "%";
        }
    }
    
    LZMA.set_progress_update(my_on_progress_update);
    
}());