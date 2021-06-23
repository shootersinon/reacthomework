import { useContext, useState } from "react";
import React from 'react'
import { Helmet } from 'react-helmet';
import { AppContext } from "../Context";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

const Detail = () => {
  const {
    order,
    setorder,
    pdetails,
    pdetailsLength,
    editMode3,
    cancelEdit3,
    updatepdetails,
    deletepdetails,
  } = useContext(AppContext);
  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  console.log("OK")
  console.log(pdetails)
  const saveBtn = () => {
    updatepdetails(newData);
  };
  console.log(order)
  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (seq,orderid,prodid,qty,discount) => {
    setNewData({ seq,orderid,prodid,qty,discount});
    editMode3(seq);
  };

  const deleteConfirm = (seq) => {
    if (window.confirm("Are you sure?")) {
      deletepdetails(seq);
    }
  };
  return !pdetailsLength ? (  
    <p>{pdetailsLength === null ? "Loading..." : "Please insert some products."}</p>
  ) : (
  <Box>
    <Box>
    <Helmet>
      <title>Product details | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="inherit"
        variant="contained"
        onClick={() => navigate('/app/products', { replace: true })}
      >
        返回
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate('/app/FormD2', { replace: true })}
      >
        新增明細
      </Button>

    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              onChange={myFunction}
              id="myInput"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="搜尋訂單明細"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
    <table border="1" width="100%" id="myTable">
        <tr>
          <th>序號</th>
          <th>訂單代號</th>
          <th>產品代號</th>
          <th>數量</th>
          <th>折扣</th>
          <th>動作</th>
        </tr>
      <tbody>
        {pdetails.map(({ seq,orderid,prodid,qty,discount, isEditing }) => {
          if(order!==orderid){
            return
          }
          return isEditing === true ? (
            <tr key={seq}>
              <td>
                {seq}
              </td>
              <td>
                {orderid}
              </td>
              <td>
                {prodid}
              </td>
              <td align="center">
                <input
                  type="text"
                  defaultValue={qty}
                  onChange={(e) => updateNewData(e, "qty")}
                />
              </td>
              <td align="center">
                <input
                  type="text"
                  defaultValue={discount}
                  onChange={(e) => updateNewData(e, "discount")}
                />
              </td>
              <td align="center">
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit3(seq)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={seq}>
              <td>{seq}</td>
              <td>{orderid}</td>
              <td>{prodid}</td>
              <td>{qty}</td>
              <td>{discount}</td>
              <td align="center" width="150px">
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(seq,orderid,prodid,qty,discount)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(seq)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Box>
  );
};

export default Detail;