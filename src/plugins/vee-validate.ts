import { defineRule } from 'vee-validate';
import { required, integer, min_value, max_value} from '@vee-validate/rules';

defineRule('required', required);
defineRule('integer', integer);
defineRule('min_value', min_value);
defineRule('max_value', max_value);