// load in head necessary static
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mdui@1.0.1/dist/css/mdui.min.css" integrity="sha384-cLRrMq39HOZdvE0j6yBojO4+1PrHfB7a9l5qLcmRm/fiWXYY+CndJPmyu5FV/9Tw" crossorigin="anonymous"/>');
document.write('<script src="//cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js" integrity="sha384-gCMZcshYKOGRX9r6wbDrvF+TcCCswSHFucUzUPwka+Gr+uHgjlYvkABr95TCOz3A" crossorigin="anonymous"></script>')
// markdown support
document.write('<script src="//cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js"></script>');
//copy support
document.write('<script src="//cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>');
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}.mdui-textfield-close{position:absolute;top:17px;right:0;}.mdui-textfield-close>.mdui-icon{bottom:0;padding:0;}</style>');
if(dark){document.write('<style>* {box-sizing: border-box}body{color:rgba(255,255,255,.87);background-color:#333232}.mdui-theme-primary-'+main_color+' .mdui-color-theme{background-color:#232427!important} .mdui-textfield-input{color:rgb(255, 255, 255)!important} .mdui-textfield-label{color:rgba(255, 255, 255, 0.7)!important}</style>');}
// 初始化页面，并载入必要资源
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
    <a href="https://donorbox.org/lilithraws" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Donate Lilith-Raws'}" alt="Donate Lilith-Raws">
      <svg id="_x33_0" enable-background="new 0 0 64 64" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" style="width:24px; height:24px; transform: translate(0px,12px);" viewBox="0 0 64 64"><g><g><g><path d="m60 18c0 15-12 21-12 21v-14s-4-2-4-7h4v-5h-32v5h4c0 5-4 7-4 7v9 5s-12-6-12-21 12-16 16-16 10 2 12 6c2-4 8-6 12-6s16 1 16 16z" fill="#ff826e"></path></g><g><path d="m48 13v5h-4-24-4v-5z" fill="#b4dd7f"></path></g><g><path d="m16 25h9c-4.97 0-9 4.03-9 9z" fill="#e6e9ed"></path></g><g><path d="m16 25s4-2 4-7h24c0 5 4 7 4 7h-23z" fill="#e6e9ed"></path></g><g><path d="m16 34c0 4.97 4.03 9 9 9-1.91 0-3.64.76-4.9 2.01-.03-.01-.07-.01-.1-.01h-4v-6z" fill="#e6e9ed"></path></g><g><path d="m48 39v6h-.05c-.51-4.51-4.32-8-8.95-8s-8.44 3.5-8.94 7.99l-.09.08c-1.27-1.28-3.03-2.07-4.97-2.07 4.97 0 9-4.03 9-9s-4.03-9-9-9h23z" fill="#e6e9ed"></path></g><g><path d="m48 58v4h-9c2.79 0 5.2-1.64 6.33-4z" fill="#e6e9ed"></path></g><g><path d="m32 55c0 3.87 3.13 7 7 7h-15c3.87 0 7-3.13 7-7v-1.4c.39-.65.68-1.37.84-2.14h.01c.22.29.46.57.72.83l-.04.04c-.34.83-.53 1.73-.53 2.67z" fill="#e6e9ed"></path></g><g><path d="m24 62h-8v-4h1.67c1.13 2.36 3.54 4 6.33 4z" fill="#e6e9ed"></path></g><g><path d="m39 58h6.33c-1.13 2.36-3.54 4-6.33 4-3.87 0-7-3.13-7-7 0-.94.19-1.84.53-2.67l.04-.04c1.19 1.22 2.71 2.1 4.43 2.48v1.23c0 1.2.8 2 2 2z" fill="#ffc729"></path></g><g><path d="m32 50c0 .5-.05.99-.16 1.46-.16.77-.45 1.49-.84 2.14-.89 1.48-2.31 2.61-4 3.11l-.1-.03c.07-.2.1-.43.1-.68v-5c0-1.2-.8-2-2-2h-3v-1-1c0-.97-.94-1.93-1.9-1.99 1.26-1.25 2.99-2.01 4.9-2.01 1.94 0 3.7.79 4.97 2.07 1.26 1.26 2.03 3 2.03 4.93z" fill="#ffc729"></path></g><g><path d="m31 53.6v1.4c0 3.87-3.13 7-7 7-2.79 0-5.2-1.64-6.33-4h7.33c.95 0 1.65-.51 1.9-1.32l.1.03c1.69-.5 3.11-1.63 4-3.11z" fill="#fcd770"></path></g><g><path d="m44 45c-1 0-2 1-2 2v1 1h-3c-1.2 0-2 .8-2 2v3.77c-1.72-.38-3.24-1.26-4.43-2.48-.26-.26-.5-.54-.72-.83h-.01c.11-.47.16-.96.16-1.46 0-1.93-.77-3.67-2.03-4.93l.09-.08c.5-4.49 4.31-7.99 8.94-7.99s8.44 3.49 8.95 8z" fill="#fcd770"></path></g><g><circle cx="25" cy="34" fill="#fcd770" r="9"></circle></g><g><path d="m62 45v14l-11-3v-8z" fill="#75b1f2"></path></g><g><path d="m13 48v8l-11 3v-14z" fill="#b4dd7f"></path></g><g><path d="m48 45 3 3v8l-3 2h-2.67-6.33c-1.2 0-2-.8-2-2v-1.23-3.77c0-1.2.8-2 2-2h3v-1-1c0-1 1-2 2-2h3.95z" fill="#f0d0b4"></path></g><g><path d="m22 48v1h3c1.2 0 2 .8 2 2v5c0 .25-.03.48-.1.68-.25.81-.95 1.32-1.9 1.32h-7.33-1.67l-3-2v-8l3-3h4c.03 0 .07 0 .1.01.96.06 1.9 1.02 1.9 1.99z" fill="#f0d0b4"></path></g></g><g><path d="m63 60.309v-16.618l-11.703 3.192-2.297-2.297v-5.004c2.422-1.447 12-8.026 12-21.582 0-15.343-11.889-17-17-17-4.121 0-9.367 1.794-12 5.149-2.633-3.355-7.879-5.149-12-5.149-5.111 0-17 1.657-17 17 0 13.556 9.578 20.135 12 21.582v5.004l-2.297 2.297-11.703-3.192v16.618l11.824-3.225 2.176 1.451v4.465h34v-4.465l2.176-1.451zm-24-3.309c-.645 0-1-.355-1-1v-5c0-.645.355-1 1-1h3 4v-2h-3v-1c0-.449.551-1 1-1h3.586l2.414 2.414v7.051l-2.303 1.535zm-6-2c0-.321.034-.635.083-.946.883.65 1.867 1.155 2.917 1.485v.461c0 1.738 1.262 3 3 3h4.467c-1.124 1.248-2.746 2-4.467 2-3.309 0-6-2.691-6-6zm-9 6c-1.721 0-3.344-.752-4.467-2h5.467c1.157 0 2.092-.566 2.596-1.453.824-.284 1.578-.694 2.249-1.212-.609 2.668-2.996 4.665-5.845 4.665zm-10-12.586 2.414-2.414h3.586c.449 0 1 .551 1 1v1h-3v2h7c.645 0 1 .355 1 1v5c0 .645-.355 1-1 1h-8.697l-2.303-1.535zm3-31.414v-3h30v3zm26.055 2c.225 2.254 1.18 3.891 2.157 5h-26.423c.977-1.109 1.932-2.746 2.157-5zm-1.199 26h-4.856v-1h6v-2h-3v-2h-2v2h-3v5h6v1h-2-4v2h1.166c-.101.311-.166.642-.166 1v2.417c-1.193-.483-2.255-1.257-3.097-2.249.058-.384.097-.773.097-1.168 0-1.971-.72-3.775-1.907-5.171.573-3.911 3.92-6.829 7.907-6.829 3.703 0 6.848 2.513 7.74 6h-2.74c-.804 0-1.58.401-2.144 1zm-16.856 3h-2v-1c0-.819-.417-1.607-1.034-2.172.91-.536 1.947-.828 3.034-.828 3.309 0 6 2.691 6 6 0 2.156-1.19 4.115-3 5.173v-4.173c0-1.738-1.262-3-3-3zm0-22c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm4.374 17.31c-.099-.065-.202-.124-.304-.185.141-.063.278-.131.415-.2-.04.127-.075.256-.111.385zm9.626-7.31c-1.606 0-3.13.38-4.482 1.057.31-.964.482-1.991.482-3.057 0-3.273-1.588-6.175-4.025-8h16.025v13.998c-1.832-2.44-4.743-3.998-8-3.998zm-22-10h2.025c-.768.575-1.45 1.257-2.025 2.025zm3.924 17.123c-.425.253-.828.545-1.204.877h-2.72v-4.025c1.015 1.356 2.361 2.447 3.924 3.148zm31.076 5.641 9-2.455v11.382l-9-2.455zm-47-30.764c0-13.051 9.398-15 15-15 4.031 0 9.423 2.083 11.105 5.447l.895 1.789.895-1.789c1.682-3.364 7.074-5.447 11.105-5.447 5.602 0 15 1.949 15 15 0 11.248-6.911 17.153-10 19.232v-12.85l-.553-.276c-.032-.016-2.907-1.506-3.376-5.106h3.929v-7h-34v7h3.93c-.459 3.559-3.251 5.041-3.377 5.105l-.553.277v12.85c-3.089-2.079-10-7.984-10-19.232zm7 37.236-9 2.455v-11.382l9 2.455zm5 5.764v-2h.094c.441.757.989 1.434 1.635 2zm12.274 0c.99-.872 1.761-1.982 2.226-3.243.465 1.261 1.236 2.371 2.226 3.243zm14.997 0c.646-.566 1.194-1.243 1.635-2h1.094v2z"></path><path d="m24 40h2v-2h3v-5h-6v-1h6v-2h-3v-2h-2v2h-3v5h6v1h-6v2h3z"></path></g></g></svg>
    </a>
    <a href="https://t.me/lilithraws" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Lilith-Raws on Telegram'}" alt="Lilith-Raws on Telegram">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" class="mdui-icon" style="width: 24px; height:24px; transform: translate(-12px, -12px) scale(1.5);">
        <path d="M37.1 13L9.4 24c-.9.3-.8 1.6.1 1.9l7 2.2l2.8 8.8c.2.7 1.1.9 1.6.4l4.1-3.8l7.8 5.7c.6.4 1.4.1 1.6-.6l5.4-23.2c.3-1.7-1.2-3-2.7-2.4zM20.9 29.8L20 35l-2-7.2L37.5 15L20.9 29.8z" fill="#f2f2f2"/>
      </svg>
    </a>`;
	$('#nav').html(html);
}

// 渲染文件列表
function list(path) {
  var content = `
	<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>

	 <div class="mdui-row"> 
	  <ul class="mdui-list"> 
	   <li class="mdui-list-item th"> 
	    <div class="mdui-col-xs-12 mdui-col-sm-7">
	     名稱
	<i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-3 mdui-text-right">
	     時間
	<i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-2 mdui-text-right">
	     大小
	<i class="mdui-icon material-icons icon-sort" data-sort="size" data-order="downward">expand_more</i>
	    </div> 
	    </li> 
	  </ul> 
	 </div> 
	 <div class="mdui-row"> 
	  <ul id="list" class="mdui-list"> 
	  </ul> 
	  <div id="count" class="mdui-hidden mdui-center mdui-text-center mdui-m-b-3 mdui-typo-subheading mdui-text-color-blue-grey-500">共 <span class="number"></span> 項</div><p>群組Discord: <a style="color:#00BB00;" href = "https://discord.com/invite/XrAa7RDBhw">https://discord.com/invite/XrAa7RDBhw</a></p>
	 </div>
	 <div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;"></div>
	`;
  $('#content').html(content);

  var password = localStorage.getItem('password' + path);
  $('#list').html(`<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>`);
  $('#readme_md').hide().html('');
  $('#head_md').hide().html('');

  /**
   * 列目录请求成功返回数据后的回调
   * @param res 返回的结果(object)
   * @param path 请求的路径
   * @param prevReqParams 请求时所用的参数
   */
  function successResultCallback(res, path, prevReqParams) {

    // 把 nextPageToken 和 currentPageIndex 暂存在 list元素 中
    $('#list')
      .data('nextPageToken', res['nextPageToken'])
      .data('curPageIndex', res['curPageIndex']);

    // 移除 loading spinner
    $('#spinner').remove();

    if (res['nextPageToken'] === null) {
      // 如果是最后一页，取消绑定 scroll 事件，重置 scroll_status ，并 append 数据
      $(window).off('scroll');
      window.scroll_status.event_bound = false;
      window.scroll_status.loading_lock = false;
      append_files_to_list(path, res['data']['files']);
    } else {
      // 如果不是最后一页，append数据 ，并绑定 scroll 事件（如果还未绑定），更新 scroll_status
      append_files_to_list(path, res['data']['files']);
      if (window.scroll_status.event_bound !== true) {
        // 绑定事件，如果还未绑定
        $(window).on('scroll', function () {
          var scrollTop = $(this).scrollTop();
          var scrollHeight = getDocumentHeight();
          var windowHeight = $(this).height();
          // 滚到底部
          if (scrollTop + windowHeight > scrollHeight - (Os.isMobile ? 130 : 80)) {
            /*
                滚到底部事件触发时，如果此时已经正在 loading 中，则忽略此次事件；
                否则，去 loading，并占据 loading锁，表明 正在 loading 中
             */
            if (window.scroll_status.loading_lock === true) {
              return;
            }
            window.scroll_status.loading_lock = true;

            // 展示一个 loading spinner
            $(`<div id="spinner" class="mdui-spinner mdui-spinner-colorful mdui-center"></div>`)
              .insertBefore('#readme_md');
            mdui.updateSpinners();
            // mdui.mutation();

            let $list = $('#list');
            requestListPath(path, {
                password: prevReqParams['password'],
                page_token: $list.data('nextPageToken'),
                // 请求下一页
                page_index: $list.data('curPageIndex') + 1
              },
              successResultCallback,
              // 密码和之前相同。不会出现 authError
              null
            )
          }
        });
        window.scroll_status.event_bound = true
      }
    }

    // loading 成功，并成功渲染了新数据之后，释放 loading 锁，以便能继续处理 "滚动到底部" 事件
    if (window.scroll_status.loading_lock === true) {
      window.scroll_status.loading_lock = false
    }
  }

  // 开始从第1页请求数据
  requestListPath(path, {password: password},
    successResultCallback,
    function (path) {
      $('#spinner').remove();
      var pass = prompt("通關密語", "");
      localStorage.setItem('password' + path, pass);
      if (pass != null && pass != "") {
        list(path);
      } else {
        history.go(-1);
      }
    });
}

/**
 * 把请求得来的新一页的数据追加到 list 中
 * @param path 路径
 * @param files 请求得来的结果
 */
function append_files_to_list(path, files) {
  var $list = $('#list');
  // 是最后一页数据了吗？
  var is_lastpage_loaded = null === $list.data('nextPageToken');
  var is_firstpage = '0' == $list.data('curPageIndex');

  html = "";
  let targetFiles = [];
  for (i in files) {
    var item = files[i];
    var p = path+encodeURIComponent(item.name) + '/';
    if (item['size'] == undefined) {
      item['size'] = "";
    }

    item['modifiedTime'] = utc2beijing(item['modifiedTime']);
    item['size'] = formatFileSize(item['size']);
    if (item['mimeType'] == 'application/vnd.google-apps.folder') {
      html += `<li class="mdui-list-item mdui-ripple"><a href="${p}" class="folder">
	            <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate" title="${item.name}">
	            <i class="mdui-icon material-icons">folder_open</i>
	              ${item.name}
	            </div>
	            <div class="mdui-col-sm-3 mdui-text-right">${item['modifiedTime']}</div>
	            <div class="mdui-col-sm-2 mdui-text-right">${item['size']}</div>
	            </a>
	        </li>`;
    } else {
      var p = path+encodeURIComponent(item.name);
      const filepath = path+encodeURIComponent(item.name);
      var c = "file";

      // 渲染head.md
			get_file('/0:/HEAD.md', item, (data) => {
				markdown('#head_md', data)
			})

      // 当加载完最后一页后，才显示 README ，否则会影响滚动事件 + 隱藏項目
      if (is_lastpage_loaded && item.name == "README.md") {
        get_file(p, item, function (data) {
          markdown("#readme_md", data);
        });
        continue
      }
      if (item.name == "HEAD.md") {
        // get_file(p, item, function (data) {
        //   markdown("#head_md", data);
        // });
        continue
      }
      var ext = p.split('.').pop().toLowerCase();
      html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
	          <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate" title="${item.name}">
	          <i class="mdui-icon material-icons">insert_drive_file</i>
	            ${item.name}
	          </div>
	          <div class="mdui-col-sm-3 mdui-text-right">${item['modifiedTime']}</div>
	          <div class="mdui-col-sm-2 mdui-text-right">${item['size']}</div>
	          </a>
	      </li>`;
    }
  }

  if (targetFiles.length > 0) {
    let old = localStorage.getItem(path);
    let new_children = targetFiles;
    // 第1页重设；否则追加
    if (!is_firstpage && old) {
      let old_children;
      try {
        old_children = JSON.parse(old);
        if (!Array.isArray(old_children)) {
          old_children = []
        }
      } catch (e) {
        old_children = [];
      }
      new_children = old_children.concat(targetFiles)
    }

    localStorage.setItem(path, JSON.stringify(new_children))
  }

  // 是第1页时，去除横向loading条
  $list.html(($list.data('curPageIndex') == '0' ? '' : $list.html()) + html);
  // 是最后一页时，统计并显示出总项目数
  if (is_lastpage_loaded) {
    $('#count').removeClass('mdui-hidden').find('.number').text($list.find('li.mdui-list-item').length);
  }
}

