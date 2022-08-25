const express = require('express');
const multer = require('multer');
const port = 8000;
const app = express();
app.use(express.static('public'));

const upload = multer({
    storage:multer.diskStorage({
        destination : function(req, file, callback){
            callback(null, 'uploaded')
        },
        filename : function(req, file,callback){
            callback(null, file.filename + "-" + Date.now() + '.png');
        }
    })
}).single('file_name'); 


app.post('/login',upload, (req, res) =>{
    console.log(req)
    res.send('file uploaded')
})

app.listen(port, ()=>{
    console.log('hello client could you listen me');
});


const logger = (req, res, next) =>{
    console.log('my logger')
    next();
}
app.get('/',logger, (req, res) =>{
    res.send('hello backend');
})

app.use(logger)