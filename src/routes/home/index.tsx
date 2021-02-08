import { FunctionalComponent, h } from "preact";
import { route } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { api } from '../../api';
const pagesize = 10;
const Home: FunctionalComponent = () => {
  const [current, setCurrent] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [pages, setPages] = useState<number[]>([])
  const [list, setList] = useState([]);
  const getlist = async (current: number) => {
    setCurrent(current);
    const res = await fetch(`${api}/user/list/${current}/${pagesize}`);
    const data = await res.json();
    console.log(data);
    setList(data.list);
    const arr = [];
    for (let index = 1; index <= data.page.max; index++) {
      arr.push(index)
    }
    setPages(arr);
    setMaxPage(data.page.max);
  };

  useEffect(() => {
    getlist(current);
  }, []);

  const go_profile = (username: string) => {
    route(`/${username}`)
  }
  return (
    <div class={style.home}>
      <h2>user list</h2>
      {
        list.map((item: any) => {
          return (
            <li onClick={() => {
              go_profile(item.username)
            }}>{item.username}</li>
          )
        })
      }{
        pages.length > 1 && <ul class="pagination">
          {pages.map(page => {
            return (
              <li onClick={() => {
                getlist(page);
              }} className={page == current ? "page-item active" : "page-item"}><a>{page}</a></li>
            )
          })}
        </ul>
      }

    </div>
  );
};

export default Home;
