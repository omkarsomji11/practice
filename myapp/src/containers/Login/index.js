import { Form, Input, Button, Layout, Card } from "antd";
import auth from "../../app/auth.js"; //Field 'browser' doesn't contain a valid alias configuration
import "./index.less";
const { Content } = Layout;

const AppLogin = (props) => {
  const onFinish = async (values) => {
    console.log("Success:", values);
    await (values.username === "foo" &&
      values.password === "bar" &&
      auth.login(() => {
        props.history.push("/app");
      }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 380 }}
      >
        <Card style={{ width: 400 }} title="Login">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Content>
  );
};

export default AppLogin;
