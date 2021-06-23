import { useState, useContext } from "react";
import { AppContext } from "../Context";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const FormD2 = () => {

  const { insertpdetails } = useContext(AppContext);
  const [newpdetails, setNewpdetails] = useState({});
  const navigate = useNavigate();
  // Storing the Insert User Form Data.
  const addNewpdetails = (e, field) => {
    setNewpdetails({
      ...newpdetails,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitpdetails = (e) => {
    e.preventDefault();
    insertpdetails(newpdetails);
    e.target.reset();
  };
  function turnpage() {
    navigate('/app/Detail', { replace: true })
  }

  return (
    <form className="insertForm" onSubmit={submitpdetails}>
      <h2>新增訂單明細</h2>
      <label htmlFor="orderid">訂單編號</label>
      <input
        type="text"
        id="orderid"
        onChange={(e) => addNewpdetails(e, "orderid")}
        placeholder="訂單編號"
        autoComplete="off"
        required
      />
      <label htmlFor="prodid">產品代號</label>
      <input
        type="text"
        id="prodid"
        onChange={(e) => addNewpdetails(e, "prodid")}
        placeholder="產品代號"
        autoComplete="off"
        required
      />
      <label htmlFor="qty">數量</label>
      <input
        type="text"
        id="qty"
        onChange={(e) => addNewpdetails(e, "qty")}
        placeholder="輸入數量"
        autoComplete="off"
        required
      />
      <label htmlFor="discount">折扣</label>
      <input
        type="text"
        id="discount"
        onChange={(e) => addNewpdetails(e, "discount")}
        placeholder="折扣"
        autoComplete="off"
        required
      />
      <input type="submit" value="新增"/>
      <input type="button" value="返回" onClick={turnpage}/>
    </form>
  );
};

export default FormD2;