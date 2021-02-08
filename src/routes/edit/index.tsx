import { FunctionalComponent, h } from "preact";
import { route } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { api } from '../../api';
import MDEditor from '@uiw/react-md-editor';
import * as weekTool from '../../week';
interface Props {
  username: string;
  year: string,
  week: string
}
interface Report {
  username: string,
  year: number,
  week: number,
  text: string
}
interface Imsg {
  type: string,
  text: string
}
const Edit: FunctionalComponent<Props> = (props: Props): h.JSX.Element => {
  const { username, year, week } = props;
  const [value, setValue] = useState("");
  const [weekfrom, setWeekfrom] = useState("");
  const [weekto, setWeekto] = useState("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [report, setReport] = useState<Report | null>(null)
  const [jwt, setJwt] = useState<string | null>(null);
  const [msg, setMsg] = useState<Imsg | null>(null)

  const getReport = async () => {
    const res = await fetch(`${api}/report/${username}/${year}/${week}`);
    if (res.status == 200) {
      const data = await res.json();
      console.log(data.report)
      setReport(data.report);
      setValue(data.report.text);
      setIsEdit(true);
    } else {
      console.log('new edit')
      setReport({
        username: username,
        year: parseInt(year),
        week: parseInt(week),
        text: ""
      });
      setIsEdit(false);
    }
  };

  const save = async () => {
    const res = await fetch(`${api}/report`, {
      method: isEdit ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'jwt': jwt ? jwt : 'none'
      },
      body: JSON.stringify({
        username: username,
        year: report?.year,
        week: report?.week,
        text: value
      })
    });
    if (res.status == 200) {
      setMsg({
        type: "success",
        text: await res.text()
      })
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } else {
      setMsg({
        type: "error",
        text: await res.text()
      })
    }

  }
  useEffect(() => {
    setJwt(localStorage.getItem('jwt'))
    getReport();
    const {from,to} = weekTool.getrange(parseInt(year),parseInt(week));
    setWeekfrom(from);
    setWeekto(to);
  }, [])

  // useEffect(() => {
  //   setReport((prevState) => ({
  //     ...prevState,
  //     text: value,
  //   }));
  // }, [value]);

  const go_profile = (username: string) => {
    route(`profile/${username}`)
  }
  return (
    <div class={style.home}>
      <h2>{report?.year} 年 第 {report?.week} 周 ({weekfrom}~{weekto}) <button className="btn btn-primary" onClick={() => {
        save();
      }}>{isEdit ? 'save' : 'post'}</button></h2> 
      {
        msg && <div className={`toast toast-${msg?.type}`}>{msg?.text}</div>
      }
      <div className="container">
        <MDEditor
          value={value}
          height={500}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default Edit;
