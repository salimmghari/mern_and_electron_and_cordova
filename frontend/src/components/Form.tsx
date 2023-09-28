import React from 'react';


interface FormProps {
  children?: any;
}


const Form = (props: FormProps): JSX.Element => {
  return (
    <form className="w-full p-10 secondary-bg-color rounded-md primary-border shadow-lg">
      {props.children}
    </form>
  );
}


export default Form;
