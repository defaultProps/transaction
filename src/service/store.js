import Cookies from 'js-cookie'

Cookies.set('name', 'value', { expires: 7, path: '' });//7天过期
Cookies.set('name', { foo: 'bar' });//设置一个json
