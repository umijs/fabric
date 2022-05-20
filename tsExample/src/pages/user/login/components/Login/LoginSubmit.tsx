import { Button, Form } from 'antd';
import type { ButtonProps } from 'antd/es/button';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

const FormItem = Form.Item;

type LoginSubmitProps = {
  className?: string;
} & ButtonProps;

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};

export default LoginSubmit;
