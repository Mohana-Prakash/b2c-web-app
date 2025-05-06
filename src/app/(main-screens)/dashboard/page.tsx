"use client";
import React, { useEffect, useState } from "react";
import DateRangePicker from "@/components/TableComponent/dateRangePicker";
// import Stacked from "@/chart/stacked";
// import { ZoomInButton } from "@/components/buttonComp";
// import FullScreenModal from "@/chart/chartModal";
// import TableComponent from "@/components/tableComponent";
// import LineChart from "@/chart/lineChart";
// import { fetchIPPListAPI } from "@/store-toolkit/action/commonAction";
// import SemiCircularGaugeChart from "@/chart/gauge";

function DashboardAnalytics(): JSX.Element {
  // const role = useRole();
  // console.log(role, "rolellelell");
  // const router = useRouter();
  // const token = getCookieData("token");
  const [dateRange, setDateRange] = useState<Date[]>([]);
  // const [producerList, setProducerList] = useState<ProducerList[]>([]);
  // const [fullScreenChart, setFullScreenChart] = useState<{
  //   open: boolean;
  //   chartName: string;
  // }>({
  //   open: false,
  //   chartName: "",
  // });

  // console.log(producerList);

  // Fetch producer list
  // const [, setProfile] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosInstance.get("ranks/get-all-ranks");
  //       setProfile(res.data);
  //     } catch (err) {
  //       console.error("Error fetching profile:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        // fetchIPPListAPI(setProducerList);
      } catch (error) {
        console.error("Error fetching producer list:", error);
      }
    };
    fetchProducers();
  }, []);

  const data = [
    {
      image: "/images/energy.png",
      value: "2219.965 kWh",
      description: "Renewable Energy Generation (kWh)",
    },
    {
      image: "/images/carboncredit.png",
      value: "1.6108",
      description: "ITMO (tCO2-e)",
    },
    {
      image: "/images/irec1.png",
      value: "2.2200",
      description: "IREC (MWh)",
    },
  ];

  // const zoomHandler = (chartName: string): void => {
  //   setFullScreenChart({
  //     open: true,
  //     chartName,
  //   });
  // };

  // useEffect(() => {
  //   if (!token) {
  //     router.replace("/auth/login");
  //   }
  // }, [token, router]);
  return (
    <>
      <div className="flex flex-wrap lg:px-0 lg:flex-nowrap justify-between items-center">
        <p className="text-xl text-gray-500 dark:text-gray-100">
          Energy Performance Dashboard{" "}
          <span className="text-sm block lg:inline-block">
            ( Analysis for period: <b>25-12-2024</b> to <b>31-12-2024</b> )
          </span>
        </p>
        <div className="w-fit">
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-around mt-4">
        <div className="flex flex-col w-full lg:w-1/3 pr-0 lg:pr-3">
          {data?.map((item) => (
            <div
              key={item.value}
              className="mb-2 h-24 flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="w-24 h-20">
                <img
                  className="p-3 object-cover w-full h-full rounded-l-lg md:rounded-none md:rounded-s-lg"
                  src={item.image}
                  alt="Energy Resource"
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <dt className="font-futura mb-2 text-xl dark:text-green-400 font-extrabold">
                  {item.value}
                </dt>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-2/3 border dark:border-none shadow-md rounded-lg px-4 pt-2 mt-4 lg:mt-0">
          {/* <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              TOTAL DAILY RENEWABLE ENERGY PRODUCTION (kWh)
            </p>
            <ZoomInButton
              clickHandler={() => zoomHandler("TOTAL DAILY RENEWABLE ENERGY PRODUCTION (kWh)")}
            />
          </div> */}
          {/* <Stacked chartName="prod" /> */}
          {/* <SemiCircularGaugeChart value={120} maxValue={50} /> */}
        </div>
      </div>
      {/* <div className="w-full mt-4 border dark:border-none shadow-md rounded-lg px-4 pt-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">ITMO</p>
          <ZoomInButton clickHandler={() => zoomHandler("ITMO")} />
        </div>
        <LineChart chartName="coo" />
      </div>
      <div className="w-full mt-4 border dark:border-none shadow-md rounded-lg px-4 pt-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Energy I-REC</p>
          <ZoomInButton clickHandler={() => zoomHandler("Energy I-REC")} />
        </div>
        <Stacked chartName="irec" />
      </div> */}
      {/* <TableComponent /> */}
      {/* {fullScreenChart.open && (
        <FullScreenModal
          isOpen={fullScreenChart.open}
          setIsOpen={setFullScreenChart}
          chartName={fullScreenChart.chartName}
        />
      )} */}
    </>
  );
}

export default DashboardAnalytics;
