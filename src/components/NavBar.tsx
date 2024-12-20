import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";

const navItems = ["Nexus", "valut", "prologue", "about", "contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [LastScrollY, setLastScrollY] = useState<number>(0);
  const [isNavVisable, setIsNavVisiable] = useState<boolean>(true);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((pre) => !pre);
    setIsIndicatorActive((pre) => !pre);
  };

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisiable(true);
      containerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > LastScrollY) {
      setIsNavVisiable(false);
      containerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < LastScrollY) {
      setIsNavVisiable(true);
      containerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY)

  }, [currentScrollY,LastScrollY]);


  useEffect(()=>{
    gsap.to( containerRef.current, {
      y:isNavVisable ? 0 : -100,
      opacity: isNavVisable ? 1 : 0,
      duration: 0.2,

    })
  },[isNavVisable])


  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6  "
    >
      <header className="flex top-1/2 w-full jusitfy-between p-4 -translate-y-5 ">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex  items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 "
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block ">
              {navItems.map((item) => (
                <a
                  key={item.toLowerCase()}
                  className="nav-hover-btn"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
