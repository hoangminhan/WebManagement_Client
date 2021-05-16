import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductChart from "../../global/ProductChart";
import PieChart1 from "../../global/PieChart1";
import AddressChart from "../../global/AddressChart";
import formatNumber from "../../utils/formatNum";
import { getAllGuestsAsync, getAllProductsAsync } from "../../redux/actions";

const Overall = () => {
  const dispatch = useDispatch();
  const guests = useSelector((state) => state.global.guests);
  const totalGuests = useSelector((state) => state.global.totalGuests);
  let total = 0;

  guests.forEach((item) => {
    total += item.totalMoney;
  });

  let avg = Math.floor(total / ((totalGuests > 0 && totalGuests) || 1));

  useEffect(() => {
    dispatch(getAllProductsAsync({page: -1}));
  }, []);

  useEffect(() => {
    dispatch(getAllGuestsAsync({page: -1}));
    dispatch({
      type: "SET_TITLE",
      payload: "Tổng quan",
    });
  }, []);

  return (
    <div id="overall-tab">
      <div className="overall-tab-container">
        <div className="pie-chart-container">
          <h5>Loại khách hàng (Tổng số KH: {totalGuests})</h5>
          <PieChart1 totalGuests={totalGuests || 1} />
        </div>
        <div className="pie-chart-container">
          <h5>Chi tiêu trung bình:</h5>
          <h1 style={{ color: "red" }}>{formatNumber(avg)}đ</h1>
          <h5 style={{ marginTop: 24 }}>Tổng doanh thu:</h5>
          <h1 style={{ color: "red" }}>{formatNumber(total)}đ</h1>
        </div>
        <div className="high-chart-container">
          {/* <ProductChart /> */}
          <AddressChart />
        </div>
        <div className="high-chart-container">
          <ProductChart />
        </div>
      </div>
    </div>
  );
};

export default Overall;
