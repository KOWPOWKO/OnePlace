module.exports.calls = function (app,fs,busboy,path,directory) {
    const getPath = (fileName) => path.join(directory,fileName);

    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //       cb(null, directory)
    //     },
    //     filename: function (req, file, cb) {
    //       console.log(file);
    //       cb(null, file.originalname);
    //     }
    //   })
      
    //   const upload = multer({ storage: storage })
      
      
      
    app.post('/upload-request', function(req,res)
    {
    if (!req.body || !req.body.fileName) {
        res.status(400).json({message:"No File Name"});
    } else {
        const filePath = getPath(req.body.fileName);
        fs.createWriteStream(filePath,{flags:'w'});
        res.status(200).json({message:filePath});
    }
    });
    
    // File upload 
    app.post('/upload', function(req,res)
    {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
        const saveTo = path.join(directory, info.filename);
        file.pipe(fs.createWriteStream(saveTo, {flags: 'a'}));
    });
    bb.on('close', () => {
        res.writeHead(200, { 'Connection': 'close' });
        res.end(`That's all folks!`);
    });
    req.pipe(bb);
    return;
    });
      
}