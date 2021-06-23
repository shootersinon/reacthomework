import { useState, useContext } from "react";
import { AppContext } from "../Context";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const Formp = () => {
  const { insertProduct } = useContext(AppContext);
  const [newProduct, setNewProduct] = useState({});
  const navigate = useNavigate();
  // Storing the Insert User Form Data.
  const addNewProduct = (e, field) => {
    setNewProduct({
      ...newProduct,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitProduct = (e) => {
    e.preventDefault();
    insertProduct(newProduct);
    e.target.reset();
  };
  function turnpage() {
    navigate('/app/customers', { replace: true })
  }

  return (
    <form className="insertForm" onSubmit={submitProduct}>
      <h2>新增產品</h2>
      <label htmlFor="_name">產品名稱</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewProduct(e, "pname")}
        autoComplete="off"
        required
      />
      <label htmlFor="_email">價錢</label>
      <input
        type="text"
        id="_email"
        onChange={(e) => addNewProduct(e, "price")}
        autoComplete="off"
        required
      />
      <label htmlFor="_email">產品代號</label>
      <input
        type="text"
        id="_email"
        onChange={(e) => addNewProduct(e, "pid")}
        autoComplete="off"
        required
      />
      <label htmlFor="_name">成本</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewProduct(e, "cost")}
        autoComplete="off"
        required
      />
      <input type="submit" value="新增"/>
      <input type="button" value="返回" onClick={turnpage}/>
    </form>
  );
};

export default Formp;