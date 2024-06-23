# Web预览Pdf

::: tip
采用pdf.js实现，支持预览PDF文件。
:::

## Base64编码Pdf字节流展示

``` javascript
{
	/**
	* base64转uint8数组
	*/
	base64ToUint8Array: function (base64data) {
        var raw = window.atob(base64data);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return uInt8Array;
    },
	renderPdf: function(){
	    var scale = this.scale;
            var cnt = this.pdf.numPages;
            var container = this.$refs.canvasContainer;
            // 倒叙删除子节点
            var childs = container.childNodes;
            for (var i = childs.length - 1; i >= 0; i--) {
                container.removeChild(childs[i]);
            }
            for (var i = 0; i < cnt; i++) {
                var canvas = document.createElement("canvas");
                container.appendChild(canvas);
                this.pdf.getPage(i + 1).then(function (page) {
                    viewport = page.getViewport({
                        scale: scale
                    });
                    context = this.getContext('2d');
                    this.height = viewport.height;
                    this.width = viewport.width;
                    this.style.height = viewport.height;
                    this.style.width = viewport.width;
                    page.render({
                        viewport: viewport,
                        canvasContext: context
                    });
        	    }.bind(canvas));
            }
	    }
	},
	loadPdf: function(){
	    var pdfContent = this.base64ToUint8Array(data);
        var loadingTask = pdfjsLib.getDocument(pdfContent);
        loadingTask.promise.then(function (pdf) {
		    this.pdf = pdf;
            this.renderPdf();
        }.bind(this));
	}
}
```

## Pdf文件展示

``` javascript
const url = 'http://127.0.0.1/1.pdf';
const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf){
	pdf.getPage(1).then(function(page1){
	    const scale = 3;
	    const viewport = page1.getViewport({
	        scale
	    });	  
	    const outputScale = window.devicePixelRatio || 1;	  
	    // 获取canvas对象
	    const canvas = document.getElementById('the-canvas');
	    const context = canvas.getContext('2d');	  
	    canvas.width = Math.floor(viewport.width * outputScale);
	    canvas.height = Math.floor(viewport.height * outputScale);
	    canvas.style.width = Math.floor(viewport.width) + "px";
	    canvas.style.height = Math.floor(viewport.height) + "px";	  
	    const transform = outputScale !== 1
	        ? [outputScale, 0, 0, outputScale, 0, 0]
	        : null;
	    const renderContext = {
	        canvasContext: context,
	        transform,
	        viewport,
	    };
	    page1.render(renderContext);
	});
});
```