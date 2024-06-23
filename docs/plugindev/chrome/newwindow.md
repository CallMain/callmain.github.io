# Chrome新窗口多屏幕定位插件

在Chrome版本浏览器中，新窗口的定位功能有限制，多屏幕下新窗口默认会出现在第一个屏幕中，如果想要在第二屏幕展示时，需要手动调整窗口位置。可以通过开发插件，在Chrome中添加新窗口多屏幕定位功能。主要思路是，在页面中注入一段代码，监听页面发送过来的消息，然后通过Chrome的API修改窗口位置。

## manifest.json

> 主要关注什么url下生效，以及注入的js文件和后台执行文件，外加权限。

```json
{
    "manifest_version": 3,
    "name": "Window-Position",
    "version": "1.0.0",
    "description": "提供窗口定位及修改大小功能",
    "icons": {
        "16": "assets/logo.ico",
        "48": "assets/logo.ico",
        "128": "assets/logo.ico"
    },
    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ],
            "match_about_blank": true,
            "js": [
                "content.js"
            ],
            "all_frames": true
        }
    ],
    "background": {
        "service_worker": "background.js",
        "type": "module"
    },
    "permissions":["tabs"]
}
```

## content.js

> 注入到页面中的代码,主要监听页面发送过来的消息，然后传递给Chrome插件后台处理。

```javascript
/**
 * 监听页面发送过来的消息，可以更新窗口,此段代码会嵌入到页面中
 * @author CallMain
 */
window.addEventListener("message", function(event){
    var data = event.data || null;
    if(!Array.isArray(data) && data instanceof Object){
        // 窗口更新类型
        if(data.type === 'CM-UpdateWindow'){
            // 发送数据给后台
            chrome.runtime.sendMessage(data, ()=>{})
        }
    }
});
```

## background.js

> 插件后台处理代码，主要监听发过来的消息，然后通过Chrome的API修改窗口位置。

```javascript
/**
 * 监听发过来的事件
 * @author CallMain
 */
chrome.runtime.onMessage.addListener((event, sender, callable)=>{
    if(event.type === 'CM-UpdateWindow'){
        // 窗口刷新事件
        chrome.windows.getAll(rs=>{
            // 获取最后一个窗口进行更新
            if(Array.isArray(rs) && rs.length > 0){
                var lastWin = rs[rs.length-1];
                // 更新窗口
                chrome.windows.update(lastWin.id, {
                    top: Number.isInteger(event.top) ? event.top : lastWin.top,
                    left: Number.isInteger(event.left) ? event.left : lastWin.left,
                    width: event.width || lastWin.width,
                    height: event.height || lastWin.height,
                    focused: event.focused || lastWin.focused
                }, (e)=>{})
            }
        })
    }
})
```

## 示例

``` html
<html>
<body>
    <button id="btn">click</button>
    <script>
        window.onload = function () {
            document.getElementById('btn').addEventListener('click', () => {
                var win = window.open("file:///home/callmain/Desktop/chrome/index.html", '_blank', 'width=1366,height=800');
                window.postMessage({
                    type: 'CM-UpdateWindow',
                    left: 1920,
                    top:0,
                    focused: true
                }, "*");
            })
        }
    </script>
</body>
</html>
```