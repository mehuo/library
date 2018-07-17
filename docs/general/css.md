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

## CSS样式表
>css样式表是用来定义一段html代码如何在浏览器上显示

### CSS样式表的定义位置
- 外部文件引用  
    `<link rel="stylesheet" href="CSS/test.CSS">`
- 内部样式表
>将样式信息写在`style`标签内，直接放在`head`标签中  

```html
<head>
    <meta charset="utf-8">  
    <title></title>  
    <style type="text/css">  
        div{  
                background: red;  
            }  
    </style>  
</head>
```
<font color="red">标准情况下，style必须要放在head标签内，如果将style放在其他标签内其实也是生效的，如放在div标签内。</font>

- 内联样式表
>将样式信息直接通过属性`style`写在开始标签内

```html
    <div style="color:red;">123</div>
```
### 样式表的优先级（4的优先级最大）
1. 浏览器缺省设置（每个浏览器的缺省设置不同，一般情况下都会先将缺省样式进行重置）  
2. 外部样式表
3. 内部样式表（位于 `<head>` 标签内部）
4. 内联样式（元素内部）

## CSS重点知识点
### 选择器  
- 内联样式
对于内联样式来说，不存在选择器的问题，样式写在哪个标签上样式就针对哪个标签以及标签下的子标签: 
```html
    <div style="font-size:12px;">这个字体是12px
		<p>p标签的字体也是12px</p>
    </div>
```
- 内部样式表、外部样式表
想要设置一个标签的样式，首先要选择这个标签，例如要设置整个页面的背景色为红色，可设置：`body{background:red}`  

- 元素选择器：
    1. 标签选择器就是通过标签名选择一个元素，如p、a等  
    2. id选择器 #div1
    3. class选择器 .class1
>这三种选择器可以同时使用，为并且的关系如`div.class1#div1`就是选择一个`class`为`class1`并且`id`为`div1`的`div`标签。
>**元素的id**就是一个元素的唯一标识符，一个html页面内，理论上一个id只能表示一个标签，可是对于css选择器来说，即使一个id被定义为多个元素了，这个样式对于多个id也是生效的，但是对于js选择器来说，如果id被重复使用了，js选择器选择的只是第一个元素。`<p id="p1">1</p>` 
>**元素的class**就是表示一个元素所属的类，一个class可以被用于多个元素，没有限制，一般情况先，写css样式表的时候尽量用class而不是id。`<p class="p1">1</p><p class="p1">1</p>` 
```html
<style>
	/*设置页面内所有p标签的font-size=12px*/
    p{font-size:12px}
	/*设置页面内id为tag-p的元素的font-size=14px*/
    #tag-p{font-size:14px;}
	/*设置页面内class为class-p元素的font-size=16px*/
    .class-p{font-size:16px;}
</style>
```
- 关系选择器：
    1. 后代选择器：如:`div p{}`，也就是`div`内包含的所有`p`元素，后代也就是`div`的所有后代
    2. 子选择器：如:`div>p{}`，代表`div`内第一层`p`元素，子就是孩子的意思。
    3. 相邻选择器：如：`div+p{}`，紧贴在`div`元素之后`p`元素
    4. 兄弟选择器：如：`div~p{}`，`div`元素后面的所有兄弟元素`p`，兄弟元素是指同级元素。
><font color="red">需要注意的是，兄弟元素是指同一个父元素下的元素，如：</font>
```html
<div class='div1'>
    <p>这个是前面的兄弟元素，选择不到</p>
    <span class="span1">123</span>
    <p>这个是兄弟元素</p>
    <p>这个是兄弟元素</p>
</div>
<div>
    <p>这个不是.span1的兄弟元素</p>
</div>
```
- 属性选择器：根据元素属性选择元素，具体请参见css手册
    1. E[att]
    2. E[att="val"]
    3. E[att~="val"]
    4. E[att^="val"]
    5. E[att$="val"]
    6. E[att*="val"]
    7. E[att|="val"]

- 伪类选择器：
>伪类对元素进行分类是基于特征(`characteristics`)而不是它们的名字、属性或者内容；原则上特征是不可以从文档树上推断得到的。
<font color="green">伪类选择器有很多，以下只介绍几种比较重要的伪类选择器</font>
1. `a:hover{}` 当鼠标放在`a`标签上时的样式
2. `div:nth-child(n)` <font color="red">n从1开始</font>，这个选择器一般要结合关系选择器一起用，如：
- `div div:nth-child(1){}`：表示div元素的后代元素`div`，并且这个`div`位于其后代元素的第一位：
```html
<div>
    <div>我是div的第一个后代元素,这个选择器会选择到我</div>
</div>
<div>
    <p>123</p>
    <div>我是div的第一个为div的后代元素，但是我div元素下第二个后代元素，这个选择器选择不到我</div>
</div>
<div>
    <h1>
        <div>我是div的后代选择器，但是这个div的第一个后代选择器选择的是h1元素，所以这个选择器选择不到我</div>
    </h1>
</div>
```
>这个选择器比较绕：我们可以这样理解：`div>div p:nth-child(2)`,空格表示后代选择器，那么我们先定位到这个伪类选择器所属选择前面的选择器，也就是`div>div`的所有后代元素，在`div>div`的所有后代元素中，我们先找到第二个后代元素，如果第二个后代元素是`p`标签，那么这个`p`标签就是我们选择的标签，如果第二个不是`p`那么这个选择器不生效。
3. `nth-of-type(n)` 如果我们要选择的是特定类型的第n个选择器，用`nth-of-type(n)`
- 伪对象选择器
1. E:before,E:after 选择器在被选元素的内容前面/后面插入内容,这个元素在js选择器中不能被选取
>伪元素选择器一般可用于给元素加图标，加编号等
```html
p:before{
    content:""/*必要属性，伪元素的内容，可以为空或者文字，或counter(item)计数器*/
    /* 其他属性和普通元素一样 */
}
```
2. 其他伪对象选择器请自行查看文档

