import React from 'react'
import '../styles/AboutUs.scss'


const slides = [
  {
    title: "Machu Picchu",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image:
      "https://i.blogs.es/08fb59/piratas-del-caribe-disney-sin-jack-sparrow-johnny-depp/1366_2000.jpg"
  },
  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image:
      "https://i.blogs.es/99f45a/johnny-depp-jack-sparrow/1366_2000.jpeg"
  },
  {
    title: "Mimisa Rocks",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://i.blogs.es/7436a5/piratas-del-caribe/1366_2000.jpeg"
  },
  {
    title: "Four",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://i.blogs.es/7f0586/johnny-depp-jack-sparrow/1366_2000.jpeg"
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
      mouseY: undefined
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
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
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
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}
    >
     {/*  <div
        className="slideAboutBackground"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      /> */}
      <div
        className="slideAboutContent"
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      >
        <div className="slideAboutContentInner">
          <h2 className="slideAboutTitle">{slide.title}</h2>
          <h3 className="slideAboutSubtitle">{slide.subtitle}</h3>
          <p className="slideAboutDescription">{slide.description}</p>
        </div>
      </div>
    </div>
  );
}


function AboutUs() {

  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

 
  
return (
<div className="slidesAbout">
      <button onClick={() => dispatch({ type: "PREV" })}>‹anterior</button>

      {[...slides, ...slides, ...slides, , ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset}  key={i} />;
      })}
      <button onClick={() => dispatch({ type: "NEXT" })}>siguiente›</button>
    </div>
  )
}

export default AboutUs