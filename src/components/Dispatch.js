import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDispatch } from "../services/api";
import "../css/Dispatch.css";

function Dispatch({ token }) {
  const [dispatchList, setDispatchList] = useState([]);
  const [date, setDate] = useState("2024-11-01"); // 기본 날짜 고정
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [token, navigate]);

  const Dispatch_Check = async () => {

    setLoading(true)

    try {
      const response = await getDispatch(token, date);
        console.log(response.data);
      if (response.data.object && response.data.object.length > 0) {
        setDispatchList(response.data.object);
      } else {
        setDispatchList([]);
      }
    } catch (error) {
      console.error("배차 정보를 가져오는 데 실패했습니다.", error);
      alert("배차 정보를 가져오는 데 실패했습니다.");
    }

    setLoading(false)

  };

  return (
    <div>
      <h1>배차 정보 페이지</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min="2024-11-01"
        max="2024-11-03"
      />
      <button onClick={Dispatch_Check}>배차 정보 조회</button>

    {/* 현재 날짜 배차 정보 */}
    { Loading ? (null) : (   
    dispatchList.length > 0 ? (
        <ul>
          {dispatchList.map((dispatch, i) => (
            <li key={i}>
              <p>버스 번호
                <br/> <strong>{dispatch.busNumber}</strong></p>
                <br/>
              <p>실제 운행 시작 시각
                <br/> <strong>{dispatch.startTime}</strong></p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{textAlign: "center"}}>배차일보가 존재하지 않습니다.</p>
     )
    )}
    </div>
  );
}

export default Dispatch;
