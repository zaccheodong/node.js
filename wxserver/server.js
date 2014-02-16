/**
 * Created by Administrator on 14-2-15.
 */

var http = require("http");
var url  =require("url");
var querystring = require("querystring")


// 处理微信的验证
function wx_verification(req,res)
{
    var query = url.parse(req.url).query;
    console.log("query  is: "+ query);
    var echostr = querystring.parse(query)["echostr"];
    console.log("echostr is :"+ echostr);
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write(echostr);
    res.end();
}
http.createServer(function(req,res){
    console.log("url here :" + req.url);

    req.setEncoding('utf8');
    var postData = "";
    req.addListener("data",function(dataChunk)
    {
        console.log("datachunk : "+dataChunk);
        postData += dataChunk;
    });
    req._addHeaderLine("end",function()
    {
       console.log("post data received :"+postData);
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end();
    });


}).listen(80);
