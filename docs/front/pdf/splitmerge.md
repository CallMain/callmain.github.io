# Pdf前端拆分合并

::: tip
使用pdflib进行pdf的拆分合并
:::

## 拆分&合并

``` javascript
PDFLib.PDFDocument.create().then(function(doc){ 
	doc.setTitle('demopdf');
	doc.setAuthor('callmain');
	doc.setProducer('callmain');
	doc.setCreationDate(new Date());
	// 传入uint8array的pdf文档流数组
	PDFLib.PDFDocument.load(originData).then(function(originDoc){
	    // 拷贝文档中的页数，第二个参数是pdf的页索引数组，从0开始
        doc.copyPages(originDoc, [1]).then(function(pages){
	        // 添加到新的文档中
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                doc.addPage(page);
            }
	        // 保存base64的文档流
            doc.saveAsBase64().then(function(d){
                console.log(d);
            })
	        // 保存uint8array的文档流数组
            doc.save().then(function(arr){
		        // 下载代码
                var blob = new Blob([arr]);
                // FileReader主要用于将文件内容读入内存
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                // onload当读取操作成功完成时回调
                reader.onload = function(e) {
                    var a = document.createElement('a');
		            // 设置下载的名称
                    a.download = "a.pdf";
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                })
            })
        })
    });
```