/**
 * 渲染搜索结果列表。有大量重复代码，但是里面有不一样的逻辑，暂时先这样分开弄吧
 */
function render_search_result_list() {
  var content = `
	<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>

	 <div class="mdui-row"> 
	  <ul class="mdui-list"> 
	   <li class="mdui-list-item th"> 
	    <div class="mdui-col-xs-12 mdui-col-sm-7">
	     名稱
	<i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-3 mdui-text-right">
	     時間
	<i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-2 mdui-text-right">
	     大小
	<i class="mdui-icon material-icons icon-sort" data-sort="size" data-order="downward">expand_more</i>
	    </div> 
	    </li> 
	  </ul> 
	 </div> 
	 <div class="mdui-row"> 
	  <ul id="list" class="mdui-list"> 
	  </ul> 
	  <div id="count" class="mdui-hidden mdui-center mdui-text-center mdui-m-b-3 mdui-typo-subheading mdui-text-color-blue-grey-500">共 <span class="number"></span> 項</div><p>群組Discord: <a style="color:#00BB00;" href = "https://discord.com/invite/XrAa7RDBhw">https://discord.com/invite/XrAa7RDBhw</a></p>
	 </div>
	 <div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;"></div>
	`;
  $('#content').html(content);

  $('#list').html(`<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>`);
  $('#readme_md').hide().html('');
  $('#head_md').hide().html('');

  /**
   * 搜索请求成功返回数据后的回调
   * @param res 返回的结果(object)
   * @param path 请求的路径
   * @param prevReqParams 请求时所用的参数
   */
  function searchSuccessCallback(res, prevReqParams) {

    // 把 nextPageToken 和 currentPageIndex 暂存在 list元素 中
    $('#list')
      .data('nextPageToken', res['nextPageToken'])
      .data('curPageIndex', res['curPageIndex']);

    // 移除 loading spinner
    $('#spinner').remove();

    if (res['nextPageToken'] === null) {
      // 如果是最后一页，取消绑定 scroll 事件，重置 scroll_status ，并 append 数据
      $(window).off('scroll');
      window.scroll_status.event_bound = false;
      window.scroll_status.loading_lock = false;
      append_search_result_to_list(res['data']['files']);
    } else {
      // 如果不是最后一页，append数据 ，并绑定 scroll 事件（如果还未绑定），更新 scroll_status
      append_search_result_to_list(res['data']['files']);
      if (window.scroll_status.event_bound !== true) {
        // 绑定事件，如果还未绑定
        $(window).on('scroll', function () {
          var scrollTop = $(this).scrollTop();
          var scrollHeight = getDocumentHeight();
          var windowHeight = $(this).height();
          // 滚到底部
          if (scrollTop + windowHeight > scrollHeight - (Os.isMobile ? 130 : 80)) {
            /*
                滚到底部事件触发时，如果此时已经正在 loading 中，则忽略此次事件；
                否则，去 loading，并占据 loading锁，表明 正在 loading 中
             */
            if (window.scroll_status.loading_lock === true) {
              return;
            }
            window.scroll_status.loading_lock = true;

            // 展示一个 loading spinner
            $(`<div id="spinner" class="mdui-spinner mdui-spinner-colorful mdui-center"></div>`)
              .insertBefore('#readme_md');
            mdui.updateSpinners();
            // mdui.mutation();

            let $list = $('#list');
            requestSearch({
                q: window.MODEL.q,
                page_token: $list.data('nextPageToken'),
                // 请求下一页
                page_index: $list.data('curPageIndex') + 1
              },
              searchSuccessCallback
            )
          }
        });
        window.scroll_status.event_bound = true
      }
    }

    // loading 成功，并成功渲染了新数据之后，释放 loading 锁，以便能继续处理 "滚动到底部" 事件
    if (window.scroll_status.loading_lock === true) {
      window.scroll_status.loading_lock = false
    }
  }

  // 开始从第1页请求数据
  requestSearch({q: window.MODEL.q}, searchSuccessCallback);
}

