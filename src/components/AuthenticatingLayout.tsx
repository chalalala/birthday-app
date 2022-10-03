import React from 'react';

interface Props {
  children: any;
  title: string;
}

export default function AuthenticatingLayout(props: Props) {
  const { children, title } = props;

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <div className="flex flex-column align-center auth-form__inner">
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
