import { InputLabel } from "@mui/material";
import { Button, Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";

interface LocalEnv {
  autoLoad: boolean;
  env: Record<string, string>;
}

export function EnvConfigDevtool() {
  const [env, setEnv] = useState<Record<string, string>>({});
  const [autoLoad, setAutoLoad] = useState(false);
  const defaultEnv = { ...import.meta.env };
  const listKey = ["BASE_URL"];

  useEffect(() => {
    const localEnvData = localStorage.getItem("local-env");
    if (localEnvData) {
      const localEnv = JSON.parse(localEnvData) as LocalEnv;
      if (localEnv.autoLoad) {
        setAutoLoad(localEnv.autoLoad);
        setEnv(localEnv.env);
        for (const key in localEnv.env) {
          import.meta.env[key] = localEnv.env[key];
        }
      }
    }
  }, []);

  const [form] = Form.useForm();

  const handleSetEnvClick = () => {
    const values = form.getFieldsValue();
    for (const key in values) {
      import.meta.env[key] = values[key];
    }
    setEnv(values);
  };

  const handleSaveEnvClick = () => {
    localStorage.setItem("local-env", JSON.stringify({ autoLoad, env }));
  };

  const handleResetEnvClick = () => {
    for (const key in defaultEnv) {
      import.meta.env[key] = defaultEnv[key];
    }
    localStorage.removeItem("local-env");
  };

  return (
    <div>
      <Button onClick={handleSetEnvClick}>Set Env</Button>
      <Button onClick={handleResetEnvClick}>Reset Env</Button>
      <Button onClick={handleSaveEnvClick}>Save Env</Button>
      <InputLabel>Auto Load</InputLabel>
      <Checkbox checked={autoLoad} onChange={() => setAutoLoad(prev => !prev)} />
      <Form form={form}>
        {listKey.map(v => (
          <FormItem key={v} name={v} label={v}>
            <Input />
          </FormItem>
        ))}
      </Form>
    </div>
  );
}
