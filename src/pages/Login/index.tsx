import styles from "./index.module.scss";
import { NavBar, Form, Input, List, Button,Toast} from "antd-mobile";
import { useHistory } from "react-router";
import { formValue } from "@/types/data";
import { useDispatch } from "react-redux";
import { getCode, login } from "@/store/action/login";
import { AxiosError } from "axios";
import { useRef } from "react";
import { InputRef } from 'antd-mobile/es/components/input'
import { useState } from "react";
import { useEffect } from "react";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const onFinsh = async(values:formValue) => {
    try {
      await dispatch(login(values))
      console.log('登陆成功')
    } catch (e) {
      // axios的错误也有泛型
      const error = e as AxiosError<{ message: string }>
      console.log(error.response?.data.message)
    }
    Toast.show({
      content: '登录成功',
      icon: 'success',
      duration: 600,
      afterClose() {
        history.push('/home')
      }
    })
  }
  const mobileRef = useRef<InputRef>(null)
  const timeRef = useRef(-1) //定时器id
  const [time,setTime] = useState(0)
  // 获取验证码
  const onGetCode = () => {
    if(time>0){
      return
    }
    //获取手机号
    const phone = form.getFieldValue('mobile')
    const hasError = form.getFieldError('mobile').length > 0
    //如果手机号没有或者校验错误 则聚焦到input框
    if(!phone || hasError){
      console.log(1111);
      mobileRef.current?.focus()
      return
    }
    //发送验证码
    dispatch(getCode(phone))
    //倒计时
    setTime(60)
    timeRef.current = window.setInterval(()=>{
      //使用 useState的回调函数 可以解决 闭包陷阱问题
        setTime(time => time-1)
    },1000)
  }
  // time=0 或者 组件卸载时 清除 定时器
  useEffect(()=>{
    if(time===0){
      clearInterval(timeRef.current)
    }
  },[time])

  useEffect(()=>{
    return () => {
      clearInterval(timeRef.current)
    }
  },[])

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={onFinsh} initialValues={{mobile:'13800000003',code:'246810'}}
        form={form}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              {
                required: true,
                message: "手机号不能为空",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式错误",
              },
            ]}
          >
            <Input placeholder="请输入用户名" maxLength={11} ref={mobileRef}></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra" onClick={time===0 ? onGetCode :undefined}>
              {time===0 ? '发送验证码' :`还有${time}秒...`}
            </span>}
          >
            <Form.Item
              className="login-item"
              name="code"
              rules={[
                {
                  required: true,
                  message: "验证码不能为空",
                },
                {
                  pattern: /^\d{6}$/,
                  message: "验证码格式错误",
                },
              ]}
            >
              <Input placeholder="请输入验证码" maxLength={6}></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button color="primary" type='submit' block className="login-submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
