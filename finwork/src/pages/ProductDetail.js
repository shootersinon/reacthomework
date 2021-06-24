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
    td = tr[i].getElementsByTagName("td")[3];
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

const ProductDetail = () => {

  const {
    
    order,
    setorder,
    details,
    detailsLength,
    editMode2,
    cancelEdit2,
    updatedetails,
    deletedetails,
  } = useContext(AppContext);
  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  console.log("OK")
  console.log(details)

  const saveBtn = () => {
    updatedetails(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (seq,OrderId,EmpId,CustId,CustName,OrderDate,Descript) => {
    setNewData({ seq,OrderId,EmpId,CustId,CustName,OrderDate,Descript});
    editMode2(seq);
  };
  const seetorder = (OrderId) =>{
    setorder(OrderId);
  }
  const deleteConfirm = (seq) => {
    if (window.confirm("Are you sure?")) {
      deletedetails(seq);
    }
  };
  return !detailsLength ? (  
    <p>{detailsLength === null ? "Loading..." : "Please insert some products."}</p>
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
        color="primary"
        variant="contained"
        onClick={() => navigate('/app/FormD', { replace: true })}
      >
        新增訂單
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              onChange={myFunction}
              data-table="order-table"
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
              placeholder="搜尋公司名稱"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
    <table border="1" width="100%" id="myTable">
        <tr>
          <th>訂單編號</th>
          <th>員工代號</th>
          <th>客戶代號</th>
          <th>客戶名稱</th>
          <th>訂單日期</th>
          <th>備註</th>
          <th>動作</th>
        </tr>
      <tbody>
        {details.map(({ seq,OrderId,EmpId,CustId,CustName,OrderDate,Descript, isEditing }) => {
          return isEditing === true ? (
            <tr key={seq}>
              <td>
                {OrderId}
              </td>
              <td>
                {EmpId}
              </td>
              <td align="center">
                {CustId}
              </td>
              <td align="center">
                {CustName}
              </td>
              <td align="center">
                <input
                  type="text"
                  defaultValue={OrderDate}
                  onChange={(e) => updateNewData(e, "OrderDate")}
                />
              </td>
              <td align="center">
                <input
                  type="text"
                  defaultValue={Descript}
                  onChange={(e) => updateNewData(e, "Descript")}
                />
              </td>
              <td align="center">
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit2(seq)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={seq}>
              <td>{OrderId}</td>
              <td>{EmpId}</td>
              <td>{CustId}</td>
              <td>{CustName}</td>
              <td>{OrderDate}</td>
              <td>{Descript}</td>
              <td align="center" width="150px">
                <button
                  className="btn default-btn"
                  onClick={() =>enableEdit(seq,OrderId,EmpId,CustId,CustName,OrderDate,Descript)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(OrderId)}
                >
                  Delete
                </button>
                <button
                  className="btn orange-btn"
                  onClick={() =>{navigate('/app/Detail', { replace: true })
                              seetorder(OrderId)}}
                >
                  Details
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

export default ProductDetail;