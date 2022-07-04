const hrefMap = {
    //Default will regular text reader
    //Image
    png : "image",
    jpeg: "image",
    jpg: "image",
    gif: "image",
    ico: "image",
    svg: "image",
    bmp: "image",
    //Document 
    pdf: "http://www.yahoo.com",
    csv: "http://www.yahoo.com",    
    //Video
    mp4: "video",
    mov: "video",
    //Audio
    mp3: "audio",
    wav: "audio",
};


module.exports.calls = function (app,fs,path,cors) {

    app.post('/content', function(req,res) {
        const body = req.body;    
        const file = path.join(__dirname,'..','..','..',body.path.pathname,body.file);
        var content = "<p></p>";
        var contentType = "Text/plain"

        fs.readFile(file, function(err,content) {
            const ext = body.extension.toLowerCase();
            if(hrefMap[ext] == "image") {
                contentType = `image/${ext}`;
                content = `<img class="image-view" src="data:${contentType};base64,${Buffer.from(content).toString('base64')}" ${ext == "gif"?"alt=\"looping\"" : ""}/>`;
            } else {
                content = `<p>${Buffer.from(content).toString('utf8')}</p>`;
            }
    
            res.writeHead(200, {'Content-Type': "text/html"});
            res.end(content);
        })
    
    });
    
    app.post('/storage', function(req,res) {
        const location = req.body.urlLocation;
        fs.readdir(path.join(__dirname,'..','..','..',location.pathname),{ withFileTypes: true },(err,files) => {
            const directory = files.filter(files => files.isDirectory()).map(files => files.name);
            
            const file = files.filter(files => files.isFile()).map(files => files.name);
            const data = {
                'directories': directory,
                'files': file
            };
            res.send(data);
        })
      
    });
    
} 