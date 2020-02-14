var fs = require("fs"),
    path = require("path"),
    zlib = require("zlib"),
    params = get_params(),
    text_output = "",
    stats = {};

const rollup = require("./rollup");

function get_params(argv)
{
    var i,
        params = {};
    
    argv = argv || process.argv;
    
    for (i = process.argv.length - 1; i >= 2; i -= 1) {
        params[process.argv[i].replace(/^-+/, "")] = 1;
    }
    
    return params;
}

function log(str)
{
    text_output += str + "\n";
    console.log(str);
}

function filesize(path, cb)
{
    return fs.statSync(path).size;
}

function get_kb(bytes)
{
    return (bytes / 1024).toFixed(bytes < 1024 ? 2 : 1) + " KB";
}

function pad(str, len)
{
    return str.length >= len ? str : new Array(len - str.length + 1).join(" ") + str;
}

function replace_data(str, filename)
{
    return str.replace(new RegExp("(" + filename + ".js\\s*\\|\\s*\\S+\\s*\\|)([^|]+)\\|([^|]+)"), function replace(all, base, min, gzip)
    {
        var new_min  = pad(get_kb(stats[filename].min)  + " ", min.length),
            new_gzip = pad(get_kb(stats[filename].gzip) + " ", gzip.length);
        
        return base + new_min + "|" + new_gzip;
    });
}

function update_readme()
{
    var data,
        readme_path = path.join(__dirname, "readme.md");
    
    data = fs.readFileSync(readme_path, "utf8");
    
    data = replace_data(data, "lzma_worker");
    data = replace_data(data, "lzma-c");
    data = replace_data(data, "lzma-d");
    
    fs.writeFileSync(readme_path, data);
}

function staged_files_found(cb)
{
    require("child_process").exec("git diff-index --quiet --cached HEAD", function onexec(err)
    {
        if (err) {
            if (err.code === 1) {
                return cb(true);
            }
            throw err;
        }
        cb(false);
    });
}


function commit(cb)
{
    var execFile = require("child_process").execFile;
    
    function ret()
    {
        if (cb) {
            cb();
        }
    }
    
    execFile("git", ["add", "readme.md"], function onexec(err)
    {
        if (err) {
            throw err;
        }
        execFile("git", ["add", "src"], function onexec(err)
        {
            if (err) {
                throw err;
            }
            
            staged_files_found(function oncheck(found)
            {
                if (!found) {
                    console.log("No files need updating.");
                    return ret();
                }
                execFile("git", ["commit", "-m", "Minified:\n\n" + text_output.trim()], function onexec(err)
                {
                    if (err) {
                        throw err;
                    }
                    
                    ret();
                });
            });
        });
    });
}

function calculate_size()
{
    ["lzma", "lzma_worker", "lzma-c", "lzma-d"].forEach(function (file) {
        const full_path = path.join(__dirname, "src", file + ".js");
        const min_path = path.join(__dirname, "src", file + "-min.js");
        const orig_size = filesize(full_path);

        log(file + ".js");
        stats[file] = {};

        const min_size = filesize(min_path);

        stats[file].min = min_size;

        log("Original size: " + orig_size + " bytes (" + get_kb(orig_size) + ")");
        log("Minified size: " + min_size + " bytes (" + get_kb(min_size) + ")");
        log("Compression:   " + (orig_size / min_size).toFixed(4) + " x smaller");

        const buffer = zlib.gzipSync(fs.readFileSync(path.join(__dirname, "src", file + "-min.js")));
        const gzmin_size = buffer.length;
        
        stats[file].gzip = gzmin_size;
        
        ///NOTE: We could write the file if we wanted to like this: fs.writeFileSync(p.join(__dirname, "src", p.basename(file, ext) + "-min" + ext + ".gz"), buffer);
        log("Gzipped size:  " + gzmin_size + " bytes (" + get_kb(gzmin_size) + ")");
        log("Gzipped ratio: " + (orig_size / gzmin_size).toFixed(4) + " x smaller");
        log("");
    });

    if (params.save) {
        console.log("Updating Readme");
        update_readme();
        console.log("Committing");
        commit();
    }
}

if (params.help) {
    console.log("");
    console.log("Usage: node minify.js [FLAGS]");
    console.log("");
    console.log("  --save  Update readme.md and commit.");
    console.log("");
    process.exit();
}

if (params.save) {
    staged_files_found(function oncheck(found)
    {
        if (found) {
            console.log("Found staged files. Commit first.");
            process.exit(1);
        }
        rollup.minify().then(function () {
            calculate_size();
        });
    });
} else {
    rollup.minify().then(function () {
        calculate_size();
    });
}
