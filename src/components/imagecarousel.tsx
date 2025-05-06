"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";
import Image from "next/image";

export default function ImageCarousel(): JSX.Element {
  const images = [
    "https://www.thefastmode.com/media/k2/items/src/1097754ac1297e632207554519a1d1ca.jpg?t=20230512_020308",
    "https://vidullanka.com/wp-content/uploads/emerald1.webp",
    "https://vidullanka.com/wp-content/uploads/Madugeta-MHPP-scaled.webp",
    // "https://i0.wp.com/cdn1.tigro.com.br/wp-content/uploads/2020/07/azure.png?fit=800%2C800&ssl=1",
    "https://vidullanka.com/wp-content/uploads/Vavunathivu-10MW-Solar-PV-Project-1.webp",
    "https://vidullanka.com/wp-content/uploads/muvumbe-mhpp-scaled.webp",
    "https://vidullanka.com/wp-content/uploads/Wembiyagoda-MHPP-1.webp",
    // "https://cdn.pixabay.com/animation/2023/03/17/02/19/02-19-19-487_512.gif",
    // "https://download.schneider-electric.com/files?p_Doc_Ref=40739468_range-image&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  ];

  return (
    <section className="w-full max-h-5xl mx-auto my-0">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        // pagination={{ clickable: true }}
        navigation={false}
        autoplay={{ delay: 2000 }}
        modules={[Autoplay]}
        className="w-full h-[65vh]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="relative w-full">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: "contain" }}
              quality={100}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
