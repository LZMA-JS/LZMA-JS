(function () {
	var fs = require('fs'),
		path = require('path'),
		forEachAsync = require('forEachAsync'),
		my_lzma = require("../src/lzma.js").LZMA(),
		compression_mode = process.argv[2] || 1;

	fs.readdir('testDocs', function (err, files) {
		if (err) {
			throw err;
		}

		forEachAsync(files, function (next, file) {
			console.log('File:', file);
			fs.readFile(path.join('testDocs', file), 'utf8', function (erro, content) {
				var size;

				if (err) {
					throw err;
				}

				size = content.length;
				console.log('Start size:', size);
				my_lzma.compress(content, compression_mode, function (result) {
					console.log('Compressed size:', result.length);

					my_lzma.decompress(result, function (result) {
						var newSize = result.length;

						if (Math.abs(size - newSize) > 5) {
							console.error('Not the same.');
							console.error('Original:', size);
							console.error('Ending:', newSize);
							console.error();
							return next();
						}

						console.log('Decompressed size:', newSize);
						console.log('Test passed');
						console.log();
						next();
					});
				});
			});
		}).then(function () {
			console.log('All tests finished');
		});
	});
}());
