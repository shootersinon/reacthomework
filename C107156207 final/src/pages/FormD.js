import { useState, useContext } from "react";
import { AppContext } from "../Context";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const FormD = () => {
  const { users,userheadpic ,setUserheadpic} = useContext(AppContext);
  const { insertdetails } = useContext(AppContext);
  const [newdetails, setNewdetails] = useState({});
  const navigate = useNavigate();
  // Storing the Insert User Form Data.
  const addNewdetails = (e, field) => {
    setNewdetails({
      ...newdetails,
      [field]: e.target.value,
    });
  };
  console.log(userheadpic.id)
  // Inserting a new user into the Database.
  const submitdetails = (e) => {
    e.preventDefault();
    insertdetails({...newdetails,EmpId:userheadpic.id});
    e.target.reset();
  };
  function turnpage() {
    navigate('/app/products', { replace: true })
  }

  return (
    <form className="insertForm" onSubmit={submitdetails}>
      <h2>新增訂單</h2>
      <label htmlFor="OrderId">訂單編號</label>
      <input
        type="text"
        id="OrderId"
        onChange={(e) => addNewdetails(e, "OrderId")}
        placeholder="訂單編號"
        autoComplete="off"
        required
      />
      <label htmlFor="_name">客戶代號</label>
      <input
        type="text"
        id="CustId"
        onChange={(e) => addNewdetails(e, "CustId")}
        placeholder="輸入客戶代號"
        autoComplete="off"
        required
      />
      <label htmlFor="OrderDate">日期</label>
      <input
        type="date"
        id="OrderDate"
        onChange={(e) => addNewdetails(e, "OrderDate")}
        placeholder="輸入日期"
        autoComplete="off"
        required
      />
      <label htmlFor="Descript">備註</label>
      <input
        type="text"
        id="Descript"
        onChange={(e) => addNewdetails(e, "Descript")}
        placeholder="輸入備註"
        autoComplete="off"
      />
      <input type="submit" value="新增"/>
      <input type="button" value="返回" onClick={turnpage}/>
    </form>
  );
};

export default FormD;