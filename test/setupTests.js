import { shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'raf/polyfill'

configure({ adapter: new Adapter() });

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};