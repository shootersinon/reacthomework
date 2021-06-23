import { useEffect, useState } from "react";

export const Actions = () => {
  let [users, setUsers] = useState([]);

  let [userLength, setUserLength] = useState(null);
  let [products, setproducts] = useState([]);
  let [details, setdetails] = useState([]);
  let [pdetails, setpdetails] = useState([]);
  let [order, setorder] = useState("");

  let [productLength, setproductLength] = useState(null);
  let [detailsLength, setdetailsLength] = useState(null);
  let [pdetailsLength, setpdetailsLength] = useState(null);
  useEffect(() => {
    fetch("http://localhost/php-react/all-pdetails.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setpdetails(data.pdetails);
          setpdetailsLength(true);
        } else {
          setpdetailsLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const insertpdetails = (newpdetails) => {
    console.log(newpdetails)
    fetch("http://localhost/php-react/add-pdetails.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newpdetails),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setpdetails([
            {
              seq:data.seq,
              ...newpdetails,
            },
            ...pdetails,
          ]);
          setpdetailsLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch("http://localhost/php-react/all-product.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setproducts(data.products);
          setproductLength(true);
        } else {
          setproductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost/php-react/all-details.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setdetails(data.details);
          setdetailsLength(true);
        } else {
          setdetailsLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const insertdetails = (newdetails) => {
    fetch("http://localhost/php-react/add-details.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdetails),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setdetails([
            {
              ...newdetails,
            },
            ...details,
          ]);
          setdetailsLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertProduct = (newproduct) => {
    console.log(newproduct)
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newproduct),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setproducts([
            {
              ...newproduct,
            },
            ...products,
          ]);
          setproductLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMode = (pid) => {
    products = products.map((product) => {
      if (product.pid === pid) {
        product.isEditing = true;
        return product;
      }
      product.isEditing = false;
      return product;
    });
    setproducts(products);
  };
  const editMode2 = (seq) => {
    details = details.map((detail) => {
      if (detail.seq === seq) {
        detail.isEditing = true;
        return detail;
      }
      detail.isEditing = false;
      return detail;
    });
    setdetails(details);
  };
  const editMode3 = (seq) => {
    pdetails = pdetails.map((pdetail) => {
      if (pdetail.seq === seq) {
        pdetail.isEditing = true;
        return pdetail;
      }
      pdetail.isEditing = false;
      return pdetail;
    });
    setpdetails(pdetails);
  };
  

  const cancelEdit = (pid) => {
    products = products.map((product) => {
      if (product.pid === pid) {
        product.isEditing = false;
        return product;
      }
      return product;
    });
    setproducts(products);
  };
  const cancelEdit2 = (seq) => {
    details = details.map((detail) => {
      if (detail.seq === seq) {
        detail.isEditing = false;
        return detail;
      }
      return detail;
    });
    setdetails(details);
  };
  const cancelEdit3 = (seq) => {
    pdetails = pdetails.map((pdetail) => {
      if (pdetail.seq === seq) {
        pdetail.isEditing = false;
        return pdetail;
      }
      return pdetail;
    });
    setpdetails(pdetails);
  };

  // Updating a user.
  const updateproduct = (productData) => {
    fetch("http://localhost/php-react/update-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          products = products.map((product) => {
            if (product.pid === productData.pid) {
              product.isEditing = false;
              product.pname = productData.pname;
              product.price = productData.price;
              product.cost = productData.cost;
              return product;
            }
            return product;
          });
          setproducts(products);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updatedetails = (detailsData) => {
    fetch("http://localhost/php-react/update-details.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detailsData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          details = details.map((detail) => {
            if (detail.seq === detailsData.seq) {
              detail.isEditing = false;
              detail.OrderDate = detailsData.OrderDate;
              detail.Descript = detailsData.Descript;
              return detail;
            }
            return detail;
          });
          setdetails(details);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updatepdetails = (pdetailsData) => {
    fetch("http://localhost/php-react/update-pdetails.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdetailsData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          pdetails = pdetails.map((pdetail) => {
            if (pdetail.seq === pdetailsData.seq) {
              pdetail.isEditing = false;
              pdetail.qty = pdetailsData.qty;
              pdetail.discount = pdetailsData.discount;
              return pdetail;
            }
            return pdetail;
          });
          setpdetails(pdetails);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Deleting a user.
  const deleteproduct = (theID) => {
      // filter outing the user.
    let productDeleted = products.filter((product) => {
      return product.pid !== theID;
    });
    fetch("http://localhost/php-react/delete-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pid: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setproducts(productDeleted);
          if (products.length === 1) {
            setproductLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletedetails = (theID) => {
    // filter outing the user.
  let detailsDeleted = details.filter((detail) => {
    return detail.OrderId !== theID;
  });
  fetch("http://localhost/php-react/delete-details.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ OrderId: theID }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setdetails(detailsDeleted);
        if (details.length === 1) {
          setdetailsLength(0);
        }
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const deletepdetails = (theID) => {
  // filter outing the user.
let pdetailsDeleted = pdetails.filter((pdetail) => {
  return pdetail.seq !== theID;
});
fetch("http://localhost/php-react/delete-pdetails.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ seq: theID }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.success) {
      setpdetails(pdetailsDeleted);
      if (pdetails.length === 1) {
        setpdetailsLength(0);
      }
    } else {
      alert(data.msg);
    }
  })
  .catch((err) => {
    console.log(err);
  });
};
  useEffect(() => {
    fetch("http://localhost/php-react/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database.



  return {
    order,
    setorder,
    insertdetails,
    updatedetails,
    deletedetails,
    detailsLength,
    details,
    insertpdetails,
    updatepdetails,
    deletepdetails,
    pdetailsLength,
    pdetails,
    products,
    editMode,
    editMode2,
    cancelEdit2,
    editMode3,
    cancelEdit3,
    cancelEdit,
    updateproduct,
    insertProduct,
    deleteproduct,
    productLength,
    users,
    userLength,
  };
};