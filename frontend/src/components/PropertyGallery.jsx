import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const API_URL = "http://localhost:4090";

const PropertyGalleryCarousel = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/projects`) // Fetch all properties
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-300">Loading...</div>;
  if (properties.length === 0) return <div className="text-center py-20 text-gray-300">No properties found</div>;

  // Flatten all images into a single array
  const allImages = properties.flatMap((p) => p.images || []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      {allImages.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loop={true}
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Property ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-400 text-center">No images available</p>
      )}
    </div>
  );
};

export default PropertyGalleryCarousel;
