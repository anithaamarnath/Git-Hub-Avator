var request = require('request');
var fs = require('fs');
var token = require('./secret');
var args = process.argv;

if(args[2] && args[3]){
  getRepoContributors(args[2],args[3], function(err,result){
    console.log("erros", err);
    printAvatar(result);


  })
}


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'Bearer '+token.GITHUB_TOKEN,
    }
  };

  request(options, function(err, res, body) {
    var contributors = JSON.parse(body);
    cb(err, contributors);
  });
}
function printAvatar(contributors){
  for(var i = 0 ; i < contributors.length; i++){
    //console.log("This is a contributors:" ,contributors);
    var contributor = contributors[i];
    var login = contributor.login
    var avatarUrl = contributor.avatar_url;
    //console.log("this is obj",avatarUrl);
    var filePath = './avatar/' + login+".jpg";
    console.log('filePath ', filePath)
    //console.log('filePath', filePath)
    //console.log(filePath);
    var  url = avatarUrl;

    //console.log("test ",url, avatarUrl);
    //console.log(url);
    downloadImageByURL(url, filePath);

  }

}

 function downloadImageByURL(url, filePath) {
    request.get('https://api.github.com/repos/')
       .on('error', function (err) {
        throw err;
       })

       .pipe(fs.createWriteStream(filePath));


}
getRepoContributors("jquery", "jquery", function(err, result) {


  // console.log("Errors:", err);
  // console.log("Result:", result);
  printAvatar(result);
});
//getRepoContributors
//printAvatar(contributors)


