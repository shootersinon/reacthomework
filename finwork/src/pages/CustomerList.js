import { useContext, useState } from "react";
import { Helmet } from 'react-helmet';
import React from 'react'
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
    td = tr[i].getElementsByTagName("td")[0];
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

const ProductList = () => {

  const {
    products,
    productLength,
    editMode,
    cancelEdit,
    updateproduct,
    deleteproduct,
  } = useContext(AppContext);
  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  console.log("OK")

  const saveBtn = () => {
    updateproduct(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (pid, pname, price,cost) => {
    setNewData({ pid, pname, price ,cost});
    editMode(pid);
  };

  const deleteConfirm = (pid) => {
    if (window.confirm("Are you sure?")) {
      deleteproduct(pid);
    }
  };
  return !productLength ? (  
    <p>{productLength === null ? "Loading..." : "Please insert some products."}</p>
  ) : (
  <Box>
    <Box>
    <Helmet>
      <title>Products | Material Kit</title>
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
        onClick={() => navigate('/app/form', { replace: true })}
      >
        新增產品
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
              placeholder="搜尋產品"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
    <table border="1" width="100%" id="myTable">
        <tr>
          <th>產品名稱</th>
          <th>單價</th>
          <th>成本</th>
          <th>動作</th>
        </tr>
      <tbody>
        {products.map(({ pid, pname, price,cost, isEditing }) => {
          return isEditing === true ? (
            <tr key={pid}>
              <td>
                <input
                  type="text"
                  defaultValue={pname}
                  onChange={(e) => updateNewData(e, "pname")
                }
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={price}
                  onChange={(e) => updateNewData(e, "price")}
                />
              </td>
              <td align="center">
                <input
                  type="text"
                  defaultValue={cost}
                  onChange={(e) => updateNewData(e, "cost")}
                />
              </td>
              <td align="center">
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(pid)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={pid}>
              <td>{pname}</td>
              <td>{price}</td>
              <td>{cost}</td>
              <td align="center" width="150px">
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(pid, pname, price,cost)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(pid)}
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

export default ProductList;