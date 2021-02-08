import { FunctionalComponent, h } from "preact";
import { route } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import * as weekTool from '../../week';

interface Props {
  username: string;
}

const Write: FunctionalComponent<Props> = (props: Props): h.JSX.Element => {
  const { username } = props;
  useEffect(() => {
    const { y, m, d } = weekTool.getymd();
    const week = weekTool.getWeekNumber(y, m, d);
    console.log(y, m, d, week);
    route(`/edit/${username}/${y}/${week}`)
  }, []);

  return (
    <div class={style.home}>
      <h1>write</h1>
    </div>
  );
};

export default Write;
