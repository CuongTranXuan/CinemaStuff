
const express = require('express');
const adminRoute = express.Router();
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
var ffmpegPath = '/home/ubuntu/bin/ffmpeg'
var videoDir = '/home/ubuntu/video' //change to actual directory on vps later, /home/ubuntu/video/
const authJWT = require('../helpers/jwt.js')

// film stuff
const filmService = require('../controllers/film/filmService.js')

//routes
adminRoute.get('/',authJWT.verifyToken,getVideoList);
adminRoute.post('/films/create',[authJWT.verifyToken,authJWT.isAdmin],addFilm);
adminRoute.delete('/films/:id',[authJWT.verifyToken,authJWT.isAdmin],deleteFilm);
adminRoute.put('/films/:id',[authJWT.verifyToken,authJWT.isAdmin],updateFilm);
adminRoute.post('/encode',[authJWT.verifyToken], encodeVideo);

adminRoute.post('/upload_video',[authJWT.verifyToken],uploadVideo);
adminRoute.post('/upload_sub',[authJWT.verifyToken],uploadSubtitle);


//function
function getVideoList(req,res,next){
    var filesList;
    fs.readdir(videoDir, function(err, files){
        if (err) console.log(err)
        filesList = files.filter(function(e){
            return path.extname(e).toLowerCase() === '.mkv'
        });
        res.json({filesList});
    });
}
function uploadVideo(req,res,next){
    req.pipe(req.busboy); // Pipe it through busboy
   
    req.busboy.on('file', (fieldname, file, filename) => {
        if (filename.split('.').pop() === 'mkv'){
            console.log(`Upload of '${filename}' started`);
            // Create a write stream of the new file
            const fstream = fs.createWriteStream(path.join(videoDir, filename));
            // Pipe it
            file.pipe(fstream);
  
            // On finish of the upload
            fstream.on('close', () => {
                console.log(`Upload of '${filename}' finished`);
                res.json({video: 'uploaded',
                        filename: filename});
            });
        }
        else {
            console.log('error: not a valid mkv file')
            res.json({error: 'not a valid mkv file'})
        }
    })
}
function uploadSubtitle(req,res,next){
    req.pipe(req.busboy); // Pipe it through busboy
   
    req.busboy.on('file', (fieldname, file, filename) => {
        if (filename.split('.').pop() === 'vtt'){
            console.log(`Upload of '${filename}' started`);
            // Create a write stream of the new file
            const fstream = fs.createWriteStream(path.join(videoDir, filename));
            // Pipe it
            file.pipe(fstream);
  
            // On finish of the upload
            fstream.on('close', () => {
                console.log(`Upload of '${filename}' finished`);
                res.json({sub: 'uploaded',
                        filename: filename});
            });
        }
        else {
            console.log('error: not a valid vtt file')
            res.json({error: 'not a valid vtt file'})
        }
    })
}
function addFilm(req,res,next){
    filmService.createFilm(req.body)
        .then(() => {res.json({result:'added'})})
        .catch(err => next(err))
}
function deleteFilm(req,res,next){
    filmService.deleteFilm(req.params.id)
        .then(() => res.json({result:'deleted'}))
        .catch(err => next(err));
}
function updateFilm(req,res,next){
    filmService.updateFilm(req.params.id,req.body)
        .then(() => res.json({result: 'updated'}))
        .catch(err => next(err));
}



// request body: 
// {
//     videoFile: uploaded .mkv file name
//     subFile: uploaded .vtt file name
//     filmName: expected video name for playing
// }
function encodeVideo(req,res,next){
    let command = ffmpeg()
    command.setFfmpegPath(ffmpegPath)
    console.log(req.body)
    let mkvfile = req.body.videoFile ;
    let vttfile = req.body.subFile ;
    let outputfile = 'master_' + req.body.filmName + '.m3u8';
    command
        .input(`/home/ubuntu/video/${mkvfile}`)
        .input(`/home/ubuntu/video/${vttfile}`)
        .on('start', function(commandLine) {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('progress', function(progress) {
            console.log(progress.timemark, progress.frames);
        })
        .on('error', function(err, stdout, stderr) {
            /// error handling
            console.log('Cannot process video: ' + err.message);
        })
        .on('end', function(stdout, stderr) {
            console.log(stdout)
            res.json({result: 'encoded'})
        })
        .outputOption("-preset","veryfast")
        .outputOption("-g","48")
        .outputOption("-sc_threshold","0")
        .outputOption("-map","0:0")
        .outputOption("-map","0:1")
        .outputOption("-map","1:0")
        .outputOption("-s:v:0","1600x900")
        .outputOption("-c:v:0","libx264")
        .outputOption("-b:v:0","6000k")
        .outputOption("-c:a","copy")
        .outputOption("-c:s","copy")
        .outputOption("-var_stream_map",'v:0,a:0,s:0,sgroup:subs')
        .outputOption("-master_pl_name",`${outputfile}`)
        .outputOption("-f","hls")
        .outputOption("-hls_time","20")
        .outputOption("-hls_list_size","0")
        .outputOption("-hls_playlist_type","event")
        .outputOption("-hls_segment_filename",`/home/ubuntu/video/${req.body.filmName}_v%v/seq_%d.ts`)
        .output(`/home/ubuntu/video/${req.body.filmName}_v%v/index.m3u8`)
        .run()
}


module.exports = adminRoute;