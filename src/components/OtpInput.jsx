import { useRef, useState } from 'react';

const OtpInput = ({ otpLength = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const inputs = useRef([]);

  const onInputChange = (event, index) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Focus on next input
      if (value && index < otpLength - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const onInputClear = (e, index) => {
    console.log(e.target.value, 'event.target.value');
    if (
      e.keyCode === 8 &&
      e.key === 'Backspace' &&
      !e.target.value &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const pasteValue = (e) => {
    const pasteData = e.clipboardData.getData('text').toString();
    const newOtp = [...otp];
    pasteData.split('').forEach((char, index) => {
      if (index < otpLength) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(''));

   }

  return (
    <div>
      {otp.map((res, index) => (
        <input
          key={`otp-input-${index}`}
          type="text"
          ref={(el) => (inputs.current[index] = el)}
          maxLength="1"
          className="otp-input"
          value={res}
          onChange={(e) => onInputChange(e, index)}
          onKeyDown={(e) => onInputClear(e, index)}
          onPaste={index === 0 ? pasteValue : null}
        />
      ))}
    </div>
  );
};

export default OtpInput;