#### 选择器优先级
>当有多个规则同时作用于一个`html`元素上时，究竟哪个规则来定义这个元素呢？  

1. 在属性后面使用!important关键字，这个属性的优先级永远最高：`{border:none !important}`
2. 作为style属性写在元素内的样式>页面内style样式表>外部样式表  
3. ID选择器>类选择器>标签选择器>通配符选择器>浏览器自定义或继承  
也可通过[特指度](http://www.cnblogs.com/wangfupeng1988/p/4285251.html)计算选择器的优先级  

### 属性
>介绍了css选择器后，就可以为所选元素添加属性了，由于css属性非常多，下面只介绍一些常用的比较难理解的属性。其他属性请自行查看[文档](http://www.css88.com/book/css/)

1. 定位
    - position:static/relative/absolute/fixed,默认static（相当于没有定位）
relative：对象遵循常规流，当添加top/right/bottom/left的时候，元素参照常规流的位置进行偏移。  
absolute：对象脱离常规流（不占用文档流位置），参照离自身最近的定位祖先根据top/right/bottom/left的值进行定位，如果没有定位祖先，则参照body的位置。  
fixed：对象脱离常规流，但偏移定位是以窗口为参考。当出现滚动条时，对象不会随着滚动。  
<font color="red">需要注意的是，当position为absolute或fixed的时候，必须要写top或bottom和right或left的值，否则会出现意想不到的效果</font>
    - z-index：默认auto，z-index的值越大，越渲染到上方。
这个属性针对定位元素，当不设置z-index的时候，元素的层叠顺序按照文档流的渲染顺讯，从上到下，从父到子。后渲染的在先渲染的元素上方。
2. 布局
    - display:inline/block/inline-block/none等
>设置display的值可以改变一个元素的布局类型  
none: 不显示，也不占据文档空间
inline：行内元素，行内元素不可以设置margin，padding，width，height的值
block：块级元素
inline-block：行内块元素，也就是这个元素不占据整行，但是又可以像block一样设置宽高等属性，inline-block有一个特点，如下：
```html
<ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
</ul>
```
<font color="red">当设置li的display为inline-block时，li之间会有几个像素的间距，这是因为两个li之间有换行符或空格，如果不希望有间隙的话可以将两个li之间的空格和换行符删除掉，如下：</font>
```
<ul>
    <li>1</li><li>2</li><li>3</li>
</ul>
```
>display还有很多其他的布局类型，以上为比较常用的三种，其他类型可查阅文档。

    - visibility visible/hidden/collapse
>对象可见性：设置一个对象是否可见，<font color="red">与display:none不同，display:none时，这个元素的宽和高都为0，当设置visibili:hidden时，虽然元素不显示，但是它依旧占据本该有的空间</font>  

    - float left/right/none
>浮动：当设置元素浮动时，浮动的元素会脱离正常的文档流，一般当我们需要将两个元素进行左右布局的时候，经常会使用浮动布局。  
[CSS float浮动的深入研究、详解及拓展](http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%B8%80/ "CSS float浮动的深入研究、详解及拓展")

    - overflow visible/auto/scroll/hidden  
>超出区域是否显示：  
visible:显示  
hidden:始终隐藏超出部分
auto:默认值，自动，当有内容超出元素区域的时候显示滚动条，不超时不显示  
scroll:始终显示滚动条  

    - overflow-x overflow-y  
>对x和y方向分别进行设置  
<font color="red">[这里需要注意，如果同一个元素X,Y轴上，其中一个设置了visible，例外一个设置了scoll或者auto，这时候，visible属性自动转变为auto](http://www.cnblogs.com/ysbpysbp/p/6135885.html?utm_source=tuicool&utm_medium=referral)</font>

### 盒模型
[盒模型(http://www.jianshu.com/p/e06e5c07f741)],请参见这篇文章，我们需要了解的是margin/padding/width/height/border/box-sizing这几个属性的设置。  

### CSS的像素说明
[一些关于Viewport与device-width的东西](http://www.cnblogs.com/koukouyifan/p/4066567.html)  

## 如何将一个设计稿转成Html静态文件
写起来太麻烦，我决定录个视频，应该会包括以下内容：  
1. 切图
2. 制作雪碧图
3. photoshop的简单操作