/**
 * 追加新一页的搜索结果
 * @param files
 */
function append_search_result_to_list(files) {
  var $list = $('#list');
  // 是最后一页数据了吗？
  var is_lastpage_loaded = null === $list.data('nextPageToken');
  // var is_firstpage = '0' == $list.data('curPageIndex');

  html = "";

  for (i in files) {
    var item = files[i];
    if (item['size'] == undefined) {
      item['size'] = "";
    }

    item['modifiedTime'] = utc2beijing(item['modifiedTime']);
    item['size'] = formatFileSize(item['size']);
    if (item['mimeType'] == 'application/vnd.google-apps.folder') {
      html += `<li class="mdui-list-item mdui-ripple"><a id="${item['id']}" onclick="onSearchResultItemClick(this)" class="folder">
	            <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate" title="${item.name}">
	            <i class="mdui-icon material-icons">folder_open</i>
	              ${item.name}
	            </div>
	            <div class="mdui-col-sm-3 mdui-text-right">${item['modifiedTime']}</div>
	            <div class="mdui-col-sm-2 mdui-text-right">${item['size']}</div>
	            </a>
	        </li>`;
    } else {
      switch(item.name) { // 隱藏項目
				case 'README.md':
					continue
				case 'HEAD.md':
					continue
			}

      var c = "file";
      var ext = item.name.split('.').pop().toLowerCase();
      html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a id="${item['id']}" gd-type="${item.mimeType}" onclick="onSearchResultItemClick(this)" class="${c}">
	          <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate" title="${item.name}">
	          <i class="mdui-icon material-icons">insert_drive_file</i>
	            ${item.name}
	          </div>
	          <div class="mdui-col-sm-3 mdui-text-right">${item['modifiedTime']}</div>
	          <div class="mdui-col-sm-2 mdui-text-right">${item['size']}</div>
	          </a>
	      </li>`;
    }
  }

  // 是第1页时，去除横向loading条
  $list.html(($list.data('curPageIndex') == '0' ? '' : $list.html()) + html);
  // 是最后一页时，统计并显示出总项目数
  if (is_lastpage_loaded) {
    $('#count').removeClass('mdui-hidden').find('.number').text($list.find('li.mdui-list-item').length);
  }
}

/**
 * 搜索结果项目点击事件
 * @param a_ele 点击的元素
 */
function onSearchResultItemClick(a_ele) {
  var me = $(a_ele);
  var can_preview = me.hasClass('view');
  var cur = window.current_drive_order;
  var dialog = mdui.dialog({
    title: '',
    content: '<div class="mdui-text-center mdui-typo-title mdui-m-b-1">喔逆醬人家在讀取目標路徑...</div><div class="mdui-spinner mdui-spinner-colorful mdui-center"></div>',
    // content: '<div class="mdui-spinner mdui-spinner-colorful mdui-center"></div>',
    history: false,
    modal: true,
    closeOnEsc: true
  });
  mdui.updateSpinners();

  // 请求获取路径
  $.post(`/${cur}:id2path`, {id: a_ele.id}, function (data) {
    if (data) {
      dialog.close();
      var href = `/${cur}:${data}${can_preview ? '?a=view' : ''}`;
      dialog = mdui.dialog({
        title: '<i class="mdui-icon material-icons">&#xe815;</i>目標路徑',
        content: `<a href="${href}">${data}</a>`,
        history: false,
        modal: true,
        closeOnEsc: true,
        buttons: [
          {
            text: '打開', onClick: function () {
              window.location.href = href
            }
          }, {
            text: '在新的分頁打開吧', onClick: function () {
              window.open(href)
            }
          }
          , {text: '取消'}
        ]
      });
      return;
    }
    dialog.close();
    dialog = mdui.dialog({
      title: '<i class="mdui-icon material-icons">&#xe811;</i>喔逆醬人家讀取不到',
      content: 'o(╯□╰)o 喔逆醬的次元空間不存在此項目',
      history: false,
      modal: true,
      closeOnEsc: true,
      buttons: [
        {text: 'WTF ???'}
      ]
    });
  })
}

function get_file(path, file, callback) {
  var key = "file_path_" + path + file['modifiedTime'];
  var data = localStorage.getItem(key);
  if (data != undefined) {
    return callback(data);
  } else {
    $.get(path, function (d) {
      localStorage.setItem(key, d);
      callback(d);
    });
  }
}

//时间转换
function utc2beijing(utc_datetime) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('Z');
  var year_month_day = utc_datetime.substr(0, T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp / 1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  var unixtimestamp = timestamp + 8 * 60 * 60;

  // 时间戳转为时间
  var unixtimestamp = new Date(unixtimestamp * 1000);
  var year = 1900 + unixtimestamp.getYear();
  var month = "0" + (unixtimestamp.getMonth() + 1);
  var date = "0" + unixtimestamp.getDate();
  var hour = "0" + unixtimestamp.getHours();
  var minute = "0" + unixtimestamp.getMinutes();
  var second = "0" + unixtimestamp.getSeconds();
  return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
    + " " + hour.substring(hour.length - 2, hour.length) + ":"
    + minute.substring(minute.length - 2, minute.length) + ":"
    + second.substring(second.length - 2, second.length);
}

// bytes自适应转换到KB,MB,GB
function formatFileSize(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + ' GB';
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes > 1) {
    bytes = bytes + ' bytes';
  } else if (bytes == 1) {
    bytes = bytes + ' byte';
  } else {
    bytes = '';
  }
  return bytes;
}

String.prototype.trim = function (char) {
  if (char) {
    return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
  }
  return this.replace(/^\s+|\s+$/g, '');
};


// README.md HEAD.md 支持
function markdown(el, data) {
  if (window.md == undefined) {
    //$.getScript('https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js',function(){
    window.md = window.markdownit();
    markdown(el, data);
    //});
  } else {
    var html = md.render(data);
    $(el).show().html(html);
  }
}

// 监听回退事件
window.onpopstate = function () {
  var path = window.location.pathname;
  render(path);
}


$(function () {
  init();
  var path = window.location.pathname;
  /*$("body").on("click", '.folder', function () {
      var url = $(this).attr('href');
      history.pushState(null, null, url);
      render(url);
      return false;
  });

  $("body").on("click", '.view', function () {
      var url = $(this).attr('href');
      history.pushState(null, null, url);
      render(url);
      return false;
  });*/

  render(path);
});
