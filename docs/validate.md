# 基本

- layout: default
- order: 0

最简单的用法, 关于用法教程请参考 [basic.md](./basic.md)

---

````js
import Validate from '../src/validate';

(async () => {
        const schema = new Validate({
            name: {
                label: '姓名',
                validate: (schema, value, field, source) => {
                    if (value === '123') {
                        return {};
                    }
                    return Promise.resolve({
                        customerType: false,
                    });
                },
                message: 'not equal 123',
            },
        });
        console.log(await schema.validate({ name: '1234' }));
    })()
````
