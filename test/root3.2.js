// load in head necessary static
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mdui@1.0.1/dist/css/mdui.min.css" integrity="sha384-cLRrMq39HOZdvE0j6yBojO4+1PrHfB7a9l5qLcmRm/fiWXYY+CndJPmyu5FV/9Tw" crossorigin="anonymous"/>');
document.write('<script src="//cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js" integrity="sha384-gCMZcshYKOGRX9r6wbDrvF+TcCCswSHFucUzUPwka+Gr+uHgjlYvkABr95TCOz3A" crossorigin="anonymous"></script>')
// markdown support
document.write('<script src="//cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js"></script>');
//copy support
document.write('<script src="//cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>');
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}.mdui-textfield-close{position:absolute;top:17px;right:0;}.mdui-textfield-close>.mdui-icon{bottom:0;padding:0;}</style>');
if(dark){document.write('<style>* {box-sizing: border-box}body{color:rgba(255,255,255,.87);background-color:#333232}.mdui-theme-primary-'+main_color+' .mdui-color-theme{background-color:#232427!important} .mdui-textfield-input{color:rgb(255, 255, 255)!important} .mdui-textfield-label{color:rgba(255, 255, 255, 0.7)!important}</style>');}
// Initialize the page and load the necessary resources
var obj_list = {};
var searchval = '';
var currentpath = '';
function init(){
    document.siteName = $('title').html();
    $('body').addClass("mdui-theme-primary-"+main_color+" mdui-theme-accent-"+accent_color);
    var html = "";
    html += `
    <header class="mdui-appbar mdui-color-theme">`
    if(dark){
        html += `
        <div id="nav" class="mdui-toolbar mdui-container mdui-text-color-white-text">
        </div>`;
    }else{
        html += `
        <div id="nav" class="mdui-toolbar mdui-container">
        </div>`;
    }
html += `
    </header>
        <div id="content" class="mdui-container"> 
        </div>`;
    $('body').html(html);
}

function render(path){
	if(path.indexOf("?") > 0){
		path = path.substr(0,path.indexOf("?"));
	}
    title(path);
    nav(path);
    if(path.substr(-1) == '/'){
    	list(path);
        if(searchval != '') {
            $('#searchInput').val(searchval);
            searchOnlyActiveDir();
        }
    }else{
	    file(path);
    }
    $(window).scrollTop(0);
    $("input[type='text']").on("click", function () {
        $(this).select();
    });
    $(".windows-btn").on("click", function () {
        window.location = $(this).data("href");
        return false;
    });
    $(".mac-btn").on("click", function () {
        window.location = $(this).data("href");
        return false;
    });
    $(".android-btn").on("click", function () {
        window.location = $(this).data("href");
        return false;
    });
    $(".mdui-textfield-close").on("click", function () {
        let _input = $("#searchInput");
        if(_input.val() != '') {
            _input.val('').focus();
            searchval = '';
            searchOnlyActiveDir();
        }
        return false;
    });
    currentpath = path;
}

// Title
function title(path){
    path = decodeURI(path);
    $('title').html(document.siteName+' - '+path);
}

// Nav
function nav(path) {
	var html = "";
	html += `<a href="/" class="mdui-typo-headline folder">${document.siteName}</a>`;
	var arr = path.trim('/').split('/');
	var p = '/';
	if (arr.length > 0) {
		for (i in arr) {
			var n = arr[i];
			n = decodeURI(n);
            var ext = n.split('.').pop();
            if("|html|php|css|go|java|js|json|txt|sh|md|mp4|webm|avi|bmp|jpg|jpeg|png|gif|flac|m4a|mp3|wav|ogg|mpg|mpeg|mkv|m2ts|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0){
	            p += n + "?a=view";
            }else {
                p += n + '/';
            }
            if (n == '') {
                break;
            }
            html += `<i class="mdui-icon material-icons mdui-icon-dark folder" style="margin:0;">chevron_right</i><a class="folder" href="${p}">${n}</a>`;
        }
    }
    html += `<div class="mdui-toolbar-spacer"></div>
	$('#nav').html(html);
}

// List files
function list(path){
    var content = "";
    content += `
    <div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>`;
    if(search){
        if(dark){
            content += `<div class="mdui-textfield"><input class="mdui-textfield-input mdui-text-color-white-text" id="searchInput" onkeyup="searchOnlyActiveDir()" type="text" placeholder="Type to search.." autocomplete="off"></input><button class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">close</i></button></div>`;
        }else{
            content += `<div class="mdui-textfield"><input class="mdui-textfield-input" id="searchInput" onkeyup="searchOnlyActiveDir()" type="text" placeholder="我想搜尋..."></input></div>`;
        }
    }
    content += `<div class="mdui-row"> 
      <ul class="mdui-list"> 
       <li class="mdui-list-item th"> 
        <div class="mdui-col-xs-12 mdui-col-sm-7">
        名稱
    <i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
        </div> 
        <div class="mdui-col-sm-3 mdui-text-right">
        修改時間
    <i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
        </div> 
        <div class="mdui-col-sm-2 mdui-text-right">
         檔案大小
    <i class="mdui-icon material-icons icon-sort" data-sort="size" data-order="downward">expand_more</i>
        </div> 
        <div class="mdui-col-sm-1 mdui-text-right">
         下載
        </div> 
        </li> 
      </ul> 
     </div> 
     <div class="mdui-row"> 
      <ul id="list" class="mdui-list"> 
      </ul> 
     </div>
     <div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;"></div>
    `;
    $('#content').html(content);
    $('#list').html(`<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>`);
    $('#readme_md').hide().html('');
    $('#head_md').hide().html('');
    path = decodeURI(path);
    if(obj_list[path] == null) {
        $.post(path, function(data,status){
            obj_list[path] = jQuery.parseJSON(data);
            if(typeof obj_list[path] != 'null'){
                list_files(path,obj_list[path].files);
            }
        });
    }else {
        if(typeof obj_list[path] != 'null'){
            list_files(path,obj_list[path].files);
        }
    }  
}

