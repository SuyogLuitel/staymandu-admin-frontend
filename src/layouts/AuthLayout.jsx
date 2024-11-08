import { Outlet, useNavigate } from "react-router-dom";
import login1 from "../assets/login-1.png";
import login2 from "../assets/login-2.png";
import login3 from "../assets/login-3.png";
import Slider from "react-slick";

const AuthLayout = () => {
  const navigate = useNavigate();

  const authImages = [
    { id: 1, img: login1 },
    { id: 2, img: login2 },
    { id: 3, img: login3 },
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="px-20 py-6 flex flex-col gap-10 h-screen">
      <div
        className="font-bold text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Staymandu.
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className=" flex flex-col gap-10 mt-10">
          <h1 className=" text-3xl leading-[44px] font-bold text-wrap">
            Login to keep track of your hotels and booking
          </h1>
          <Slider {...settings}>
            {authImages?.map((item) => {
              return (
                <div>
                  <div className="flex justify-center ">
                    <img key={item?.id} src={item?.img} className="  " alt="" />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
