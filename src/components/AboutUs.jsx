import React from "react";
import "../styles/AboutUs.scss";

const slides = [
  {
    title: "Edwin Pinchao",
    link1:"https://www.linkedin.com/in/edwin-pinchao-mueses-951130175/",
    link2: "https://github.com/Edwin9226",
    image:"./img/team/EdwinP.jpg",
      
  },
  {
    title: "Edwin Cacuango",
    link1:"https://www.linkedin.com/in/edwin-cacuango-cahuenas/",
    link2: "https://github.com/EdwinCacuango",
    image: "./img/team/EdwinC.jpg",
  },
  {
    title: "Dylan Vallejo",
    link1:"https://www.linkedin.com/in/dylan-vallejo/",
    link2: "https://github.com/DylanVallejo",
    image: "./img/team/DylanV.jpg",
  },
  {
    title: "Alexander Cangas",
    link1:"https://www.linkedin.com/in/alexander-c-00a2967b/",
    link2: "https://github.com/xander06",
    image: "./img/team/XavierC.jpg",
  },

];

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
};
function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    
    <div
      ref={ref}
      className="slideAbout"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      
      <div
        className="slideAboutContent"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        <div className="slideAboutContentInner">
          <h3 className="slideAboutTitle">{slide.title}</h3>
          <h3 ><a href={slide.link2} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i>
          </a>
          <a href={slide.link1} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin"></i>
          </a> </h3>
          
        </div>
       </div>
    </div>
    
  );
}


function AboutUs() {

  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  return (
    <div className="slideAboutContainer">
      <div className="slidesAbout">
        <button onClick={() => dispatch({ type: "PREV" })}><i class="fa-solid fa-circle-chevron-left"></i>
</button>
        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "NEXT" })}><i class="fa-solid fa-circle-chevron-right"></i></button>
      </div>
    </div>
  );
}

export default AboutUs;
