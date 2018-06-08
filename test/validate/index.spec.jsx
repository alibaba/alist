import AsyncValidator from 'async-validator';
import rules from '../../src/validate';

function handleError(errors) {
    if (!errors) return [];
    return errors.map(err => ({
        message: err.message,
        field: err.field,
    }));
}
describe('string', () => {
    it('number', () => {
        const schema = new AsyncValidator({
            name: rules.number('name'),
            nameRequired: [rules.required('nameRequired'), rules.number('nameRequired')],
        });
        schema.validate({
            name: '',
            nameRequired: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ message: '必填', field: 'nameRequired' }]);
        });
        schema.validate({
            name: '1234',
            nameRequired: '43',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: 'abc',
            nameRequired: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ message: '只能输入数字', field: 'name' }, { message: '必填', field: 'nameRequired' }]);
        });
        schema.validate({
            name: 'abc',
            nameRequired: 'def',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ message: '只能输入数字', field: 'name' }, { message: '只能输入数字', field: 'nameRequired' }]);
        });
        schema.validate({
            name: '1234',
            nameRequired: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ message: '必填', field: 'nameRequired' }]);
        });
    });
    it('int', () => {
        const schema = new AsyncValidator({
            name: [rules.int('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1.2.3.4',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '只能输入正整数' }]);
        });
    });
    it('uint', () => {
        const schema = new AsyncValidator({
            name: [rules.uint('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '-1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '只能输入非负整数' }]);
        });
        schema.validate({
            name: '0',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('length', () => {
        const schema = new AsyncValidator({
            name: [rules.length(1)],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: 10,
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '长度只能是1个字符' }]);
        });
    });
    it('minLength', () => {
        const schema = new AsyncValidator({
            name: [rules.minLength(10)],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '长度不能少于10个字符' }]);
        });
        schema.validate({
            name: 10,
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '长度不能少于10个字符' }]);
        });
        schema.validate({
            name: '12345678901',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('maxLength', () => {
        const schema = new AsyncValidator({
            name: [rules.maxLength(10)],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '12345678901',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '长度不能超过10个字符' }]);
        });
        schema.validate({
            name: 12345678901,
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '长度不能超过10个字符' }]);
        });
        schema.validate({
            name: '0',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('eq', () => {
        const schema = new AsyncValidator({
            name: [rules.eq(10, '必须等于10')],
        });
        schema.validate({
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '必须等于10' }]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '必须等于10' }]);
        });
        schema.validate({
            name: 10,
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('min', () => {
        const schema = new AsyncValidator({
            name: [rules.min(10)],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: 10,
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '0',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '不能小于10' }]);
        });
    });
    it('max', () => {
        const schema = new AsyncValidator({
            name: [rules.max(10)],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '不能大于10' }]);
        });
        schema.validate({
            name: 10,
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '0',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('email', () => {
        const schema = new AsyncValidator({
            name: [rules.email('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '邮箱格式不正确' }]);
        });
        schema.validate({
            name: 'ww@ew.com',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('url', () => {
        const schema = new AsyncValidator({
            name: [rules.url('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '链接格式不正确,请以 http:// 或者 https:// 开头' }]);
        });
        schema.validate({
            name: 'http://alibaba.com',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('phone', () => {
        const schema = new AsyncValidator({
            name: [rules.phone()],
        });
        schema.validate({
            name: '123456',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '12345678',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '123',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '错误的电话格式' }]);
        });
    });
    it('equal', () => {
        const schema = new AsyncValidator({
            name: [rules.equal('pass', 'pass和name不相同')],
        });
        schema.validate({
            pass: '123',
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            pass: '123',
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: 'pass和name不相同' }]);
        });
        schema.validate({
            pass: '123',
            name: '123',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('precision', () => {
        const schema = new AsyncValidator({
            name: [rules.precision(2)],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '12.1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '必须精确到2位小数' }]);
        });
        schema.validate({
            name: '12.14',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('alphabet', () => {
        const schema = new AsyncValidator({
            name: [rules.alphabet('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '只允许输入英文字母' }]);
        });
        schema.validate({
            name: 'abcDEF',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
    });
    it('words', () => {
        const schema = new AsyncValidator({
            name: [rules.words('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: 'abcDEF1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '#$%^&*',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '只允许输入英文字母和数字' }]);
        });
    });
    it('ascii', () => {
        const schema = new AsyncValidator({
            name: [rules.ascii('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234abcDEF!@#$%^&*(',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234abcD哈哈．，@#$%^&*(',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '只允许输入英文字母标点和数字' }]);
        });
    });
    it('idCard', () => {
        const schema = new AsyncValidator({
            name: [rules.idCard('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '123456789012345',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '123456789012345678',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '请输入正确的身份证号' }]);
        });
    });
    it('mobile', () => {
        const schema = new AsyncValidator({
            name: [rules.mobile('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '12345678901',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '8234678901',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '请输入正确的手机号码' }]);
        });
    });
    it('hsCode', () => {
        const schema = new AsyncValidator({
            name: [rules.hsCode('name')],
        });
        schema.validate({
            name: '',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234567890',
        }, (errors) => {
            expect(handleError(errors)).toEqual([]);
        });
        schema.validate({
            name: '1234',
        }, (errors) => {
            expect(handleError(errors)).toEqual([{ field: 'name', message: '请输入正确的HSCODE' }]);
        });
    });
});
