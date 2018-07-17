# 前端学习路径

## 参考文档
1. [MDN web技术文档api](https://developer.mozilla.org/zh-CN/docs/Web)
2. [W3cschool](http://www.w3school.com.cn/index.html)
3. [菜鸟教程](http://www.runoob.com/)
2. [jquery api](http://jquery.cuishifeng.cn/)
3. [css api](http://www.css88.com/book/css/)
4. [廖雪峰的官网](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
5. [阮一峰的官网](http://www.ruanyifeng.com/blog/javascript/)
6. [张鑫旭的官网](http://www.zhangxinxu.com/wordpress/category/css/)

## html元素  
### 什么是html元素
>HTML 元素指的是从开始标签（start tag）到结束标签（end tag）的所有代码。  
>元素的内容是开始标签和结束标签之间的内容  
>元素的属性是包含在<font color="red">**开始标签**</font>中用来设置标签特性的内容  
>自闭和标签：无需闭合标签的标签，由于自闭合标签不能添加标签内容，所以无需闭合标签，如input、br、hr等  

### html元素类型
- 块级元素
>块级元素从新的一行开始，并占据整行空间，块级元素可以包含块级元素以及行内元素  

常用的块级元素：
H、p、div、table、ul、ol、section等

- 行内元素
>行内元素就是基本的语义级别元素，默认情况下，行内元素只能包含文本和其他行内元素

常用的行内元素：
a、span、input等

> WebKit之DOM树构建流程分析：[http://blog.csdn.net/sauphy/article/details/50168801](http://blog.csdn.net/sauphy/article/details/50168801 "WebKit之DOM树构建流程分析")

### 一个网页的基本结构
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <div>
            <h1>这是一个标题H标签</h1>
            <p>这是一个段落标签</p>
            <div>
                <a href="#">这是a标签</a>
            </div>          
        </div>
    </body>
    </html>
- `<!DOCTYPE html>`不是html标签，它用来告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。  
- 所有html文件必须都要有一个`<html>`标签。  
- `<html>`标签内包括两个部分，head和body
- `<head>`元素用于包含整个文档的一般信息，比如文档的标题`<title>`元素用于包含标题，对整个文档的描述，文档的关键字等等。  
- `<body>`元素包含文档的具体内容，我们的学习的html元素就是写在body标签内。
