import { useEffect } from "react";
import { useDispatch } from "react-redux";

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_TITLE",
      payload: "Thông tin",
    });
  });

  return (
    <div id="about-tab">
      <div className="about-tab-container">
        <h1>Hoàng Minh An</h1>
        <h4>17/02/1999</h4>
        <h4>DHCNTT13B-17092841</h4>
        <h4>Đại Học Công Nghiệp</h4>
        <h1 style={{ color: "blue", margin: 32 }}>
          ĐỒ ÁN TỐT NGHIỆP: Quản lý thông tin khách hàng trên nền tảng big data
        </h1>
      </div>
    </div>
  );
};

export default About;
