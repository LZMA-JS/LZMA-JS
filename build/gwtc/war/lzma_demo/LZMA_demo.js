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
        select_mode_el        = document.getElementById("select_mode");
    
    if (!String.prototype.trim) {
        String.prototype.trim = function (){
            return this.replace(/^\s+|\s+$/, "");
        }
    }
    
    function convet_formated_hex_to_bytes(hex_str)
    {
        var count = 0,
            hex_arr,
            hex_data = [],
            hex_len,
            i;
        
        if (hex_str.trim() == "") return [];
        
        // Check for invalid hex characters.
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
    
    
    function update_sizes()
    {
        var left_size  = left_text_el.value.length,
            right_size = convet_formated_hex_to_bytes(right_text_el.value);
        
        if (right_size === false) {
            right_size = "invalid hex input";
        } else {
            right_size = right_size.length;
        }
        
        left_output_el.innerHTML  = left_size  + " byte" + (left_size  !== 1 ? "s" : "");
        right_output_el.innerHTML = right_size + " byte" + (right_size !== 1 ? "s" : "");
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
    
    
}());