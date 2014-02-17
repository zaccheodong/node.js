/**
 * Created by Administrator on 14-2-15.
 */

var http = require("http");
var url  =require("url");
var querystring = require("querystring");


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

//处理GET请求的方法
function onGet(req,res)
{
    console.log("onGet");
    res.writeHead(200);
    res.end();
}
//处理Post请求的方法
function onPost(req,res)
{
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

}
//启动httpserver
http.createServer(function(req,res){

    console.log("url here :" + req.url);
    var method = req.method;
    console.log(req.headers);
  if("GET" == method)
    {
        onGet(req,res);
    }
    if("POST" == method)
    {
        onPost(req,res);
    }

}).listen(8080);
