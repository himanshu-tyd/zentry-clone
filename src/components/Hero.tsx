import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1); // handle current video index
  const [hasClicked, setHashClicked] = useState<boolean>(false); // handle video has been clicke on video
  const [isLoading, setIsLoading] = useState<boolean>(true); // laoding state video
  const [loadingVideos, setLoadingVideos] = useState<number>(0); //which video hand been loaded

  const hanleVideoLoad = () => {
    setLoadingVideos((pre) => pre + 1);
  };

  const totalVideo: number = 4; //total video in array

  const nextVideoRef = useRef<HTMLVideoElement | null>(null); //ref for current video
  const upComingVideo = (currentIndex % totalVideo) + 1;

  const handleMiniVdClick = () => {
    setHashClicked(true);
    setCurrentIndex(upComingVideo);
  };

  useEffect(() => {
    if (loadingVideos === totalVideo - 1) {
      setIsLoading(false);
    }
  }, [loadingVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => void nextVideoRef.current?.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath:" polygon(14% 0%, 72% 0%, 88% 90%, 0% 95%)",
      borderRadius: "0 ,0 , 10% , 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 ,0, 0, 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden ">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden  rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg ">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 "
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(currentIndex + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center   "
                onLoadedData={hanleVideoLoad} //onLoadedData event occure when meida frame is loaded
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop // repeiting video again and again
            id="next-video"
            onLoadedData={hanleVideoLoad}
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center "
          />

          <video
            src={getVideoSrc(currentIndex == totalVideo - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
        
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={hanleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">
          G<a>a</a>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full ">
          <div className="mt-24 px-5 sm:px-10  ">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 ">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black ">
        G<a>A</a>MING
      </h1>
    </div>
  );
};

export default Hero;