function list_files(path,files){
    html = "";
    for(i in files){
        var item = files[i];
        var p = path+item.name+'/';
        if(item['size']==undefined){
            item['size'] = "";
        }
        var modifiedTime = utc2Taiwan(item['modifiedTime']);
        var size = formatFileSize(item['size']);
        item.name = item.name.replace(/\//g, "／");
        item.name = item.name.replace(/:/g, "：");
        if(item['mimeType'] == 'application/vnd.google-apps.folder'){
            html +=`<li class="mdui-list-item mdui-ripple"><a href="${p}" class="folder">
                <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate" style="max-width: 522px;">
                <i class="mdui-icon material-icons">folder_open</i>
                  ${item.name}
                </div>
                <div class="mdui-col-sm-3 mdui-text-right">${modifiedTime}</div>
                <div class="mdui-col-sm-2 mdui-text-right">${size}</div>
                </a>
                <div class="mdui-col-sm-1 mdui-text-right"></div>
            </li>`;
      }else{
	   var p = path+item.name;
            var c = "file";
            if(item.name == "README.md"){
                 get_file(p, item, function(data){
                    markdown("#readme_md",data);
                });
            }
            if(item.name == "HEAD.md"){
                get_file(p, item, function(data){
                    markdown("#head_md",data);
                });
            }
		var download_url = encodeURI(window.location.origin + p);
            var ext = p.split('.').pop();
            if("|html|php|css|go|java|js|json|txt|sh|md|mp4|webm|avi|bmp|jpg|jpeg|png|gif|flac|m4a|mp3|wav|ogg|mpg|mpeg|mkv|m2ts|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0){
            }
            html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
              <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate" style="max-width: 522px;">
              <i class="mdui-icon material-icons">insert_drive_file</i>
                ${item.name}
              </div>
              <div class="mdui-col-sm-3 mdui-text-right">${modifiedTime}</div>
              <div class="mdui-col-sm-2 mdui-text-right">${size}</div>
            </a>
            <div class="mdui-col-sm-1 mdui-text-right">
              <a target="_blank" href="${download_url}"><i class="mdui-icon material-icons">arrow_downward</i></a>
            </div>
          </li>`;
        }
    }
    $('#list').html(html);
}


function get_file(path, file, callback){
    var key = "file_path_"+path+file['modifiedTime'];
    var data = localStorage.getItem(key);
    if(data != undefined){
        return callback(data);
    }else{
        $.get(path, function(d){
            localStorage.setItem(key, d);
            callback(d);
        });
    }
}




function searchOnlyActiveDir() {
    var e, t, n, l;
    searchval = document.getElementById("searchInput").value;
    for (e = document.getElementById("searchInput").value.toUpperCase(), t = document.getElementById("list").getElementsByTagName("li"), l = 0; l < t.length; l++)((n = t[l].getElementsByTagName("a")[0]).getElementsByTagName("div")[0].textContent || n.innerText).toUpperCase().indexOf(e) > -1 ? t[l].style.display = "" : t[l].style.display = "none"
}

// time conversion
function utc2Taiwan(utc_datetime) {
    // change to normal time format year-month-day hour: minutes: seconds
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second;

    // processing becomes a timestamp
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // Add 7 hours, Jakarta time is eight more time zones than UTC time
    var unixtimestamp = timestamp + 8 * 60 * 60;

    // timestamp into time
    var unixtimestamp = new Date(unixtimestamp * 1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length) +
        " " + hour.substring(hour.length - 2, hour.length) + ":" +
        minute.substring(minute.length - 2, minute.length) + ":" +
        second.substring(second.length - 2, second.length);
}

// bytes conversion to KB, MB, GB
function formatFileSize(bytes) {
    if (bytes>=1000000000) {bytes=(bytes/1000000000).toFixed(2)+' GB';}
    else if (bytes>=1000000)    {bytes=(bytes/1000000).toFixed(2)+' MB';}
    else if (bytes>=1000)       {bytes=(bytes/1000).toFixed(2)+' KB';}
    else if (bytes>1)           {bytes=bytes+' bytes';}
    else if (bytes==1)          {bytes=bytes+' byte';}
    else                        {bytes='';}
    return bytes;
}

String.prototype.trim = function (char) {
    if (char) {
        return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};

// README.md HEAD.md support
function markdown(el, data){
    if(window.md == undefined){
        //$.getScript('https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js',function(){
        window.md = window.markdownit();
        markdown(el, data);
        //});
    }else{
        var html = md.render(data);
        $(el).show().html(html);
    }
}

// Listen for fallback events
window.onpopstate = function(){
    if(currentpath.substr(-1) == '/') searchval = '';
    var path = window.location.pathname;
    render(path);
}

$(function(){
    init();
    var path = window.location.pathname;
    var cp = new ClipboardJS('.btn');
    $("body").on("click",'.folder',function(){
        path = decodeURI(window.location.pathname);
        var url = $(this).attr('href');
        if(url == '/' && path == url) searchval = '';
        if((url != '/' && path == url) || (url.substr(-1) == '/' && path.substr(-1) == '/')) searchval = '';
        history.pushState(null, null, url);
        render(url);
        return false;
    });

    $("body").on("click",'.view',function(){
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });
    
    render(path);
});
