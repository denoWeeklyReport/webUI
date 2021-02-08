import { FunctionalComponent, h } from "preact";
import { route } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import "./md.css";
import { api } from '../../api';
import * as ReactMarkdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';
import MdCssModule from "./md.css";
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
const View: FunctionalComponent<Props> = (props: Props): h.JSX.Element => {
  const { username, year, week } = props;
  const [weekfrom, setWeekfrom] = useState("");
  const [weekto, setWeekto] = useState("");
  const [empty, setEmpty] = useState(false);
  const [report, setReport] = useState<Report | null>(null)
  const getReport = async () => {
    const res = await fetch(`${api}/report/${username}/${year}/${week}`);
    if (res.status == 200) {
      const data = await res.json();
      setReport(data.report);
    } else {
      console.log(404)
      setEmpty(true);
    }
  };

  const [localStorageUserName, setLocalStorageUserName] = useState<string | null>(null)

  useEffect(() => {
    const u = localStorage.getItem('username') || null;
    if (u) {
      setLocalStorageUserName(u);
    }
    getReport();
    const { from, to } = weekTool.getrange(parseInt(year), parseInt(week));
    setWeekfrom(from);
    setWeekto(to);
  }, []);

  const go_profile = (username: string) => {
    route(`/profile/${username}`)
  }
  const go_edit = () => {
    route(`/edit/${username}/${year}/${week}`)
  }
  return (
    <div class={style.home}>
      {
        report && <h2>{report?.year} 年 第 {report?.week} 周 ({weekfrom}~{weekto})</h2>
      }
      <p>{report?.username}</p>
      {
        localStorageUserName == report?.username && <p onClick={() => {
          go_edit();
        }}>Edit</p>
      }
      {/* <ReactMarkdown style={MdCssModule} children={report?.text} /> */}
      <MDEditor.Markdown source={report?.text ? report?.text : ''} />
      {
        empty && <div className="empty">
          <p class="empty-title h5">empty</p>
          <p class="empty-subtitle">{year} 年 第 {week} 周 ({weekfrom}~{weekto}) has no report</p>
          {
            localStorageUserName == username && <button className="btn btn-primary" onClick={() => {
              go_edit();
            }}>Write now</button>
          }
        </div>
      }

    </div>
  );
};

export default View;
