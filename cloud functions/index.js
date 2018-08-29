const functions = require('firebase-functions');

const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
// const cors = require('cors')({origin: true});
const BusBoy = require('busboy');
const fs = require('fs');

const gcconfig = {
    productid: "img-gallery-8c02c",
    keyFileName: "img-gallery-8c02c-firebase-adminsdk-opz3i-74c1d4e2b7.json"
}

const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// exports.resizeImg = functions.storage.object().onFinalize(event => {
//     const bucket = event.bucket;
//     const contentType = event.contentType;
//     const filePath = event.name;
//     console.log(event);

    
//     if(path.basename(filePath).startsWith('resized-')){
//         console.log('we already renamed this file')
//         return;

//     }

//     const destBucket = gcs.bucket(bucket);
//     const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
//     const metadata = { contentType: contentType }
//     return destBucket.file(filePath).download({
//         destination: tempFilePath
//     }).then(() => {
//         return spawn('convert', [tempFilePath, '-resize', '250x250', tempFilePath]);
        
//     }).then(() => {
//         return destBucket.upload(tempFilePath, {
//             destination: 'resized-' + path.basename(filePath),
//             metadata: metadata
//         })
//     });

// });

exports.onFileDelete = functions.storage.object().onDelete(event => {
    console.log(event);
    return;

});

// exports.uploadFile = functions.https.onRequest((req, res) => {

//     cors(req, res, () => {
//         if(req.method !== 'POST'){
//             res.status(500).json({
//                 message: 'Not Allowed'
    
//             });
    
//         }

//         const busboy = new BusBoy({headers: req.headers});
//         let uploadData = null;

//         busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//             const filepath = path.join(os.tmpdir(), filename);
//             uploadData = {file: filepath, type: mimetype};
//             file.pipe(fs.createWriteStream(filepath));
//         });

//         busboy.on('finish', () => {
//             const bucket = gcs.bucket('img-gallery-8c02c.appspot.com');
//             bucket.upload(uploadData.file, {
//                 uploadType: 'media',
//                 metadata: {
//                     metadata: {
//                         contentType: uploadData.type
//                     }
//                 }
//             }).then(() => {
//                 return res.status(200).json({
//                     message: 'It Worked!'

//                 });
                
//             }).catch(err => {
//                     return res.status(500).json({
//                         error: err
//                     });
//             });
//         });
//         busboy.end(req.rawBody);
    
        
    

//     })
    


// });
