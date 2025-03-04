// src/app/page.tsx
"use client";
import * as React from "react";
import Card from "./components/Card";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import PieChart from "./components/PieChart/PieChart";

interface KeyValuePair {
  [key: string]: {
    quantity: number;
    price: number;
  };
}
interface OrderDetailsPair {
  [key: string]: any;
}
interface OrderType{
  [key: string]: any;
}
export default function Home() {
  const orderDetailsPairInitial: OrderDetailsPair = {
    Online: 0,
    "Dine In": 0,
    Pending: 0,
    "In Transit": 0,
    Delivered: 0,
  };
  const [data, setData] = useState<any[] | null>(null);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [detailsOnFood, setDetailsOnFood] = useState<KeyValuePair>({
    Food: {
      quantity: 0,
      price: 0,
    },
    Dessert: {
      quantity: 0,
      price: 0,
    },
    Starters: {
      quantity: 0,
      price: 0,
    },
    Beverage: {
      quantity: 0,
      price: 0,
    },
  });
  const [orderDetailsPair, setOrderDetailsPair] = useState<OrderDetailsPair>(
    orderDetailsPairInitial
  );
  const [orderPricePair, setOrderPricePair] = useState<OrderDetailsPair>(
    orderDetailsPairInitial
  );
  const [modalFlag, setModalFlag] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/sampleData/restaurantDetails.json");
      const jsonData = await res.json();
      let price = 0;
      let orderDetailsPairObj: OrderDetailsPair = orderDetailsPairInitial;
      let orderPricePairObj: OrderDetailsPair = orderDetailsPairInitial;
      let keyValuePairsObj: KeyValuePair = {
        Food: {
          quantity: 0,
          price: 0,
        },
        Dessert: {
          quantity: 0,
          price: 0,
        },
        Starters: {
          quantity: 0,
          price: 0,
        },
        Beverage: {
          quantity: 0,
          price: 0,
        },
      };
      setTotalOrders((prev: any) => jsonData.length);
      jsonData.forEach((order:OrderType) => {
        let eachOrderPrice = 0;
        console.log(
          "Each order:",
          order,
          orderDetailsPairObj[order?.Order_Type]
        );
        orderDetailsPairObj = {
          ...orderDetailsPairObj,
          [order?.Order_Type]: orderDetailsPairObj[order?.Order_Type] + 1,
          [order?.Order_Status]: orderDetailsPairObj[order?.Order_Status] + 1,
        };
        order?.Items?.forEach((item) => {
          eachOrderPrice += item?.Total_Price;
          price += item?.Total_Price;
          keyValuePairsObj = {
            ...keyValuePairsObj,
            [item?.Item_Type]: {
              quantity:
                keyValuePairsObj[item?.Item_Type]?.quantity + item?.Quantity,
              price:
                keyValuePairsObj[item?.Item_Type]?.price + item?.Total_Price,
            }, // Add or update the key-value pair
          };
        });
        orderPricePairObj = {
          ...orderPricePairObj,
          [order?.Order_Type]:
            orderPricePairObj[order?.Order_Type] + +eachOrderPrice?.toFixed(2),
          [order?.Order_Status]:
            orderPricePairObj[order?.Order_Status] +
            +eachOrderPrice?.toFixed(2),
        };
      });
      console.log("Order details pair", orderDetailsPairObj);
      setOrderDetailsPair((prev) => orderDetailsPairObj);
      setTotalPrice((prev) => +price?.toFixed(2));
      setDetailsOnFood((prev) => keyValuePairsObj);
      setOrderPricePair((prev) => orderPricePairObj);
      setData(jsonData);
    };
    fetchData();
  }, [orderDetailsPairInitial]);

  return (
    <div className="home-container">
      <h1>Welcome to Restaurant App,</h1>
      <p className="landingpage-details">
        You are in the home page. You can find the total orders, price, food
        statistics for the day along with key insights here...
      </p>
      <div className="cards-block">
        <Card
          cardTitle="Orders Placed"
          cardDescription={`${totalOrders} orders placed`}
          cardPath="/images/restaurantBell.png"
          handleModalShow={() => {
            setModalFlag((prev) => "Order Details");
            handleShow();
          }}
        />
        <Card
          cardTitle="Earnings in Total"
          cardDescription={`Customers ordered food worth $${totalPrice}`}
          cardPath="/images/handMoney.png"
          handleModalShow={() => {
            setModalFlag((prev) => "Price Share");
            handleShow();
          }}
        />
        <Card
          cardTitle="Details per Category"
          cardDescription={`${detailsOnFood?.Food?.quantity} quantities of food,
          ${detailsOnFood?.Starters?.quantity} quantities of starters,
          ${detailsOnFood?.Beverage?.quantity} quantities of beverages and
          ${detailsOnFood?.Dessert?.quantity} quantities of desserts were ordered`}
          cardPath="/images/wholeFood.png"
          handleModalShow={() => {
            setModalFlag((prev) => "Category Details");
            handleShow();
          }}
        />
      </div>
      <section className="animated-section">
        <div className="section-title"> Key Insights</div>
        <ul>
          <li>A total of {totalOrders} have been placed so far.</li>
          <li>Customers ordered food worth ${totalPrice}</li>
          <li>
            Customers ordered main course worth of ${" "}
            {detailsOnFood?.Food?.price}
          </li>
          <li>
            Customers ordered starters worth of ${" "}
            {detailsOnFood?.Starters?.price}
          </li>
          <li>
            Customers ordered beverages worth of ${" "}
            {detailsOnFood?.Beverage?.price}
          </li>
          <li>
            Customers ordered desserts worth of ${" "}
            {detailsOnFood?.Dessert?.price}
          </li>
        </ul>
      </section>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered // Vertically centers the modal
        backdrop="static" // Prevents closing the modal by clicking outside
        keyboard={false} // Prevents closing the modal with the 'Esc' key
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalFlag}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalFlag === "Order Details" && (
            <>
              <div className="modal-details-section">
                <div className="modal-detail-item">
                  Order distribution based on the order type
                </div>
                <PieChart
                  data={[
                    orderDetailsPair["Online"],
                    orderDetailsPair["Dine In"],
                  ]}
                  labels={["Online", "Dine In"]}
                  backgroundColors={[
                    "#FF6384", // Red
                    "#36A2EB", // Blue
                  ]}
                />
              </div>
              <hr />
              <div className="modal-details-section">
                <div className="modal-detail-item">
                  Order distribution based on the Order Status
                </div>
                <PieChart
                  data={[
                    orderDetailsPair["Pending"],
                    orderDetailsPair["In Transit"],
                    orderDetailsPair["Delivered"],
                  ]}
                  labels={["Pending", "In Transit", "Delivered"]}
                  backgroundColors={[
                    " #FF6384", // Red
                    " #36A2EB", // Blue
                    "#FFFF00", //Yellow
                  ]}
                />
              </div>
            </>
          )}
          {modalFlag === "Price Share" && (
            <>
              <div className="modal-details-section">
                <div className="modal-detail-item">
                  Price distribution based on the order type
                </div>
                <PieChart
                  data={[orderPricePair["Online"], orderPricePair["Dine In"]]}
                  labels={["Online", "Dine In"]}
                  backgroundColors={[
                    "#FF6384", // Red
                    "#36A2EB", // Blue
                  ]}
                />
              </div>
              <hr />
              <div className="modal-details-section">
                <div className="modal-detail-item">
                  Order distribution based on the Order Status
                </div>
                <PieChart
                  data={[
                    orderPricePair["Pending"],
                    orderPricePair["In Transit"],
                    orderPricePair["Delivered"],
                  ]}
                  labels={["Pending", "In Transit", "Delivered"]}
                  backgroundColors={[
                    " #FF6384", // Red
                    " #36A2EB", // Blue
                    "#FFFF00", //Yellow
                  ]}
                />
              </div>
            </>
          )}
          {modalFlag === "Category Details" && (
            <>
              <div className="modal-details-section">
                <div className="modal-detail-item">
                  Order distribution based on the food category
                </div>
                <PieChart
                  data={[
                    detailsOnFood["Food"]?.quantity,
                    detailsOnFood["Starters"]?.quantity,
                    detailsOnFood["Beverage"]?.quantity,
                    detailsOnFood["Dessert"]?.quantity,
                  ]}
                  labels={["Food", "Starters", "Beverage", "Dessert"]}
                  backgroundColors={[
                    " #FF6384", // Red
                    " #36A2EB", // Blue
                    "#FFFF00", //Yellow
                    "#008000", //Green
                  ]}
                />
              </div>
              <hr />
              <div className="modal-details-section">
                <div className="modal-detail-item">
                  Price distribution based on the food category
                </div>
                <PieChart
                  data={[
                    detailsOnFood["Food"]?.price,
                    detailsOnFood["Starters"]?.price,
                    detailsOnFood["Beverage"]?.price,
                    detailsOnFood["Dessert"]?.price,
                  ]}
                  labels={["Food", "Starters", "Beverage", "Dessert"]}
                  backgroundColors={[
                    " #FF6384", // Red
                    " #36A2EB", // Blue
                    "#FFFF00", //Yellow
                    "#008000", //Green
                  ]}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
