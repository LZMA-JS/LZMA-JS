
function run_stuff()
{
    for (var i = 0; i < 100000000; ++i) {}
    
    postMessage(i);
}

onmessage = function(e){
    if (e.data == "do") {
        run_stuff();
    } else {
        postMessage("error");
    }
}