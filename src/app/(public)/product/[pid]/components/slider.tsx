/* eslint-disable @next/next/no-img-element */
"use client"

import SlickSlider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useIsMounted } from "@/hooks/useIsMounted"
import { TProductsWithVariants } from "@/types"
import React, { useMemo } from "react"

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}

function Slider({ data }: { data: TProductsWithVariants }) {
  const { isMounted } = useIsMounted()
  const images = useMemo(() => {
    if (!data) {
      return []
    }
    return data.variants.map((item) => item.image)
  }, [data])
  if (!isMounted) {
    return null
  }
  return (
    <div>
      <SlickSlider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="flex items-center justify-center">
            <img src={image} alt="" className="mx-auto" />
          </div>
        ))}
      </SlickSlider>
    </div>
  )
}

export default React.memo(Slider)
