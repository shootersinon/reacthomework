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

const Lastpage = () => {
  let [a, seta] = useState(new Date(1000, 1, 1));
  let [b, setb] = useState(new Date(3000, 1, 1));
  const datc = (e)=>{
    seta(e.target.value)
  }
  const datd = (e)=>{
    setb(e.target.value)
  }
  const {
    customersLength,
    setcustomersLength,
    customers, 
    setcustomers,
    detailsLength,
    details,
    pdetails,
    products,
    productLength,
  } = useContext(AppContext);
  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  console.log("OK")
  console.log(customers)
  console.log(pdetails)
  console.log(details)
  console.log(products)

  return !customersLength ? (  
    <p>{customersLength === null ? "Loading..." : "Please insert some products."}</p>
  ) : (
  <Box>
    <Box>
    <Helmet>
      <title>銷售報表 | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
    </Box>
    <Box sx={{ mt: 3 }}>
    <Card>
        <CardContent>
          <Box sx={{ maxWidth: 200 }}>
            <TextField
              onChange={datc}
              value={a}
              type="date"
              data-table="order-table"
              id="mydate"
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
          <Box sx={{ maxWidth: 200 }}>
            <TextField
              onChange={datd}
              value={b}
              type="date"
              data-table="order-table"
              id="mydate2"
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
          <th>客戶代號</th>
          <th>客戶名稱</th>
          <th>總銷售金額</th>
          <th>總利潤</th>
        </tr>
      <tbody> 
        {customers.map((customer) => {
          let sumsales=0
          let cost=0
            details.map((order)=>{
                if(a===""){
                  if(order.CustId===customer.custid){
                    pdetails.map((detail)=>{
                      if(detail.orderid===order.OrderId){
                        products.map((pro)=>{if(pro.proid===detail.proid){
                          sumsales+=parseInt(detail.qty)*parseInt(detail.discount)*parseInt(pro.price)
                          cost+=parseInt(detail.qty)*parseInt(detail.discount)*(parseInt(pro.price)-parseInt(pro.cost))
                        }
                      })
                        }
                    })
                  }
                }
                else{
                  if(order.CustId===customer.custid && Date.parse(order.OrderDate)>=Date.parse(a) && Date.parse(order.OrderDate)<=Date.parse(b)){
                    pdetails.map((detail)=>{
                      if(detail.orderid===order.OrderId){
                        products.map((pro)=>{if(pro.proid===detail.proid){
                          sumsales+=parseInt(detail.qty)*parseInt(detail.discount)*parseInt(pro.price)
                          cost+=parseInt(detail.qty)*parseInt(detail.discount)*(parseInt(pro.price)-parseInt(pro.cost))
                        }
                      })
                        }
                    })
                  }
                }
                })
          return(
            <tr key={customer.custid}>
              <td>{customer.custid}</td>
              <td>{customer.custname}</td>
              <td>{sumsales}</td>
              <td>{cost}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Box>
  );
};

export default Lastpage;