import { FunctionalComponent, h } from "preact";
import { route } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { api } from '../../api';
import * as weekTool from '../../week';
interface Props {
    username: string;
}
const pagesize = 20;
const Profile: FunctionalComponent<Props> = (props: Props) => {
    const { username } = props;
    const [empty, setEmpty] = useState(false);
    const [time, setTime] = useState<number>(Date.now());
    const [current, setCurrent] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [pages, setPages] = useState<number[]>([])
    const [list, setList] = useState([]);
    const getlist = async (username: string, current: number, pagesize: number) => {
        const res = await fetch(`${api}/report/list/${username}/${current}/${pagesize}`);
        const data = await res.json();
        console.log(data);
        setList(data.list);
        if (data.list.length == 0) {
            setEmpty(true);
        }
        const arr = [];
        for (let index = 1; index <= data.page.max; index++) {
            arr.push(index)
        }
        setPages(arr);
        setCurrent(current);
        setMaxPage(data.page.max);
    }
    const go_view = (year: number, week: number) => {
        route(`/${username}/${year}/${week}`)
    }
    useEffect(() => {
        getlist(username, current, pagesize)
    }, []);


    return (
        <div class={style.profile}>
            {
                list.map((item: any) => {
                    const { from, to } = weekTool.getrange(item.year, item.week)
                    return (
                        <li className={style.li} onClick={() => {
                            go_view(item.year, item.week)
                        }}>
                            {item.year} 年 第 {item.week} 周 ({from}~{to})
                        </li>
                    )
                })
            }
            {
                empty && <div className="empty">
                    <p class="empty-title h5">empty</p>
                    <p class="empty-subtitle">{username} have no reports</p>
                </div>
            }
            {
                pages.length > 1 && <ul class="pagination">
                    {pages.map(page => {
                        return (
                            <li onClick={() => {
                                getlist(username, page, pagesize);
                            }} className={page == current ? "page-item active" : "page-item"}><a>{page}</a></li>
                        )
                    })}
                </ul>
            }

        </div>
    );
};

export default Profile;
