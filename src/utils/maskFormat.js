import MaskedInput from 'react-text-mask';

export const PhoneNumberMaskInput = (props) => {
  const { ...other } = props;
  return (
    <MaskedInput
      {...other}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};
